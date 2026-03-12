import express from "express";
import User from "../models/user.js";
import mongoose from "mongoose";

const router = express.Router();


router.get("/login", async (req, res) => {
  const { email, password } = req.query;

  try {
    const user = await User.findOne({ email, password }); 
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).send("Failed to fetch user");
  }
});


router.post("/", async (req, res) => {
  try {
    const user = req.body;

    if (!user.name || !user.email || !user.password) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide all fields" });
    }

    const newUser = new User(user);

    try {
      await newUser.save();
      res
        .status(201)
        .json({ success: true, message: "User registered successfully" });
    } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).send("Failed to register user", error);
    }
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).send("Failed to register user", error);
  }
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body; 

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid User ID" });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id, 
      { $set: { name, email, password } }, 
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, data: updatedUser });
  } catch (error) {
    console.error(`Error updating User: ${error.message}`);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, message: "User Id is required" });
  }

  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.error(`Error in deleting User: ${error.message}`);
    return res
      .status(500)
      .json({ success: false, message: "Error in deleting User" });
  }
});
export default router;