const Address = require("../../models/AddressModel")

const addAddress = async (req, res) => {
  try {
    const { userId, address, city, pincode, phone, notes } = req.body;

    if (!userId || !address || !city || !pincode || !phone || !notes) {
      return res.status(400).json({
        success: false,
        message: "fill all the fields",
      })
    }

    const newlyCreatedAddress = new Address({
      userId, address, city, pincode, phone, notes
    })

    await newlyCreatedAddress.save();

    return res.status(201).json({
      success: true,
      data: newlyCreatedAddress
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
}


const fetchAllAddress = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Error",
      })
    }

    const addressList = await Address.find({ userId });
    return res.status(200).json({
      success: true,
      data: addressList
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
}


const editAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    const formData = req.body;
      
    const address = await Address.findOneAndUpdate({
      _id: addressId,
      userId: userId
    }, formData, { new: true });

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address Not Found!!"
      })
    }

    return res.status(201).json({
      success: true,
      data: address
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
}


const deleteAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    console.log("userId: ", userId)
    console.log("addressId: ", addressId)


    const address = await Address.findOneAndDelete({ _id: addressId, userId });
    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address Not Found!!"
      })
    }

    return res.status(200).json({
      success: true,
      message: "Address Deleted Successfully!!"
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
}

module.exports = { addAddress, editAddress, fetchAllAddress, deleteAddress };