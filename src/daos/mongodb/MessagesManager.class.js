import mongoose from "mongoose";
import { messagesModel } from "./models/messages.model.js";

export default class ManagerCarts {
    connection=mongoose.connect("mongodb+srv://juancruzbonadeo04:Juan2004@cluster0.enwrd7s.mongodb.net/?retryWrites=true&w=majority");
    getMessages = async () => {
    const result=await messagesModel.find();
    return result;
    };

    create = async (user,message) => {
    const result= await messagesModel.create({ user: user, message: message});
    return result;
    };
    getMessageById = async (id) => {
    const result=await messagesModel.findOne({
        _id: id
    });
    return result;
    };
}



