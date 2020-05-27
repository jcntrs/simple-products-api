const Product = require('../models/Product');

exports.createProduct = async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        newProduct.createdAt = Date.now();
        newProduct.save();
        res.json(newProduct);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error al crear el producto' });
    }
}

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find({}).sort({ createdAt: -1 });
        res.json(products);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error al obtener productos' });
    }
}

exports.getProductById = async (req, res) => {
    try {
        const { productId } = req.params;
        const product = await Product.findById(productId);
        if (!product)
            return res.status(404).json({ message: 'Producto no encontrado' });
        res.json(product);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error al obtener producto' });
    }
}