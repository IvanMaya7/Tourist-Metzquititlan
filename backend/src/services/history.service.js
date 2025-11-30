const History = require("../models/history.model");
const {generateResponse} = require("../utils/handleResponse");

const saveHistory = async (data) =>{
    try {
        const history = new History(data);
        const saved = await history.save();

        return generateResponse(201, true, "Dato historico guardado correctamente", saved);

    } catch (error) {
        return generateResponse(500, false, "Error al guardar dato historico", null, error.message);
    }
}

const getAllHistory = async() =>{
    try {
        const history = await History.find();
        return generateResponse(201, true, "Datos historicos obtenidos correctamente", history)
    } catch (error) {
        return generateResponse(500, false, "Error al mostrar datos historicos", null, error.message);
    }
}

const getHistoryById = async(id) =>{
    try {
        const history = await History.findById(id);
        if (!history) {
            return generateResponse(404, false, "Dato historico no encontrado");
        }

        return generateResponse(201, true, "Dato historico obtenido correctamente", history);

    } catch (error) {
        return generateResponse(500, false, "Error al obtener dato historico", null, error.message);
    }
}

const updateHistory = async(id, data) =>{
    try {
        const history = await History.findByIdAndUpdate(id, data, 
            {new: true}
        )

        if(!history){
            return generateResponse(404, false, "Dato historico no encontrado");
        }

        return generateResponse(201, true, "Dato historico actualizado correctamente", history);

    } catch (error) {
        return generateResponse(500, false, "Error al actualizar dato historico", null, error.message);
    }
}

const deleteHistory = async (id) =>{
    try {
        const history = await History.findByIdAndDelete(id);
        
        if(!history){
            return generateResponse(404, false, "Dato historico no encontrado");
        }
        
        return generateResponse(201, true, "Dato historico eliminado correctamente", history);
    } catch (error) {
        return generateResponse(500, false, "Error al eliminar dato historico", null, error.message);
    }
}

module.exports = {
    saveHistory,
    getAllHistory,
    getHistoryById,
    updateHistory,
    deleteHistory,
}