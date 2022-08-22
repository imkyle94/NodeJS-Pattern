import _sequelize from "sequelize";
const { Model, Sequelize } = _sequelize;

export default class user extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        _id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        userId: {
          type: DataTypes.STRING(50),
          allowNull: false,
          defaultValue: "8888",
        },
        phoneNumber: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
        email: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
        address: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
        gender: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
        importedService: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
        servicePlatform: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
        age: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        dob: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
        password: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
        name: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
        registration: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 2,
        },
        counter: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        lastConnection: {
          type: DataTypes.DATE,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: "user",
        timestamps: false,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "_id" }],
          },
        ],
      }
    );
  }
}
