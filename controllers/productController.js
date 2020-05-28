const Product = require('../models/Product');

exports.createProduct = async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        newProduct.createdAt = Date.now();
        newProduct.save();
        res.json(newProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el producto' });
    }
}

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find({}).sort({ createdAt: -1 });
        res.json(products);
    } catch (error) {
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
        res.status(500).json({ message: 'Error al obtener producto' });
    }
}

exports.updateProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const updateProduct = req.body;
        const currentProduct = await Product.findById(productId);

        if (!currentProduct)
            return res.status(404).json({ message: 'Producto no encontrado' });

        const updatedProduct = await Product.findByIdAndUpdate({ _id: productId }, { $set: updateProduct }, { new: true });
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar producto' });
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const currentProduct = await Product.findById(productId);

        if (!currentProduct) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        await Product.findOneAndRemove({ _id: productId });
        res.json({ message: 'Producto eliminado' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar producto' });
    }
}