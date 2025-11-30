const { Schema, model } = require("mongoose");

const TouristPlaceSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    description: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    images: [{
      type: String
    }],
    category: {
      type: String,
      enum: ["natural", "histórico", "religioso", "mirador", "gastronomía", "otro"],
      default: "otro"
    },
    openHours: {
      type: String,
      default: "No especificado"
    },
    price: {
      type: String,
      default: "Gratis"
    }
  },
  {
    timestamps: true
  }
);

module.exports = model(
    "TouristPlace", 
    TouristPlaceSchema,
    "Lugares"
);
