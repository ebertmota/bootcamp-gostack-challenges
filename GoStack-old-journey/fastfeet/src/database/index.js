import Sequelize from 'sequelize';
import mongoose from 'mongoose';
import Recipient from '../app/models/Recipient';
import User from '../app/models/User';
import Deliveryman from '../app/models/Deliveryman';
import Order from '../app/models/Order';
import File from '../app/models/File';
import DeliveryProblems from '../app/models/DeliveryProblems';

import databaseConfig from '../config/database';

const models = [User, Recipient, Deliveryman, Order, File, DeliveryProblems];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection));
    models.map(
      model => model.associate && model.associate(this.connection.models)
    );
  }

  mongo() {
    this.mongoConnection = mongoose.connect(process.env.MONGO_URL_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
    });
  }
}

export default new Database();
