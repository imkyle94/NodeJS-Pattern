import mongoose from "mongoose";
import autoIncrement from "mongoose-auto-increment";

const reportSchema = mongoose.Schema(
  {
    reportNumber: {
      type: String,
      unique: true,
      required: true,
    },
    carNumber: {
      type: Number,
      required: true,
    },
    detectionDate: {
      type: String,
      //unique: true, 07/23 이메일은 키가 아니고 핸드폰 번호가 키로 확정
      lowercase: true,
    },
    location: {
      type: String,
      lowercase: true,
    },
    imageMetadata: {
      type: String,
      lowercase: true,
    },
    imageFiles: {
      type: String,
      lowercase: true,
    },
  },
  { timestamps: true }
);

autoIncrement.initialize(mongoose.connection);
reportSchema.plugin(autoIncrement.plugin, {
  model: "Reports",
  field: "reportId",
  startAt: 1,
  incrementBy: 1,
});

export const reportModel = mongoose.model("Reports", reportSchema);
