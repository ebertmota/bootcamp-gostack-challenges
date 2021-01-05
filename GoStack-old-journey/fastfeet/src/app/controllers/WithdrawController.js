import * as Yup from 'yup';
import { Op } from 'sequelize';
import { parseISO, isBefore } from 'date-fns';
import isWithinInterval from 'date-fns/isWithinInterval';
import Order from '../models/Order';

class WithdrawController {
  async update(req, res) {
    const schema = Yup.object().shape({
      deliveryman_id: Yup.number().required(),
      start_date: Yup.date()
        .required()
        .min(new Date(0, 0, 0, 8)),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    // check for past dates
    const formatedHour = parseISO(req.body.start_date);

    if (isBefore(formatedHour, new Date())) {
      // return res.status(400).json({ error: 'Past dates are not permited' });
    }

    // check if date is between 08:00 - 18:00
    const year = formatedHour.getFullYear();
    const month = formatedHour.getMonth();
    const day = formatedHour.getDate();

    const checkHourInterval = isWithinInterval(formatedHour, {
      start: new Date(year, month, day, 8),
      end: new Date(year, month, day, 18),
    });

    if (!checkHourInterval) {
      return res
        .status(400)
        .json({ error: 'Date have to be within interval of 08:00 at 18:00 ' });
    }

    async function checkWithdraw() {
      const now = new Date();
      const nowYear = now.getFullYear();
      const nowMonth = now.getMonth();
      const nowDay = now.getDate();

      const startDate = new Date(nowYear, nowMonth, nowDay, 8);
      const endDate = new Date(nowYear, nowMonth, nowDay, 18);

      // checking if the deliveryman already withdraw 5 orders today
      const ordersWithdrawToday = await Order.findAll({
        where: {
          start_date: {
            [Op.between]: [startDate, endDate],
          },
          deliveryman_id: req.body.deliveryman_id,
        },
      });

      if (ordersWithdrawToday.length > 5) {
        return res.json({
          error: 'You can not withdraw more than 5 orders in a day',
        });
      }
      return '';
    }

    await checkWithdraw();

    const thisOrder = await Order.findByPk(req.params.id);

    const order = await thisOrder.update({
      start_date: formatedHour,
    });

    return res.json(order);
  }
}

export default new WithdrawController();
