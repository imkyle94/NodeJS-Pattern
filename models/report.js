import _sequelize from "sequelize";
const { Model, Sequelize } = _sequelize;

export default class report extends Model {
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
          unique: "reportNumber",
        },
        reporterName: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
        carNumber: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
        detectionDate: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        processingStatus: {
          type: DataTypes.TINYINT,
          allowNull: true,
          defaultValue: 0,
        },
        obuId: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
        location: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
        lat: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
        long: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
        transactionId: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
        imageMetadata: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
        registrationDate: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        counter: {
          type: DataTypes.INTEGER,
          allowNull: true,
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
        tableName: "report",
        timestamps: false,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "_id" }],
          },
          {
            name: "reportNumber",
            unique: true,
            using: "BTREE",
            fields: [{ name: "reportNumber" }],
          },
        ],
      }
    );
  }
}
