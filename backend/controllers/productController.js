const Product = require('../models/Product');
const Category = require('../models/Category');

// Obtener todos los productos o filtrar por categoría
exports.getProducts = async (req, res) => {
    try {
        const { category } = req.query;
        let filter = {};

        if (category) {
            // Buscar la categoría por nombre
            const categoria = await Category.findOne({ nombre: category.toUpperCase() });
            if (categoria) {
                filter.categoria = categoria._id;
            } else {
                return res.status(404).json({ message: 'Categoría no encontrada' });
            }
        }

        const products = await Product.find(filter).populate('categoria', 'nombre');
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los productos', error: error.message });
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
    try {
        const { nombre, descripcion, precio, categoria, imagen, stock } = req.body;

        // Verificar si la categoría existe
        const categoriaExistente = await Category.findById(categoria);
        if (!categoriaExistente) {
            return res.status(400).json({ message: 'Categoría inválida' });
        }

        const product = await Product.create({
            nombre,
            descripcion,
            precio,
            categoria,
            imagen,
            stock,
        });

        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el producto', error: error.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, precio, categoria, imagen, stock } = req.body;

        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        // Si se está actualizando la categoría, verificar su existencia
        if (categoria) {
            const categoriaExistente = await Category.findById(categoria);
            if (!categoriaExistente) {
                return res.status(400).json({ message: 'Categoría inválida' });
            }
            product.categoria = categoria;
        }

        // Actualizar otros campos si están presentes
        if (nombre) product.nombre = nombre;
        if (descripcion) product.descripcion = descripcion;
        if (precio) product.precio = precio;
        if (imagen) product.imagen = imagen;
        if (stock) product.stock = stock;

        await product.save();

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el producto', error: error.message });
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


exports.getProductsByCategory = async (req, res) => {
    try {
        const { category } = req.params;

        // Buscar la categoría por nombre
        const categoria = await Category.findOne({ nombre: category.toUpperCase() });

        if (!categoria) {
            return res.status(404).json({ message: 'Categoría no encontrada' });
        }

        const products = await Product.find({ categoria: categoria._id }).populate('categoria', 'nombre');

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener productos por categoría', error: error.message });
    }
};
