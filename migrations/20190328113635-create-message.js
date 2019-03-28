import logger from '../config/logger';

export default {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('Messages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      content: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      senderId: {
        references: {
          model: 'Contacts',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        type: Sequelize.INTEGER,
      },
      receiverId: {
        references: {
          model: 'Contacts',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    }).catch(error => logger.error(error));
  },
  down(queryInterface) {
    return queryInterface.dropTable('Messages')
      .catch(error => logger.error(error));
  },
};
