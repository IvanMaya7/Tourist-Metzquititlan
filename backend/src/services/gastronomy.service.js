const Gastronomy = require("../models/gastronomy.model");
const {generateResponse} = require("../utils/handleResponse");

const saveGastronomy = async (data) =>{
    try {
        const gastronomy = new Gastronomy(data);
        const saved = await gastronomy.save();
        return generateResponse(201, true, "Turismo gastronomico guardado correctamente", saved);
    } catch (error) {
        return generateResponse(500, false, "Error al guardar turismo gastronomico", null, error.message);
    }
}

const getAllGastronomy = async() =>{
    try {
        const gastronomy = await Gastronomy.find()
        return generateResponse(201, true, "Turismos gastronomicos obtenidos correctamente", gastronomy);
    } catch (error) {
        return generateResponse(500, false, "Error al mostrar turismos gastronomicos", null, error.message);
    }
}

const getGastronomyById = async (id) =>{
    try {
        const gastronomy = await Gastronomy.findById(id);
        if(!gastronomy) {
            return generateResponse(404, false, "Turismo gastronomico no encontrado");
        }
        return generateResponse(201, true, "Turismo gastronomico obtenido correctamente", gastronomy);
    } catch (error) {
        return generateResponse(500, false, "Error al mostrar turismo gastronomico", null, error.message);
    }
}

const updateGastronomy = async(id, data) =>{
    try {
        const gastronomy = await Gastronomy.findByIdAndUpdate(id, data, 
        {new: true}
        )
        if(!gastronomy) {
            return generateResponse(404, false, "Turismo gastronomico no encontrado");
        }
        return generateResponse(201, true, "Turismo gastronomico actualizado correctamente", gastronomy);
    } catch (error) {
        return generateResponse(500, false, "Error al actualizar turismo gastronomico", null, error.message);
    }
}

const deleteGastronomy = async(id) =>{
    try {
        const gastronomy = await Gastronomy.findByIdAndDelete(id);
        if(!gastronomy) {
            return generateResponse(404, false, "Turismo gastronomico no encontrado");
        }
        return generateResponse(201, true, "Turismo gastronomico eliminado correctamente", gastronomy);
    } catch (error) {
        return generateResponse(500, false, "Error al eliminar turismo gastronomico", null, error.message);
    }
}

module.exports = {
    saveGastronomy,
    getAllGastronomy,
    getGastronomyById,
    updateGastronomy,
    deleteGastronomy,
}