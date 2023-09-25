import mongoose from 'mongoose'
import { messagesModel } from '../models/messages.model.js'
import config from '../../../config/config.js'

export default class ManagerCarts {
  connection = mongoose.connect(config.mongoUrl)
  getMessages = async () => {
    const result = await messagesModel.find()
    return result
  }

  create = async (user, message) => {
    const result = await messagesModel.create({ user, message })
    return result
  }

  getMessageById = async (id) => {
    const result = await messagesModel.findOne({
      _id: id
    })
    return result
  }
}
