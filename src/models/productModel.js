import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
        minLength:0
    },
    isInStock:{
        type:Boolean,
        required:true
    }
},{timestamps:true});

const Product = mongoose.model("Product",productSchema);

export default Product;