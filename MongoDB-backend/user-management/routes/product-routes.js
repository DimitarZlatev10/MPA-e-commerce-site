const {
  createProduct,
  getAllProducts,
  getProductById,
} = require("../controller/products-controller");

const router = require("express").Router();

router.get("/", getAllProducts);

router.post("/createProduct", createProduct);
router.post("/getProductById", getProductById);

module.exports = router;
