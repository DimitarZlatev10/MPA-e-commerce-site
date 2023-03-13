const {
  createProduct,
  getAllProducts,
  getProductById,
  addProductComment,
  deleteProductComment,
} = require("../controller/products-controller");

const router = require("express").Router();

router.get("/", getAllProducts);

router.post("/createProduct", createProduct);
router.post("/getProductById", getProductById);
router.post("/addProductComment", addProductComment);
router.post("/deleteProductComment", deleteProductComment);

module.exports = router;
