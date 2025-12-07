const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { generateResponse } = require("../utils/handleResponse");

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return res.status(404).json(
                generateResponse(404, false, "Usuario no encontrado")
            );
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json(
                generateResponse(401, false, "Credenciales incorrectas")
            );
        }

        const token = jwt.sign(
            {
                id: user._id,
                role: user.role,
                email: user.email
            },
            process.env.JWT_SECRET,               
            { expiresIn: process.env.JWT_EXPIRES }
        );

        const userData = user.toObject();
        delete userData.password;

        return res.status(200).json(
            generateResponse(200, true, "Login exitoso", {
                user: userData,
                token
            })
        );

    } catch (error) {
        return res.status(500).json(
            generateResponse(500, false, "Error en login", null, error.message)
        );
    }
};
