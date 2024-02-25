import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { generateToken } from "../utils/generateToken.js";

const signup = async (req, res) => {
  try {
    const { fullname, username, password, confirmPassword, gender } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Password's don't match" });
    }

    const userFound = await User.findOne({ username });

    if (userFound) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    const avatar =
      gender == "male"
        ? `https://avatar.iran.liara.run/public/boy?username=${username}`
        : `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
      fullname,
      username,
      password: hashedPass,
      gender,
      profilePic: avatar,
    });

    if (newUser) {
      await newUser.save();
      generateToken(newUser._id, res);

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullname,
        username: newUser.username,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const signin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Please type correct credentials." });
    }

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ error: "User not found." });
    }

    const matchedPass = await bcrypt.compare(password, user.password);

    if (!matchedPass) {
      return res.status(400).json({ error: "Pass not matched." });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const signout = (req, res) => {
  try {
    res.cookie("token", "").json({ message: "Logged out successfully!" });
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { signup, signin, signout };
