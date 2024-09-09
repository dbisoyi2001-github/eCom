const express = require("express");
const {
  handleImageUplad,
} = require("../../controllers/admin/products-controller");
const { upload } = require("../../helpers/clodinary");

const router = express.Router();

router.post("/upload-image", upload.single("my_file"), handleImageUplad);

module.exports = router;
