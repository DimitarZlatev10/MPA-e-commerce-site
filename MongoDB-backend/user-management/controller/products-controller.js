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

const addProductComment = async (req, res, next) => {
  const { username, rating, comment, userId, productId, userImage, commentId } =
    req.body;
  const product = await Product.findById(productId);

  product.comments.push({
    username: username,
    rating: rating,
    comment: comment,
    owner: userId,
    userImage: userImage,
    commentId: commentId,
  });

  await product.save();

  return res.status(200).json({ message: "Successfully added review!" });
};

const deleteProductComment = async (req, res, next) => {
  const { commentId, productId } = req.body;
  const product = await Product.findById(productId);

  // product.comments.forEach((c, i) => {
  //   if (c.commentId == commentId) {
  //     product.comments.splice(i, 1);
  //   }
  // });
  let i = 0;
  for (const comment of product.comments) {
    if (comment.commentId == commentId) {
      product.comments.splice(i, 1);
      await product.save();
      return res
        .status(200)
        .json({ message: "Your comment has been deleted successfully!" });
    }
    i++;
  }

  return res.status(200).json({ message: "Comment not found!" });

  // return res
  //   .status()
  //   .json({ message: "Your comment has been deleted successfully!" });
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  addProductComment,
  deleteProductComment,
};
