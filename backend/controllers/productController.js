const Product = require('../models/Product');

// Obtener todos los productos
exports.getProducts = async (req, res) => {
    try {
        const productos = await Product.find();
        res.json(productos);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los productos' });
    }
};

// Obtener un producto por ID
exports.getProductById = async (req, res) => {
    try {
        const producto = await Product.findById(req.params.id);
        if (producto) {
            res.json(producto);
        } else {
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el producto' });
    }
};

// Crear un nuevo producto
exports.createProduct = async (req, res) => {
    const { nombre, descripcion, precio, categoria, imagen, stock } = req.body;

    try {
        const producto = new Product({
            nombre,
            descripcion,
            precio,
            categoria,
            imagen,
            stock,
        });

        const creado = await producto.save();
        res.status(201).json(creado);
    } catch (error) {
        res.status(400).json({ message: 'Datos del producto inválidos' });
    }
};

// Actualizar un producto
exports.updateProduct = async (req, res) => {
    const { nombre, descripcion, precio, categoria, imagen, stock } = req.body;

    try {
        const producto = await Product.findById(req.params.id);

        if (producto) {
            producto.nombre = nombre || producto.nombre;
            producto.descripcion = descripcion || producto.descripcion;
            producto.precio = precio || producto.precio;
            producto.categoria = categoria || producto.categoria;
            producto.imagen = imagen || producto.imagen;
            producto.stock = stock !== undefined ? stock : producto.stock;

            const actualizado = await producto.save();
            res.json(actualizado);
        } else {
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Datos del producto inválidos' });
    }
};

// Eliminar un producto
exports.deleteProduct = async (req, res) => {
    try {
        const producto = await Product.findById(req.params.id);

        if (producto) {
            await producto.remove();
            res.json({ message: 'Producto eliminado' });
        } else {
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el producto' });
    }
};
