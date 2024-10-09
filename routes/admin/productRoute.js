const express = require('express');

const { handleImageUpload, addProduct, fetchAllProducts, deleteProduct, editProduct } = require('../../controllers/admin/productController')

const { upload } = require('../../helpers/cloudinary')

const router = express.Router();

router.post('/upload-image', upload.single('my_file'), handleImageUpload)
router.post('/create-product', addProduct);
router.put('/edit-product/:id', editProduct);
router.delete('/delete-product/:id', deleteProduct);
router.get('/get', fetchAllProducts);


module.exports = router;