import { Sequelize, Model } from 'sequelize';

export default class Message extends Model {
  static init(sequelize) {
    return super.init(Message.modelFields, { sequelize });
  }

  static modelFields = {
    content: {
      type: Sequelize.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Oops. The content of your message cannot be empty',
        },
      },
      set(value) {
        this.setDataValue('content', value.trim());
      },
    },
    status: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args: [['UNREAD', 'READ']],
          msg: 'Oops. the status of a message can either be READ or UNREAD',
        },
      },
      defaultValue: 'UNREAD',
    },
  }

  static associate(models) {
    const { Contact } = models;

    Message.belongsTo(Contact, {
      foreignKey: 'senderId',
      as: 'sender',
      onDelete: 'CASCADE',
    });

    Message.belongsTo(Contact, {
      foreignKey: 'receiverId',
      as: 'receiver',
      onDelete: 'CASCADE',
    });
  }
}
