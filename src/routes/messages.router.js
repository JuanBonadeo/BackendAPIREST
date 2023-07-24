import { Router } from "express";
import ManagerMessages from "../daos/mongodb/MessagesManager.class.js";
import __dirname from "../utils.js";

const router= Router();

const managerMessages = new ManagerMessages();


router.get('/', async (req,res)=>{     
    const messages = await managerMessages.getMessages();
    res.send(messages);
})



export default router;