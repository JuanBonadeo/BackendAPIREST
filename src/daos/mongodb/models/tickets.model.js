import mongoose from 'mongoose'

const collection = 'tickets'

const schema = new mongoose.Schema({
  code: String,
  purchase_datatime: String,
  amount: Number,
  purchaser: String,
  products: Object
})

export const ticketModel = mongoose.model(collection, schema)
