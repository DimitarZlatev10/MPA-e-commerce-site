const { createProduct } = require("../controller/products-controller");

const router = require("express").Router();

router.post("/createProduct", createProduct);

module.exports = router;
