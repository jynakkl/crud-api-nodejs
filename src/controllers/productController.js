import expressAsyncHandler from "express-async-handler";

import Product from "../models/productModel.js";

export const getAllProducts = expressAsyncHandler(async(req,res) => {
    const products = await Product.find();

    return res.status(200).json({data:products});
});

export const getProductById = expressAsyncHandler(async(req,res) => {
    const {id} = req.params;

    const product = await Product.findById(id);

    if(!product) {
        res.status(404);
        throw new Error("Product not found");
    }

    return res.status(200).json({data:product});
});

export const createProduct = expressAsyncHandler(async(req,res) => {
    const {name,description,price,isInStock} = req.body;

    if(!name || !description || price === undefined || isInStock === undefined) {
        res.status(400);
        throw new Error("All fields are required");
    }

    if(price < 0) {
        res.status(400);
        throw new Error("Price must be at least 0");
    }

    const isProductAlreadyExists = await Product.findOne({name});

    if(isProductAlreadyExists) {
        res.status(409);
        throw new Error("Product already exists");
    }

    const createdProduct = await Product.create({name,description,price,isInStock});

    return res.status(201).json({message:"Product created",data:createdProduct});
});

export const updateProduct = expressAsyncHandler(async(req,res) => {
    const {id} = req.params;
    const {name,description,price,isInStock} = req.body;

    if(!name || !description || price === undefined || isInStock === undefined) {
        res.status(400);
        throw new Error("All fields are required");
    }

    if(price < 0) {
        res.status(400);
        throw new Error("Price must be at least 0");
    }

    const isProductAlreadyExists = await Product.findOne({name,_id:{$ne:id}});

    if(isProductAlreadyExists) {
        res.status(409);
        throw new Error("Product already exists");
    }

    const updatedProduct = await Product.findByIdAndUpdate(id,{name,description,price,isInStock},{new:true});

    return res.status(200).json({message:"Product updated",data:updatedProduct});
});

export const deleteProduct = expressAsyncHandler(async(req,res) => {
    const {id} = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if(!deletedProduct) {
        res.status(404);
        throw new Error("Product not found");
    }

    return res.status(200).json({message:"Product deleted",data:deletedProduct});
});