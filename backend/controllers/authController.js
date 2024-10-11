const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Función para generar JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET_KEY, {
        expiresIn: '30d',
    });
};

// Registro de Usuario
exports.register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Verificar si el usuario ya existe
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'Usuario ya registrado' });
        }

        // Crear nuevo usuario
        const user = await User.create({
            username,
            email,
            password,
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                username: user.username,
                email: user.email,
                token: generateToken(user._id),
            });
        } else {
            res.status(400).json({ message: 'Datos de usuario inválidos' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error del servidor' });
    }
};

// Login de Usuario
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Buscar usuario por correo
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                username: user.username,
                email: user.email,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Correo o contraseña inválidos' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error del servidor' });
    }
};
