const bcrypt = require("bcrypt");
const userModel = require("../Models/user");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const user = await userModel.findOne({ email });
    if (user) {
      return res.status(409).json({
        message: "User already exists, please login",
        success: false,
      });
    }

    // Create a new user
    const newUser = new userModel({ name, email, password });
    newUser.password = await bcrypt.hash(password, 10);
    await newUser.save();

    res.status(201).json({
      message: "Signup successful",
      success: true,
    });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user already exists
    const user = await userModel.findOne({ email });
    const errormessage = "Auth failed email or password is wrong";
    if (!user) {
      return res.status(403).json({
        message: errormessage,
        success: false,
      });
    }

    const ispasswordEqual = await bcrypt.compare(password, user.password);
    if (!ispasswordEqual) {
      return res.status(403).json({
        message: errormessage,
        success: false,
      });
    }

    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      message: "Login success",
      success: true,
      jwtToken,
      email,
      user: user.name,
    });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

module.exports = {
  signup,
  login,
};
