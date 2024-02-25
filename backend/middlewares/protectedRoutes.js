import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectedRoutes = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized - No token found!" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res
        .cookie("token", "")
        .status(401)
        .json({ error: "Unauthorized - Invalid token!" });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({ error: "User not found!" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log("Error in 'protectedRoutes' controller: ", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
