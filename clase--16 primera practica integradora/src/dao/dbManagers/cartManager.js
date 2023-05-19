import { cartModel } from '../models/cart.model.js';

export default class Carts {
    constructor() {
        console.log('Working carts with DB')
    }

    getCarts = async () => {
        const carts = await cartModel.find().lean();
        return carts;
    }

    addCart = async (cart) => {
        const result = await cartModel.create(cart);
        return result;
    }

    getCartById = async (cid) => {
        const cart = await cartModel.find({ _id: cid }).lean();
        return cart;
    }

    updateCart = async (cid, pid) => {
        // try {
        //     let carts = await this.getCarts();
        //     const cartIndex = carts.findIndex(cart => cart.id === cid)
        //     const productIndex = carts[cartIndex].products.findIndex(el => el.product === pid);

        //     if (productIndex !== -1) {
        //         carts[cartIndex].products[productIndex] = 
        //         { 
        //             ...carts[cartIndex].products[productIndex], 
        //             quantity: (carts[cartIndex].products[productIndex].quantity + 1)
        //         }
        //     } else {
        //         carts[cartIndex].products.push({ product: pid, quantity: 1 })
        //     }
        //     await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'));
        //     return carts[cartIndex];
        // } catch (error) {
        //     console.log(error);
        // }


    }

    
}