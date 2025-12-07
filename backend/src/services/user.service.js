const User = require("../models/user.model");
const {generateResponse} = require("../utils/handleResponse");

const saveUser = async(data) =>{
    try {

        const exists = await User.findOne({ email: data.email });
        if (exists) {
            return generateResponse(409, false, "El email ya esta registrado");
        }

        const user = new User(data);
        const saved = await user.save();

        const savedUser = saved.toObject();
        delete savedUser.password;

        return generateResponse(201, true, "Usuario creado correctamente", savedUser);

    } catch (error) {
        return generateResponse(
  500,
  false,
  "Error al guardar usuario",
  null,
  {
    message: error.message,
    name: error.name,
    stack: error.stack,
    errors: error.errors,
    code: error.code,
    kind: error.kind,
    path: error.path
  }
);

    }
}

const getAllUsers = async() =>{
    try {
        const user = await User.find().select("-password");
        return generateResponse(200, true, "Usuarios obtenidos correctamente", user)

    } catch (error) {
        return generateResponse(500, false, "Error al obtener usuarios", null, error.message);
    }
}

const getUserById = async (id) =>{
    try {
        const user = await User.findById(id).select("-password");
        if (!user){
            return generateResponse (404, false, "Usuario no encontrado");
        }

        return generateResponse (200, true, "usuario obtenido correctamente", user);

    } catch (error) {
        return generateResponse(500, false, "Error al obtener usuario", null, error.message);
    }
}

const updateUser = async (id, data) =>{
    try {
        const user = await User.findByIdAndUpdate(id, data,
            {new: true}
        ).select("-password")
        if (!user) {
            return generateResponse(404, false, "usuario no encontrado");
        }
        return generateResponse (200, true, "usuario actualizado correctamente", user)

    } catch (error) {
        return generateResponse(500, false, "Error al actualizar usuario", null, error.message);
    }
}

const deleteUser = async (id) =>{
    try {
        const user = await User.findByIdAndDelete(id).select("-password");
        if (!user){
            return generateResponse(404, false, "usuario no encontrado");
        }
        return generateResponse(200, true, "usuario eliminado correctamente", user)

    } catch (error) {
        return generateResponse(500, false, "Error al eliminar usuario", null, error.message);
    }
}

module.exports ={
    saveUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
}