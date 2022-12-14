import _sequelize from "sequelize";
const { Model, Sequelize } = _sequelize;

export default class admin extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        _id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        adminId: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
        password: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
        phoneNumber: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
        name: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
        counter: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 0,
        },
        registration: {
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
        tableName: "admin",
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
