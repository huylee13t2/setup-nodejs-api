const express = require("express");
const router = express.Router();
const checkAccount = require("../middleware/checkAccount");

const product = require("./product");
const user = require("./user");

router.use("/users", user);

router.use(checkAccount);
router.use("/product", product);

module.exports = router;