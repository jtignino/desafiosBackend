import fs from 'fs';
import { cartModel } from '../models/cart.model';

export default class CartManager {
    constructor(path) {
        this.path = path;
    }

    getCarts = async () => {
        try {
            if (fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, 'utf-8');
                const carts = JSON.parse(data);
                return carts;
            } else return [];
        } catch (error) {
            console.log(error);
        }
    }

    addCart = async (cart) => {
        try {
            const carts = await this.getCarts();

            carts.length === 0 ? cart.id = 1 : cart.id = carts[carts.length - 1].id + 1
            carts.push(cart);
            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'));

            return cart;

        } catch (error) {
            console.log(error);
        }
    }

    getCartById = async (cid) => {
        try {
            const carts = await this.getCarts();
            const cartById = carts.find((cart) => cart.id === cid)
            return cartById ? cartById : console.log("No se encontró el carrito.")
        } catch (error) {
            console.log(error);
        }
    }

    updateCart = async (cid, pid) => {
        try {
            let carts = await this.getCarts();
            const cartIndex = carts.findIndex(cart => cart.id === cid)
            const productIndex = carts[cartIndex].products.findIndex(el => el.product === pid);

            if (productIndex !== -1) {
                carts[cartIndex].products[productIndex] = 
                { 
                    ...carts[cartIndex].products[productIndex], 
                    quantity: (carts[cartIndex].products[productIndex].quantity + 1)
                }
            } else {
                carts[cartIndex].products.push({ product: pid, quantity: 1 })
            }
            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'));
            return carts[cartIndex];
        } catch (error) {
            console.log(error);
        }

        const result = await cartModel.updateOne();
        return result;
    }

};