import mongoose from "mongoose";
import autoIncrement from "mongoose-auto-increment";

const cardInformationSchema = mongoose.Schema(
  {
    card: {
      type: String,
    },
    cardAlias: {
      type: String,
    },
    mainCardYn: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

const paymentHistorySchema = mongoose.Schema(
  {
    txnID: {
      type: String,
    },
    Claimed: {
      type: Boolean,
    },
    txnResponse: {
      type: Object,
    },
  },
  { timestamps: true }
);

const userSchema = mongoose.Schema(
  {
    phoneNumber: {
      type: String,
      unique: true,
      required: true,
    },
    userId: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      //unique: true, 07/23 이메일은 키가 아니고 핸드폰 번호가 키로 확정
      lowercase: true,
    },
    address: {
      type: String,
      lowercase: true,
    },
    gender: {
      type: String,
      lowercase: true,
    },
    importedService: {
      type: String,
      lowercase: true,
    },
    servicePlatform: {
      type: String,
      lowercase: true,
    },
    age: {
      type: Number,
    },
    dob: {
      type: String,
    },
    password: {
      type: String,
    },
    name: {
      type: String,
    },
    password: {
      type: Object,
      required: true,
    },
    did: {
      type: String,
    },
    drivingLicense: {
      type: Number,
    },
    registration: {
      type: Number, // 0 for DB registration, 1 for MID-DID registration, 2 for UTM registration
    },
    lastConnection: {
      type: Date,
    },
    counter: {
      type: Number,
    },
    cardInformation: [cardInformationSchema],
    paymentHistory: [paymentHistorySchema],
    questionId: [
      {
        type: mongoose.Schema.Types.Number,
        ref: "questiondbs",
      },
    ],
    delStatus: {
      // 탈퇴상태
      type: Boolean,
      default: false,
    },
    delDate: {
      // 탈퇴일
      type: Date,
    },
    delReason: {
      // 탈퇴사유
      type: String,
    },
  },
  { timestamps: true }
);

autoIncrement.initialize(mongoose.connection);
userSchema.plugin(autoIncrement.plugin, {
  model: "Users",
  field: "userId",
  startAt: 1,
  incrementBy: 1,
});

export const userModel = mongoose.model("Users", userSchema);
