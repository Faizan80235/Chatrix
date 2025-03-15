const Message = require('../Models/Message');

// Create Message
const createMessage = async (req, res) => {
const { sender_id, receiver_id, message } = req.body;
    try {
        const msg = await Message.create({ sender_id, receiver_id, message });
        res.status(201).json({ message: 'Message sent', data: msg });
    } catch (error) {
        res.status(500).json({ message: 'Failed to send message', error: error.message });
    }
};

// Get Messages between two users
  const getMessages = async (req, res) => {
     const { sender_id, receiver_id } = req.params;
     try {
         const messages = await Message.find({
             $or: [
                 { sender_id, receiver_id },
                 { sender_id: receiver_id, receiver_id: sender_id }
             ]
         }).sort({ createdAt: 1 }); // Sort by time ascending
         res.status(200).json({ message: 'Messages fetched', data: messages });
     } catch (error) {
         res.status(500).json({ message: 'Failed to fetch messages', error: error.message });
     }
}

module.exports={createMessage,getMessages};