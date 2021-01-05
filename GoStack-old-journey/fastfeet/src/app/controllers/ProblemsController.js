import DeliveryProblems from '../models/DeliveryProblems';
import Order from '../models/Order';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';
import CancellationMail from '../jobs/CancellationMail';
import Queue from '../../lib/Queue';

class ProblemsController {
  async index(req, res) {
    const problems = await DeliveryProblems.findAll({
      order: [['created_at', 'DESC']],
      attributes: ['id', 'delivery_id', 'description'],
      include: [
        {
          model: Order,
          as: 'order',
          attributes: ['id', 'product', 'start_date', 'end_date'],
          include: [
            {
              model: Deliveryman,
              as: 'deliveryman',
              attributes: ['id', 'name', 'email'],
            },
            {
              model: Recipient,
              as: 'recipient',
              attributes: ['id', 'name', 'email', 'city'],
            },
          ],
        },
      ],
    });

    return res.json(problems);
  }

  async update(req, res) {
    const checkAssociation = await DeliveryProblems.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!checkAssociation) {
      return res
        .status(404)
        .json({ error: 'Something wrong, problem with this id not found' });
    }

    const problem = await DeliveryProblems.findByPk(req.params.id);
    const order = await Order.findByPk(problem.delivery_id);

    await order.update({
      canceled_at: new Date(),
    });

    await order.save();

    const deliveryman = await Deliveryman.findByPk(order.deliveryman_id);
    const recipient = await Recipient.findByPk(order.recipient_id);
    // send email to deliveryman
    await Queue.add(CancellationMail.key, {
      deliveryman,
      order,
      recipient,
    });

    return res.json();
  }
}

export default new ProblemsController();
