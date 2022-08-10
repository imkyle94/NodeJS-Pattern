import mariadb from "mariadb";
import mongoose from "mongoose";

const adminSchema = mongoose.Schema(
  {
    userId: {
      type: String,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
      lowercase: true,
    },
    dob: {
      type: Number,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
    },
    accountStatus: {
      type: Boolean,
    },
    deleteStatus: {
      type: Boolean,
    },
    menuId: {
      type: Array,
    },
    //  [
    // 	 {
    // 		 type: mongoose.Schema.Types.Number,
    // 		 ref: 'menudbs',
    // 	 },
    //  ],
    company: {
      type: String,
    },
    date: {
      type: Number,
    },

    noticeId: [
      {
        type: mongoose.Schema.Types.Number,
        ref: "noticedbs",
      },
    ],
    pressId: [
      {
        type: mongoose.Schema.Types.Number,
        ref: "pressdbs",
      },
    ],
    FAQId: [
      {
        type: mongoose.Schema.Types.Number,
        ref: "FAQdbs",
      },
    ],
    supplierId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "supplier",
    },
    popupId: [
      {
        type: mongoose.Schema.Types.Number,
        ref: "popupdbs",
      },
    ],
    lastConnection: {
      type: Date,
    },
  },
  { timestamps: true }
);

export const adminModel = mongoose.model("admindb", adminSchema);
