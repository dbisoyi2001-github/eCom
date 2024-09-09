const { imageUploadUtil } = require("../../helpers/clodinary");

const handleImageUplad = async (req, res) => {
  try {
    const b64 = buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await imageUploadUtil(url);

    res.json({
      success: true,
      message: "image uploaded to cloudinary",
      result: result,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "error during image upload",
    });
  }
};

module.exports = { handleImageUplad };
