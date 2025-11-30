const {historyService} = require("../services")

exports.getAllHistory = async (req, res) =>{
    const result = await historyService.getAllHistory();
    res.status(result.statusCode).json(result);
}

exports.getHistoryById = async (req, res) =>{
    const result = await historyService.getHistoryById(req.params.id);
    res.status(result.statusCode).json(result);
}

exports.createHistory = async (req, res) =>{
    const result = await historyService.saveHistory(req.body);
    res.status(result.statusCode).json(result);
}

exports.updateHistoryById = async(req, res) =>{
    const result = await historyService.updateHistory(req.params.id, req.body);
    res.status(result.statusCode).json(result);
}

exports.deleteHistoryById = async (req, res) =>{
    const result = await historyService.deleteHistory(req.params.id);
    res.status(result.statusCode).json(result);
}