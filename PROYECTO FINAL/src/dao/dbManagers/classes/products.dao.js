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
        const product = await productModel.findOne({ _id: id }).lean();
        return product;
    }

    getProductByCode = async (code) => {
        const product = await productModel.findOne({ code: code }).lean();
        return product;
    }

    updateProduct = async (id, newData) => {
        const result = await productModel.findOneAndUpdate({ _id: id }, newData, { new: true });
        return result;
    }

    deleteProduct = async (id) => {
        const result = await productModel.findOneAndDelete({ _id: id });
        return result;
    }
}