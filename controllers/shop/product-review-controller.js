const Order = require('../../models/OrderModel')
const Product = require('../../models/ProductModel')
const ProductReview = require('../../models/ReviewModel')


const addProductReview = async (req, res) => {
  try {
    const { productId, userId, userName, reviewMessage, reviewValue } = req.body;
    const order = await Order.findOne({
      userId,
      "cartItems.productId": productId,
      orderStatus: "confirmed"
    })

    if (!order) {
      return res.status(403).json({
        success: false,
        message: "You need to purchase product"
      })
    }

    const checkExistinReview = await ProductReview.findOne({
      productId, userId
    })

    if (checkExistinReview) {
      return res.status(400).json({
        success: false,
        message: "You already reviewed this product"
      })
    }


    const newReview = new ProductReview({
      productId, userId, userName, reviewMessage, reviewValue
    })

    await newReview.save();

    const reviews = await ProductReview.find({ productId });
    const totalReviewLength = reviews.length();
    const avgReview = reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) / totalReviewLength;

    await Product.findbyIdUpdate(productId, { avgReview });

    res.status(200).json({
      success: true,
      data: newReview,
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
}
const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params
    const reviews = await ProductReview.find({ productId });
    res.status(200).json({
      success: true,
      data: reviews,
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
}


module.exports = { addProductReview, getProductReviews };