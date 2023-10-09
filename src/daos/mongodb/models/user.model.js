import mongoose from 'mongoose'

const collection = 'users'

const schema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: { type: String, unique: true},
  age: Number,
  password: String,
  cart: String,
  role: { type: String, default: 'user' },
  last_connection: String,
  documents:{
    type: [
    {
      name: String,
      reference: String,
    }
  ]
  } 
  
})

export const userModel = mongoose.model(collection, schema)
