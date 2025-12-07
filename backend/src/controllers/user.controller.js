const {userService} = require("../services")

exports.getAllUsers = async (req, res) =>{
    const result = await userService.getAllUsers();
    return res.status(result.statusCode).json(result);
}

exports.getUserById = async (req, res) =>{
    const result = await userService.getUserById(req.params.id);
    return res.status(result.statusCode).json(result);
}

exports.createUser = async (req, res) =>{
    const result = await userService.saveUser(req.body);
    return res.status(result.statusCode).json(result);
}

exports.updateUserById = async (req, res) =>{
    const result = await userService.updateUser(req.params.id, req.body);
    return res.status(result.statusCode).json(result);
}

exports.deleteUserById = async (req, res) =>{
    const result = await userService.deleteUser(req.params.id);
    return res.status(result.statusCode).json(result);
}