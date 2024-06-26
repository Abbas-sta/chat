import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
	try {
		const { message } = req.body;
		const { id: receiverId } = req.params;
		const senderId = req.user._id;
		

		let conversation_1 = await Conversation.findOne({ user_1: senderId, user_2: receiverId});
		let conversation_2 = await Conversation.findOne({ user_1: receiverId, user_2: senderId});
		let conversation;
		if (!conversation_1 && !conversation_2) {
			conversation = await Conversation.create({user_1: to_user, user_2:from_user})
		}

		const newMessage = new Message({
			senderId,
			receiverId,
			message,
		});

		if (newMessage) {
			if(conversation_1){
				conversation_1.messages.push(newMessage._id);
				await Promise.all([conversation_1.save(), newMessage.save()]);
			}
			else if(conversation_2){			
				conversation_2.messages.push(newMessage._id);
				await Promise.all([conversation_2.save(), newMessage.save()]);
			}
			else{
				conversation.messages.push(newMessage._id);		
				await Promise.all([conversation.save(), newMessage.save()]);		
			}
		}

		// await conversation.save();
		// await newMessage.save();

		// this will run in parallel

		// SOCKET IO FUNCTIONALITY WILL GO HERE
		const receiverSocketId = getReceiverSocketId(receiverId);
		if (receiverSocketId) {
			console.log("rec: ", receiverSocketId)
			// io.to(<socket_id>).emit() used to send events to specific client
			io.to(receiverSocketId).emit("newMessage", newMessage);
			console.log("yes the message is being emmitted: ", newMessage)
		}
		console.log(">>>>>>> ", newMessage)
		res.status(201).json(newMessage);
	} catch (error) {
		console.log("Error in sendMessage controller: ", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const getMessages = async (req, res) => {
	try {
		const id = req.params.id;

		const conversation = await Conversation.findOne({_id: id}).populate("messages"); // NOT REFERENCE BUT ACTUAL MESSAGES

		if (!conversation) return res.status(200).json([]);

		const messages = conversation.messages;

		res.status(200).json(messages);
	} catch (error) {
		console.log("Error in getMessages controller: ", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

