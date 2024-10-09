const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/UserModel");

// Register
const register = async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    if (!userName || !email || !password) {
      return res
        .status(401)
        .json({ success: false, message: "all files are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, message: "Email already exists" });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    const user = await User.create({
      userName,
      email,
      password: hashedPassword,
    });


    return res
      .status(200)
      .json({ success: true, user, message: "User created successfully" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ success: false, message: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(401)
        .json({ success: false, message: "all files are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(409).json({
        success: false,
        message: "user is not exists, Please signUp first!",
      });
    }
    const checkPassword = await bcryptjs.compare(password, user.password);
    if (!checkPassword) {
      return res.status(409).json({
        success: false,
        message: "Password is incorrect",
      });
    }
    const payLoad = { id: user._id, userName: user.userName, email: user.email, role: user.role };
    const token = jwt.sign(payLoad, "KRISH", { expiresIn: "1h" });

    res.cookie("token", token, { httpOnly: true, secure: false }).json({
      success: true,
      user,
      message: "User logged in successfully",
      token,
      userName: user.userName
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ success: false, message: err.message });
  }
};

const logout = async (req, res) => {
  res
    .clearCookie("token")
    .json({ success: true, message: "User logged out successfully" });
};


const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ success: false, message: "unauthorized user" });
  }

  try {
    const decoded = jwt.verify(token, "KRISH");
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "invalid token" });
  }
}

module.exports = { register, login, logout, authMiddleware };
