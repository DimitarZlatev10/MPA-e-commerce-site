const Product = require("../model/Product");

const createProduct = async (req, res, next) => {
  const { title, image, shortDescription, description, price, type, inStock } =
    req.body;
  if (
    (!title && title == "") ||
    (!image && image == "") ||
    (!shortDescription && shortDescription == "") ||
    (!description && description == "") ||
    (!price && price < 0) ||
    (!type && type == "") ||
    !inStock ||
    inStock.length < 0
  ) {
    return res.status(422).json({ message: "Invalid Data" });
  }

  let product;

  try {
    product = new Product({
      title,
      image,
      shortDescription,
      description,
      price,
      type,
      inStock,
    });

    product = await product.save();
  } catch (err) {
    return next(err);
  }
  if (!product) {
    return res.status(500).json({ message: "Unable to create product" });
  }

  return res.status(201).json(product);
};

const getAllProducts = async (req, res, next) => {
  let products;
  try {
    products = await Product.find();
  } catch (err) {
    return next(err);
  }
  if (!products) {
    return res.status(500).json({ message: "Internal Server Error" });
  }

  return res.status(200).json(products);
};

const getProductById = async (req, res, next) => {
  const { id } = req.body;
  let product;
  try {
    product = await Product.findById(id);
  } catch (err) {
    return next(err);
  }
  if (!product) {
    return res.status(500).json({ message: "Unable to find product" });
  }
  return res.status(200).json(product);
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
};
