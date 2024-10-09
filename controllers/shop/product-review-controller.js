


const addProductReview = async (req, res) => {
  try {
    const {productId,use} = req.body;
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

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
}


module.exports = { addProductReview, getProductReviews };