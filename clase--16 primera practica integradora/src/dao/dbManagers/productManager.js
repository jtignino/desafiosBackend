import { productModel } from '../models/product.model.js';

export default class Products {
    constructor() {
        console.log('Working products with DB')
    }

    getProducts = async () => {
        const products = await productModel.find().lean();
        return products;
    }

    addProduct = async (product) => {
        const result = await productModel.create(product);
        return result;
    }

    getProductById = async (id) => {
        const product = await productModel.find({ _id: id }).lean();
        return product;
    }

    updateProduct = async (id, newData) => {
        const result = await productModel.updateOne({ _id: id }, newData);
        return result;
    }

    deleteProduct = async (id) => {    
        const result = await productModel.deleteOne({ _id: id });
        return result;
    }
}