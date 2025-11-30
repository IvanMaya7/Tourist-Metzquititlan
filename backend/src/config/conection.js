const mongoose = require("mongoose");
const conection = async () => {
  console.log("Desde la funcion Conection, Intentando conectar");
  try {
    await mongoose.connect("mongodb://localhost:27017/turismo_metztitlan");
    console.log("::: EXITO Conectado a la BD :::");
  } catch (error) {
    console.log("Error", error);
    throw new Error("::: Error No se ha podido establecer la conexion :::");
  }
};

module.exports = conection;
