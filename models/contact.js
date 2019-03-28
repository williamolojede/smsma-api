import { Sequelize, Model } from 'sequelize';

export default class Contact extends Model {
  static init(sequelize) {
    return super.init(Contact.modelFields, { sequelize });
  }

  static modelFields = {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Oops. There is an existing contact with this name.',
      },
      validate: {
        is: {
          args: /^[A-Za-z][A-Za-z .-]{2,10}$/i,
          msg: 'name must start with a letter, can have spaces, fullstops or hyphens and be 2 - 10 characters long.',
        },
      },
      set(value) {
        this.setDataValue('name', value.trim());
      },
    },
    phone: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Oops. There is an existing contact with this phone number.',
      },
      validate: {
        is: {
          args: /^\d{11}$/,
          msg: 'Please enter a valid phone number.',
        },
      },
      set(value) {
        this.setDataValue('phone', value.trim());
      },
    },
  }

  static associate(models) {
    const {
      Message,
    } = models;

    Contact.hasMany(Message, {
      foreignKey: 'senderId',
      as: 'sentMessages',
    });

    Contact.hasMany(Message, {
      foreignKey: 'receiverId',
      as: 'receivedMessages',
    });
  }
}
