const { Schema, model } = require("mongoose");

const GastronomySchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    ingredients: [{
      type: String
    }],
    images: [{
      type: String
    }],
    recommendedPlaces: [{
      type: String,
    }]
  },
  {
    timestamps: true
  }
);

module.exports = model(
    "Gastronomy", 
    GastronomySchema,
    "Gastronomia"
);
