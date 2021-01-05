import User from '../models/User';

export default async (req, res, next) => {
  const user = await User.findByPk(req.userId);

  if (user.admin === false) {
    res.status(400).json({
      error: 'Sorry, you dont have permission enough to acess this page.',
    });
  } else {
    next();
  }
};
