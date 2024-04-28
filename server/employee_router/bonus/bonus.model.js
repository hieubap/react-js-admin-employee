const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const modelSchema = new Schema(
  {
    nameBonus: { type: String },
    balance: { type: Number },
    memberIds: { type: Array },
    dateApply: { type: Date },
    note: { type: String },
    allMember: { type: Boolean, default: false },
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

const SchemaModel = mongoose.model("employee___bonus", modelSchema);
module.exports = SchemaModel;
