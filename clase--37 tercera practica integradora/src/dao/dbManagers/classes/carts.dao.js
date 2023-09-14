import cartModel from '../models/cart.model.js'

export default class CartsDao {
    
    getCarts = async () => {
        const carts = await cartModel.find().lean();
        return carts;
    }

    createCart = async (cart) => {
        const result = await cartModel.create(cart);
        return result;
    }

    getCartById = async (cid) => {
        const cart = await cartModel.findOne({ _id: cid }).lean();
        return cart;
    }

    addToCart = async (cid, pid, qty) => {
        const result = await cartModel.findOneAndUpdate(
            { _id: cid },
            { $push: { 'products': { product: pid, quantity: qty } } },
            { new: true }
        );
        return result;
    }

    updateProductInCart = async (cid, pid, qty) => {
        const result = await cartModel.findOneAndUpdate(
            { _id: cid, "products.product": pid },
            { $set: { "products.$.quantity": qty } },
            { new: true }
        );
        return result;
    }

    deleteProduct = async (cid, pid) => {
        const result = await cartModel.findOneAndUpdate(
            { _id: cid },
            { $pull: { products: { product: pid } } }
        );
        return result;
    }

    emptyCart = async (cid) => {
        const result = await cartModel.findOneAndUpdate(
            { _id: cid },
            { products: [] }
        );
        return result;
    }
}