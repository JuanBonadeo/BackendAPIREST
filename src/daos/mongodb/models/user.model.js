import mongoose from 'mongoose'

const collection = 'users'

const schema = new mongoose.Schema({
    first_name:String,
    last_name:String,
    email:String,
    age: Number,
    password: String,
    cart: String,
    role:{ type: String,  default: 'user'},
})


export const userModel =mongoose.model(collection, schema)
