const {touristPlaceService} = require("../services")

exports.getAllPlaces = async (req, res) =>{
    const result = await touristPlaceService.getAllTouristPlace();
    return res.status(result.statusCode).json(result);
}

exports.getPlaceById = async (req, res) =>{
    const result = await touristPlaceService.getTouristPlaceById(req.params.id);
    return res.status(result.statusCode).json(result);
}

exports.createPlace = async (req, res) =>{
    const result = await touristPlaceService.savePlace(req.body);
    return res.status(result.statusCode).json(result);
}

exports.updatePlaceById = async (req, res) =>{
    const result = await touristPlaceService.updateTouristPlace(req.params.id, req.body);
    return res.status(result.statusCode).json(result);
}

exports.deletePlaceById = async (req, res) =>{
    const result = await touristPlaceService.deleteTouristPlace(req.params.id);
    return res.status(result.statusCode).json(result);
}