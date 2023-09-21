export default class CartsRepository {
    constructor(dao) {
        this.dao = dao;
    }

    getCarts = async () => {
        const result = await this.dao.getCarts();
        return result;
    }

    createCart = async (cart) => {
        const result = await this.dao.createCart(cart);
        return result;
    }

    getCartById = async (cid) => {
        const result = await this.dao.getCartById(cid);
        return result;
    }
    
    addToCart = async (cid, pid, qty) => {
        const result = await this.dao.addToCart(cid, pid, qty);
        return result;
    }

    updateProductInCart = async (cid, pid, qty) => {
        const result = await this.dao.updateProductInCart(cid, pid, qty);
        return result;
    }

    deleteProduct = async (cid, pid) => {
        const result = await this.dao.deleteProduct(cid, pid);
        return result;
    }
    
    emptyCart = async (cid) => {
        const result = await this.dao.emptyCart(cid);
        return result;
    }
}
