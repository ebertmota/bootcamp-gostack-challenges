import * as Yup from 'yup';
import User from '../models/User';
import Order from '../models/Order';
import Notification from '../schemas/Notification';
import Queue from '../../lib/Queue';
import NewOrderMail from '../jobs/NewOrderMail';
import Deliveryman from '../models/Deliveryman';

class OrderController {
  async index(req, res) {
    const order = await Order.findAll({
      where: {
        canceled_at: null,
      },
      attributes: [
        'id',
        'product',
        'start_date',
        'end_date',
        'user_id',
        'deliveryman_id',
        'signature_id',
        'canceled_at',
      ],
    });

    return res.json(order);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      product: Yup.string().required(),
      recipient_id: Yup.string().required(),
      deliveryman_id: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    // checking if order already exists
    const orderExists = await Order.findOne({
      where: {
        product: req.body.product,
        deliveryman_id: req.body.deliveryman_id,
        recipient_id: req.body.recipient_id,
      },
    });

    if (orderExists) {
      return res.status(400).json({ error: 'Order already exists' });
    }

    const { product, recipient_id, deliveryman_id } = req.body;

    const order = await Order.create({
      user_id: req.userId,
      product,
      recipient_id,
      deliveryman_id,
    });

    // send notification to deliveryman
    const provider = await User.findByPk(req.userId);

    await Notification.create({
      content: `Nova encomenda de ${provider.name} disponível para retirada, verifique seu email para mais informações.`,
      deliveryman: deliveryman_id,
    });

    // send email to deliveryman
    const deliveryman = await Deliveryman.findByPk(deliveryman_id);

    await order.save();

    await Queue.add(NewOrderMail.key, {
      deliveryman,
      order,
    });

    return res.json(order);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      product: Yup.string(),
      recipient_id: Yup.string(),
      deliveryman_id: Yup.string(),
      signature_id: Yup.string(),
      start_date: Yup.date(),
      end_date: Yup.date(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const thisOrder = await Order.findByPk(req.params.id);

    if (!thisOrder) {
      return res.status(404).json({ error: 'Order with this id not found' });
    }

    const {
      product,
      recipient_id,
      deliveryman_id,
      signature_id,
      start_date,
      end_date,
    } = req.body;

    const order = await thisOrder.update({
      product,
      recipient_id,
      deliveryman_id,
      signature_id,
      start_date,
      end_date,
    });

    return res.json(order);
  }

  async delete(req, res) {
    const order = await Order.findByPk(req.params.id);

    if (!order) {
      return res.status(400).json({ error: 'Order not found' });
    }

    order.canceled_at = new Date();

    await order.save();

    return res.json(order);
  }
}

export default new OrderController();
