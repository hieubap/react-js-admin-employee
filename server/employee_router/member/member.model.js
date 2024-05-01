const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const modelSchema = new Schema(
  {
    fullname: { type: String },
    codeMember: { type: String },
    address: { type: String },
    phone: { type: String },
    gender: { type: String },
    email: { type: String },
    birth: { type: Date },
    joinTime: { type: Date },
    salary: { type: Number },
    bankName: { type: String },
    bankNumber: { type: String },
    note: { type: String },

    deleted: {type: Boolean}
  },
  {
    // _id: false,
    autoIndex: true,
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

const SchemaModel = mongoose.model("employee___member", modelSchema);
module.exports = SchemaModel;
