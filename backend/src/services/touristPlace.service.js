const ToristPlace = require("../models/touristPlace.model");
const { generateResponse } = require("../utils/handleResponse");

const savePlace = async (data) =>{
    try {
        const touristPlace = new ToristPlace(data);
        const saved = await touristPlace.save()

        return generateResponse(201, true, "Lugar turistico guardado correctamente", saved);
    } catch (error) {
        return generateResponse (500, false, "Error al guardar lugar turistico", null, error.message);
    }
}

const getAllTouristPlace = async () =>{
    try {
        const touristPlace = await ToristPlace.find()
        return generateResponse (201, true, "Lugares turisticos obtenidos correctamente", touristPlace);
    } catch (error) {
        return generateResponse(500, false, "Error al obtener los lugares turisticos", null, error.message);
    }
}

const getTouristPlaceById = async (id) =>{
    try {
        const touristPlace = await ToristPlace.findById(id);

        if (!touristPlace){
            return generateResponse(404, false, "Lugar turistico no encontrado");
        }

        return generateResponse(201, true, "Lugar turistico obtenido correctamente", touristPlace);
    } catch (error) {
        return generateResponse(500, false, "Error al obtener lugar turistico", null, error.message);
    }
}

const updateTouristPlace = async (id, data) =>{
    try {
        const touristPlace = await ToristPlace.findByIdAndUpdate(id, data,
            {new: true}
        )

        if (!touristPlace){
            return generateResponse(404, false, "Lugar turistico no encontrado");
        }

        return generateResponse(201, true, "Lugar turistico actualizado correctamente", touristPlace);
    } catch (error) {
        return generateResponse(500, false, "Error al actualizar el lugar turistico", null, error.message);
    }
}

const deleteTouristPlace = async (id) =>{
    try {
        const touristPlace = await ToristPlace.findByIdAndDelete(id)

        if (!touristPlace){
            return generateResponse(404, false, "Lugar turistico no encontrado");
        }

        return generateResponse(201, true, "Lugar turistico eliminado correctamente", touristPlace);

    } catch (error) {
        return generateResponse(500, false, "Error al eliminar lugar turistico", null, error.message);
    }
}

module.exports ={
    savePlace,
    getAllTouristPlace,
    getTouristPlaceById,
    updateTouristPlace,
    deleteTouristPlace,
}