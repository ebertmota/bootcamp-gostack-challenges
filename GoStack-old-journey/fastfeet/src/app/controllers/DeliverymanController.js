import * as Yup from 'yup';
import Deliveryman from '../models/Deliveryman';

class DeliverymanController {
  async index(req, res) {
    const deliveryman = await Deliveryman.findAll({
      attributes: ['id', 'name', 'email', 'avatar_id'],
    });

    return res.json(deliveryman);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      avatar_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Something is wrong, validation fails' });
    }

    const deliverymanExists = await Deliveryman.findOne({
      where: { email: req.body.email },
    });

    if (deliverymanExists) {
      return res.status(400).json({ error: 'Delivery Man already registered' });
    }

    const { name, avatar_id, email } = await Deliveryman.create(req.body);
    return res.json({ name, avatar_id, email });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      deliveryman_id: Yup.number().required(),
      name: Yup.string(),
      avatar_id: Yup.number(),
      email: Yup.string().email(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .send(400)
        .json({ error: 'Something is wrong, validation fails' });
    }

    const deliveryman = await Deliveryman.findByPk(req.body.deliveryman_id);
    if (!deliveryman) {
      return res.status(400).json({ error: 'Courier with this id not exists' });
    }

    const { name, email, avatar_id } = await deliveryman.update(req.body);

    return res.json({
      name,
      email,
      avatar_id,
    });
  }

  async delete(req, res) {
    const deliveryman = await Deliveryman.findByPk(req.body.deliveryman_id);
    if (!deliveryman) {
      return res
        .status(400)
        .json({ error: 'Delivery Man with this id not exists' });
    }

    await deliveryman.destroy();
    return res.json(deliveryman);
  }
}

export default new DeliverymanController();
