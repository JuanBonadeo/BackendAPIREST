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
        const result = await userModel.updateOne({ _id: id }, {$set: {lastConnection: Date.now()} });
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
        try{
        let user= await userModel.findOne({_id: id});
  
        let identification, adress,accountStatus;
        if(!user.documents) return false;        
        for(let i=0; i<user.documents.length;i++){
            identification=user.documents.find(doc=>doc.name=='identification' && doc.reference!="");
            adress=user.documents.find(doc=>doc.name=='adress' && doc.reference!="");
            accountStatus=user.documents.find(doc=>doc.name=='accountStatus' && doc.reference!="");   
        }
 
        return identification && adress && accountStatus? true: false; 
        }catch(e){ 
            return e; 
        }
    }

}
