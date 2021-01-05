import { Op } from 'sequelize';
import * as Yup from 'yup';
import Order from '../models/Order';

class DeliveredController {
  async index(req, res) {
    const orders = await Order.findAll({
      where: {
        deliveryman_id: req.params.id,
        end_date: {
          [Op.ne]: null,
        },
        start_date: {
          [Op.ne]: null,
        },
      },
    });

    return res.json(orders);
  }

  async update(req, res) {
    const orderId = req.params.id;
    const thisOrder = await Order.findByPk(orderId);

    if (!thisOrder) {
      return res.status(404).json({ error: 'Order with this id not found!' });
    }

    const schema = Yup.object().shape({
      deliveryman_id: Yup.number().required(),
      end_date: Yup.date().min(thisOrder.start_date, ({ min }) =>
        res.status(400).json({ error: `Date needs to be after ${min}}!!` })
      ),
      signature_id: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    await thisOrder.update({
      signature_id: req.body.signature_id,
      end_date: req.body.end_date,
    });

    return res.json(thisOrder);
  }
}

export default new DeliveredController();
