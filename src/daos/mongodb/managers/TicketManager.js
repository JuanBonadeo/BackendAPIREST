import mongoose from 'mongoose'
import { ticketModel } from '../models/tickets.model.js'
import config from '../../../config/config.js'
import { v4 as uuidV4 } from 'uuid'

export default class TicketManager {
  connection = mongoose.connect(config.mongoUrl)

  // crea un ticket nuevo
  createTicket = async (user, total, productsInStock) => {
    try {
      const ticket = {
        purchase_datetime: new Date().toString(),
        amount: total,
        purchaser: user,
        code: uuidV4(),
        products: productsInStock
      }
      const result = await ticketModel.create(ticket)
      return result
    } catch (e) {
      console.log(e)
      return e
    }
  }

  // trae todos los tickets de un email.
  printTicketByUser = async (user) => {
    try {
      const ticket = await ticketModel.find({ purchaser: user }).lean()
      return ticket
    } catch (e) {
      console.log(e)
      return e
    }
  }
}
