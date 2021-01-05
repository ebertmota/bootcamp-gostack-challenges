import Order from '../models/Order';

export default async (req, res, next) => {
  const order = await Order.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!order) {
    return res.status(404).json({ error: 'Order with this id not found.' });
  }

  if (order.deliveryman_id !== req.body.deliveryman_id) {
    return res
      .status(401)
      .json({ error: 'Only deliveryman included can access this order' });
  }

  return next();
};
