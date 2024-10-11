const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'Por favor, ingresa el nombre del producto'],
    },
    descripcion: {
        type: String,
        required: [true, 'Por favor, ingresa una descripción del producto'],
    },
    precio: {
        type: Number,
        required: [true, 'Por favor, ingresa el precio del producto'],
    },
    categoria: {
        type: String,
        required: [true, 'Por favor, ingresa la categoría del producto'],
    },
    imagen: {
        type: String,
        required: [true, 'Por favor, ingresa la URL de la imagen del producto'],
    },
    stock: {
        type: Number,
        required: [true, 'Por favor, ingresa la cantidad en stock'],
        default: 0,
    },
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);
