const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Por favor, ingresa un nombre de usuario'],
        unique: true,
    },
    email: {
        type: String,
        required: [true, 'Por favor, ingresa un correo electrónico'],
        unique: true,
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            'Por favor, ingresa un correo electrónico válido',
        ],
    },
    password: {
        type: String,
        required: [true, 'Por favor, ingresa una contraseña'],
        minlength: [6, 'La contraseña debe tener al menos 6 caracteres'],
    },
}, { timestamps: true });

// Encriptar la contraseña antes de guardar
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Método para comparar contraseñas
UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
