

const createOrder = async (req, res) => {
  try {
    const { userId, cartItems, addressInfo, orderStatus, paymentMethod, paymentStatus, totalAmount, orderDate, orderUpdateDate,
      paymentId,
      payerId } = req.body;

  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
}


const capturePayment = async (req, res) => {
  try {

  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
}


module.exports = { createOrder, capturePayment };


