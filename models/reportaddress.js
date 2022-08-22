import _sequelize from "sequelize";
const { Model, Sequelize } = _sequelize;

export default class reportaddress extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        _id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        reportNumber: {
          type: DataTypes.STRING(100),
          allowNull: true,
          references: {
            model: "report",
            key: "reportNumber",
          },
        },
        s3address: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
        IPFSaddress: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: "reportaddress",
        timestamps: false,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "_id" }],
          },
          {
            name: "FK_reportaddress_report",
            using: "BTREE",
            fields: [{ name: "reportNumber" }],
          },
        ],
      }
    );
  }
}
