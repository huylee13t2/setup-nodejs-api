const express = require("express");
const router = express.Router();

const product = require("../controllers/product");

router.get("/", product.getProducts);
router.get("/:id", product.getProdcutDetail);
router.post("/", product.createProduct);

module.exports = router;