export default class ProductsRepository {
    constructor(dao) {
        this.dao = dao;
    }

    addProduct = async (product) => {
        const result = await this.dao.addProduct(product);
        return result;
    }

    getProducts = async (queryObject, limit, page, sortObject) => {
        const result = await this.dao.getProducts(queryObject, limit, page, sortObject);
        return result;
    }

    getProductById = async (id) => {
        const result = await this.dao.getProductById(id);
        return result;
    }
    
    getProductByCode = async (code) => {
        const result = await this.dao.getProductByCode(code);
        return result;
    }

    updateProduct = async (id, newData) => {
        const result = await this.dao.updateProduct(id, newData);
        return result;
    }

    deleteProduct = async (id) => {
        const result = await this.dao.deleteProduct(id);
        return result;
    }

}