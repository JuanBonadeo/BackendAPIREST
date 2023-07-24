import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

const collection = 'products'

const ProductsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    code: {
        type: Number,
        required: true,
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
})

ProductsSchema.plugin(mongoosePaginate)
export const productsModel = mongoose.model(collection, ProductsSchema)