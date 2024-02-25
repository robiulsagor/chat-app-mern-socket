import Conversation from "../models/coversation.model.js";

export const sendMessage = async (req, res) => {
  try {
    // const
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const { senderId } = req.user._id;

    let conversations = await Conversation.find({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversations) {
      conversations = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }
  } catch (error) {
    console.log("Error in 'sendMessage' controller: ", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
