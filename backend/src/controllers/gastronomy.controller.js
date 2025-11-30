const {gastronomyService} = require("../services")

exports.getAllGastronomy = async(req, res) =>{
    const result = await gastronomyService.getAllGastronomy();
    return res.status(result.statusCode).json(result);
}

exports.getGastronomyById = async(req, res) =>{
    const result = await gastronomyService.getGastronomyById(req.params.id);
    return res.status(result.statusCode).json(result);
}

exports.createGastronomy = async(req, res) =>{
    const result = await gastronomyService.saveGastronomy(req.body);
    return res.status(result.statusCode).json(result);
}

exports.updateGastronomyById = async (req, res) =>{
    const result = await gastronomyService.updateGastronomy(req.params.id, req.body);
    return res.status(result.statusCode).json(result);
}

exports.deleteGastronomyById = async (req, res) =>{
    const result =  await gastronomyService.deleteGastronomy(req.params.id);
    return res.status(result.statusCode).json(result);
}