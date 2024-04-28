const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const modelSchema = new Schema(
  {
    userId: { type: String },
    dateKey: { type: String },
    checkIn: { type: Date },
    checkOut: { type: Date },
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

const SchemaModel = mongoose.model("employee___checking", modelSchema);
module.exports = SchemaModel;
