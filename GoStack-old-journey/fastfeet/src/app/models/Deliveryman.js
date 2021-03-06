import { Sequelize, Model } from 'sequelize';

class Deliveryman extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        avatar_id: Sequelize.STRING,
      },
      {
        sequelize,
        tableName: 'deliverymen',
      }
    );
  }
}

export default Deliveryman;
