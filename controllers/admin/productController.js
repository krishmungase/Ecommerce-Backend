const { imageUploadUtils } = require("../../helpers/cloudinary");
const Product = require("../../models/ProductModel");

const handleImageUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }


    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;


    const result = await imageUploadUtils(url);


    if (!result || !result.secure_url || !result.public_id) {
      throw new Error("Failed to upload to Cloudinary");
    }

    res.status(200).json({
      success: true,
      data: {
        cloudinaryUrl: result.secure_url,
        publicId: result.public_id,
      },
    });
  } catch (error) {
    console.error("Error during image upload:", error);
    res.status(500).json({
      success: false,
      message: "Error uploading image",
      error: error.message,
    });
  }
};

// add new product

const addProduct = async (req, res) => {
  try {
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;




    const newCreatedProduct = Product.create({
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    });

    return res
      .status(201)
      .json({ success: true, Product: newCreatedProduct, message: "Product created" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Error while adding product" });
  }
};

// fetch all product

const fetchAllProducts = async (req, res) => {
  try {
    const ProductList = await Product.find({});

    res.status(200).json({
      success: true,
      products: ProductList,
      message: "All products fetched successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Error occured" });
  }
};

// edit product

const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;

    const findProduct = await Product.findById(id);
    if (!findProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    findProduct.title = title || findProduct.title;
    findProduct.description = description || findProduct.description;
    findProduct.category = category || findProduct.category;
    findProduct.brand = brand || findProduct.brand;
    findProduct.price = price === "" ? 0 : price || findProduct.price;
    findProduct.salePrice =
      salePrice === "" ? 0 : salePrice || findProduct.salePrice;
    findProduct.totalStock = totalStock || findProduct.totalStock;
    findProduct.image = image || findProduct.image;

    await findProduct.save();

    res
      .status(200)
      .json({
        success: true,
        product: findProduct,
        message: "Product updated successfully",
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Error occured" });
  }
};

// delete product

const deleteProduct = async (req, res) => {
  try {

    const { id } = req.params;
    const findProduct = await Product.findOneAndDelete({ _id: id })
    if (!findProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, message: "Product deleted successfully" });


  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Error occured" });
  }
};

module.exports = {
  handleImageUpload,
  addProduct,
  deleteProduct,
  fetchAllProducts,
  editProduct,
};
