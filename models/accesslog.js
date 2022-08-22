import _sequelize from "sequelize";
const { Model, Sequelize } = _sequelize;

export default class accesslog extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        _id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        accessDate: {
          type: DataTypes.DATEONLY,
          allowNull: true,
        },
        accessTime: {
          type: DataTypes.TIME,
          allowNull: true,
        },
        sessionId: {
          type: DataTypes.STRING(1000),
          allowNull: true,
        },
        accessType: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
        adminId: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
        userId: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
        endDate: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
        userIP: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: "accesslog",
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
