import * as Yup from 'yup';
import DeliveryProblems from '../models/DeliveryProblems';
import Order from '../models/Order';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';

class DeliveryProblemsController {
  // show all orders with some problem
  async index(req, res) {
    const problems = await DeliveryProblems.findAll({
      where: {
        delivery_id: req.params.id,
      },
      order: [['created_at', 'DESC']],
      attributes: ['id', 'delivery_id', 'description'],
      include: [
        {
          model: Order,
          as: 'order',
          attributes: ['product', 'start_date', 'end_date'],
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

  async store(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    // checking if already more than 10 problems with this order
    const checkProblemsExists = await DeliveryProblems.findAll({
      where: {
        delivery_id: req.params.id,
      },
    });

    if (checkProblemsExists.length > 10) {
      return res
        .status(400)
        .json({ error: 'You can not store more than 10 problems in a order' });
    }

    const problem = await DeliveryProblems.create({
      delivery_id: req.params.id,
      description: req.body.description,
    });

    const { id, delivery_id, description } = problem;

    return res.json({ id, delivery_id, description });
  }
}

export default new DeliveryProblemsController();
