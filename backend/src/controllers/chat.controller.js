import User from "../models/user.model.js";
import Message from "../models/message.model.js";

import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    // fetch users (exclude password)
    const users = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

    // Compute online status: user is online if lastSeen is within last 2 minutes
    const TWO_MINUTES = 2 * 60 * 1000;
    const now = Date.now();

    const usersWithStatus = users.map((u) => {
      const lastSeen = u.lastSeen ? new Date(u.lastSeen) : null;
      const online = lastSeen ? now - lastSeen.getTime() < TWO_MINUTES : false;

      return {
        _id: u._id,
        fullName: u.fullName,
        email: u.email,
        profilePic: u.profilePic,
        lastSeen,
        online,
      };
    });

    res.status(200).json(usersWithStatus);
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getChatMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getChatMessages controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrl;
    if (image) {
      // Upload base64 image to cloudinary
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();

    // Update sender lastSeen as they just sent a message
    await User.findByIdAndUpdate(senderId, { lastSeen: Date.now() });

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      // emit new chat message to the receiver
      io.to(receiverSocketId).emit("newChat", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in createMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
