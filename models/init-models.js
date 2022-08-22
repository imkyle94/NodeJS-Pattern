import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _accesslog from "./accesslog.js";
import _admin from "./admin.js";
import _report from "./report.js";
import _reportaddress from "./reportaddress.js";
import _user from "./user.js";

export default function initModels(sequelize) {
  const accesslog = _accesslog.init(sequelize, DataTypes);
  const admin = _admin.init(sequelize, DataTypes);
  const report = _report.init(sequelize, DataTypes);
  const reportaddress = _reportaddress.init(sequelize, DataTypes);
  const user = _user.init(sequelize, DataTypes);

  reportaddress.belongsTo(report, {
    as: "reportNumber_report",
    foreignKey: "reportNumber",
  });
  report.hasMany(reportaddress, {
    as: "reportaddresses",
    foreignKey: "reportNumber",
  });

  return {
    accesslog,
    admin,
    report,
    reportaddress,
    user,
  };
}
