import dotenv from 'dotenv';

dotenv.config();

export default {
  secret: process.env.SECRET_SESSION_HASH,
  expiresIn: '7d',
};
