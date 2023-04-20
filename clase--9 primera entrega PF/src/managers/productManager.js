import fs from 'fs';

export default class ProductManager {
    constructor(path) {
        // this.products = [];
        this.path = path;
    }

    getProducts = async () => {
        try {
            if (fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, 'utf-8');
                const products = JSON.parse(data);
                return products;
            } else return [];
        } catch (error) {
            console.log(error);
        }
    }

    addProduct = async (product) => {
        try {
            const products = await this.getProducts();

            if (!(product.title && product.description && product.price && product.thumbnail && product.code && product.stock)) {
                console.log('No puede haber campos vacíos.')
                return
            }
            
            products.length === 0 ? product.id = 1 : product.id = products[products.length - 1].id + 1
            products.find((el) => el.code === product.code) 
                ? console.log(`El producto que intenta agregar con el código "${product.code}" ya existe.`) 
                : products.push(product);
            
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));

            return product;
            
        } catch (error) {
            console.log(error);
        }
    }

    getProductById = async (id) => {
        try {
            const products = await this.getProducts();
            const productById = products.find((product) => product.id === id)
            return productById ? productById : console.log("No se encontró el producto.")
        } catch (error) {
            console.log(error);            
        }
    }

    updateProduct = async (id, obj) => {
        try {
            let products = await this.getProducts();
            const productIndex = products.findIndex(product => product.id === id)
            if (productIndex !== -1) {
                products[productIndex] = {...products[productIndex], ...obj}
                await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
                console.log(await this.getProducts());
            } else {
                console.log('No se encontró el producto que desea actualizar.')
            }
        } catch (error) {
            console.log(error);
        } 
    }

    deleteProduct = async (id) => {
        try {
            let products = await this.getProducts();
            const productIndex = products.findIndex(product => product.id === id)
            if (productIndex !== -1) {
                products.splice(productIndex, 1);
                await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
                console.log(await this.getProducts());
            } else {
                console.log('No se encontró el producto que desea eliminar.')
            }
        } catch (error) {
            console.log(error);
        }
    }
};