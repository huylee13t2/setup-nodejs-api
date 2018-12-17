const Product = require("../models/Product");

getProducts = async (req, res, next) => {
	try{
		const products = await Product.find({}).exec();

		return res.status(200).json(products);
	} catch (err){
		next(err);
	}
};

getProdcutDetail = async (req, res, next) => {
	try{
		const _id = req.params.id;
		const product = await Product.findOne({ _id }).exec();

		return res.status(200).json(product);
	} catch(err){
		next(err);
	}
}

createProduct = async (req, res) => {
	try{
		const { name, price } = req.body;
		const product = new Product({
			name,
			price,
		});
		await product.save();

		return res.status(200).json(product);
	} catch (err){
		next(err);
	}
}

module.exports = {
	getProducts,
	createProduct,
	getProdcutDetail,
}