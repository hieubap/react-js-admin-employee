const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const modelSchema = new Schema(
  {
    fullname: { type: String },
    code: { type: String },
    position: { type: String },
    department: { type: String },
    fromTime: { type: String },
    fromDate: { type: String },
    toTime: { type: String },
    toDate: { type: String },
    reason: { type: String },
    checked: { type: Array },
    phone: { type: String },
    date_d: { type: String },
    date_m: { type: String },
    date_y: { type: String },
    signature: { type: String },
    status: { type: Number, default: 1 },
    ownerId: { type: String },
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

const SchemaModel = mongoose.model("employee___leave_form", modelSchema);
module.exports = SchemaModel;
