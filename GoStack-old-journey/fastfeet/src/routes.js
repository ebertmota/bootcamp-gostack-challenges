import { Router } from 'express';

import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import DeliverymanController from './app/controllers/DeliverymanController';
import OrderController from './app/controllers/OrderController';
import FileController from './app/controllers/FileController';
import AvailableController from './app/controllers/AvailableController';
import DeliveredController from './app/controllers/DeliveredController';
import WithdrawController from './app/controllers/WithdrawController';
import DeliveryProblemsController from './app/controllers/DeliveryProblemsController';
import ProblemsController from './app/controllers/ProblemsController';

import authMiddleware from './app/middlewares/auth';
import adminMiddleware from './app/middlewares/admin';
import checkAssociation from './app/middlewares/checkAssociation';
import checkDeliveryman from './app/middlewares/checkDeliveryman';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);

routes.post('/sessions', SessionController.store);

/*
  bellow routes with Token authentication
*/
routes.use(authMiddleware);

routes.put('/users', UserController.update);

// Available orders to specific deliveryman
routes.get('/deliveryman/:id', AvailableController.index);

// handed out orders
routes.get('/deliveryman/:id/deliveries', DeliveredController.index);
routes.put('/order/:id', checkDeliveryman, DeliveredController.update);

// set withdraw date in a order
routes.put('/order/:id/catched', checkDeliveryman, WithdrawController.update);

// Delivery problems
routes.post(
  '/delivery/:id/problems',
  checkAssociation,
  DeliveryProblemsController.store
);
routes.get(
  '/delivery/:id/problems',
  checkAssociation,
  DeliveryProblemsController.index
);
routes.put('/problem/:id/cancel-delivery', ProblemsController.update);
routes.get('/delivery/problems', ProblemsController.index);

// ////////////////////////////////////////////////////////////////////////////////

/*
    bellow routes with ADMIN authentication
*/

routes.use(adminMiddleware);

routes.post('/recipients', checkAssociation, RecipientController.store);
routes.put('/recipients', checkAssociation, RecipientController.update);

// Deliveryman
routes.post('/deliveryman', checkAssociation, DeliverymanController.store);
routes.get('/deliveryman', DeliverymanController.index);
routes.put('/deliveryman', checkAssociation, DeliverymanController.update);
routes.delete('/deliveryman', DeliverymanController.delete);

// Orders
routes.post('/orders', checkAssociation, OrderController.store);
routes.get('/orders', OrderController.index);
routes.put('/orders/:id', checkAssociation, OrderController.update);
routes.delete('/orders/:id', OrderController.delete);

// File uploads

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
