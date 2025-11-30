const { Schema, model } = require("mongoose");

const HistorySchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    images: [{
      type: String
    }],
    author: {
      type: String,
      default: "Administración"
    }
  },
  {
    timestamps: true
  }
);

module.exports = model(
    "History", 
    HistorySchema, 
    "historicos"
);
