import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

const collection = 'products'

const ProductsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        index: true
    },
    description: {
        type: String,
        required: true,
        index: true
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock:{
        type: Number,
        required: true
    },
    owner: {
        type: String,
        default: 'admin'
    }
})

ProductsSchema.plugin(mongoosePaginate)
export const productsModel = mongoose.model(collection, ProductsSchema)