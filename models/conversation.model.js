import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
	{
		user_1:{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User"
        },
        user_2: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
        },
		messages: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Message",
				default: [],
			},
		],
        active: {
            type: Boolean,
            default: true
        }
	},
	{ timestamps: true }
);

const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;
