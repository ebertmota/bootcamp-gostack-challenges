import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';
import Order from '../models/Order';

export default async (req, res, next) => {
  // Cheking if association with recipients,and Deliveryman exists

  if (req.body.recipient_id) {
    const recipientExists = await Recipient.findOne({
      where: { id: req.body.recipient_id },
    });

    if (!recipientExists) {
      return res.status(404).json({
        error: 'Something wrong, recipient_id not found',
      });
    }
  }

  if (req.body.deliveryman_id) {
    const deliverymanExists = await Deliveryman.findOne({
      where: { id: req.body.deliveryman_id },
    });

    if (!deliverymanExists) {
      return res.status(404).json({
        error: 'Something wrong, deliveryman_id not found',
      });
    }
  }

  if (req.body.avatar_id) {
    const avatarExists = await File.findOne({
      where: { id: req.body.avatar_id },
    });

    if (!avatarExists) {
      return res.status(404).json({
        error: 'Something wrong, avatar with this id not found',
      });
    }
  }

  if (req.params.id) {
    const orderExists = await Order.findOne({
      where: { id: req.params.id },
    });

    if (!orderExists) {
      return res.status(404).json({
        error: 'Something wrong, order with this id not found',
      });
    }
  }

  return next();
};
