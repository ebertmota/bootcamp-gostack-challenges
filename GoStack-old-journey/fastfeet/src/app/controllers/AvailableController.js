import Order from '../models/Order';

class AvailableController {
  async index(req, res) {
    const deliveries = await Order.findAll({
      where: {
        deliveryman_id: req.params.id,
        end_date: null,
        canceled_at: null,
      },
    });

    return res.json(deliveries);
  }
}

export default new AvailableController();
