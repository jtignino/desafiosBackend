import productModel from '../models/product.model.js';

export default class ProductsDao {
    
    addProduct = async (product) => {
        const result = await productModel.create(product);
        return result;
    }
    
    getProducts = async (queryObject, limit, page, sortObject) => {
        const products = await productModel.paginate(queryObject, { limit, page, lean: true, sort: sortObject });
        return products;
    }

    getProductById = async (id) => {
        const product = await productModel.find({ _id: id }).lean();
        return product;
    }

    getProductByCode = async (newCode) => {
        const product = await productModel.find({ code: newCode }).lean();
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