import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId: {type: String,required: true},// clerk userID
    receiverId: {type: String,required: true,},// Clerk userID
    content: {type: String,required: true,},
}, 
    {timestamps: true} // createdAT, updatedAt
);


export const Message = mongoose.model("Message", messageSchema);


//export default User;