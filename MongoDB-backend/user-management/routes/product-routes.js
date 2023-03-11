const {
  createProduct,
  getAllProducts,
  getProductById,
  addProductComment,
} = require("../controller/products-controller");

const router = require("express").Router();

router.get("/", getAllProducts);

router.post("/createProduct", createProduct);
router.post("/getProductById", getProductById);
router.post("/addProductComment", addProductComment);

module.exports = router;
