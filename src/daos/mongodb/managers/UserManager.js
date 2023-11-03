import mongoose from "mongoose";
import { userModel } from "../models/user.model.js";
import config from "../../../config/config.js";

export default class UserDAO {
    connection = mongoose.connect(config.mongoUrl);
    addUser = async (user) => {
        const result = await userModel.create(user);
        return result;
    }
    getUserById = async (id) => {
        const result = await userModel.findOne({ email: email });
        return result;
    }
    getUser = async (id) => {
        const result = await userModel.findOne({ _id: id });
        return result;
    }
    getUsers = async () => {
        const result = await userModel.find();
        return result;
    }
    getUserbyEmailPassword = async (email, password) => {     
        const result = await userModel.findOne({ email: email, password: password });
        return result;
    }
    updatePassword = async (id, password) => {
        const result = await userModel.updateOne({ _id: id }, {$set: {password: password} });
        return result;
    }

    updateRole = async (id, role) => {
        const result = await userModel.updateOne({ _id: id }, {$set: {role: role} });
        return result;
    }
    updatelastConnection = async (id) => {
        const result = await userModel.updateOne({ _id: id }, {$set: {last_connection: Date.now()} });
        return result;
    }
    updatePathDocuments = async (id,documentsNames,documentsPaths) => {
        let user = await this.getUser(id);
        for(let i=0; i<documentsNames.length; i++){ 
            const path= documentsPaths[i];
            const name= documentsNames[i];
            
            if(path!=undefined){
                const existeDocumento=user.documents.find(doc=>doc.name==name);
                if(existeDocumento){
                    existeDocumento.reference=path;
                }else{
                    user.documents.push({
                        name:name,
                        reference: path
                    });
                }
            }
        
        }
        const result= await user.save();
        return result; 
    }
    getPremiumRequiredDoc = async (id) => {
        try {
            const user = await userModel.findOne({ _id: id });

            let identification = false;
            let address = false;
            let accountStatus = false;
            let verified = false;
            if (user.documents) {
                for (let i = 0; i < user.documents.length; i++) {
                    const doc = user.documents[i];
                    if (doc.name === 'identification' && doc.reference !== '') {
                        identification = true;
                    } else if (doc.name === 'address' && doc.reference !== '') {
                        address = true;
                    } else if (doc.name === 'accountStatus' && doc.reference !== '') {
                        accountStatus = true;
                    }
                }
            }

            return identification && address && accountStatus;
        } catch (e) {
            return e;
        }
    }
    deleteInactiveUsers = async () => {
        try{
            const result = await userModel.deleteMany({last_connection: { $lt: new Date(Date.now() - 1000 * 60 * 30) } })// delete users who haven't connected in the last 30 minutes
            //const result = await userModel.deleteMany({last_connection: {$lt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2)}}); este elimina dps de 2 dias
            return result;  
        }catch(e){
            return e;
        }}
}



