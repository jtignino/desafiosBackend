import ProductManager from "./managers/productManager.js";

const manager = new ProductManager('./files/Productos.json');

const env = async () => {
    let productos = await manager.getProducts();
    console.log(productos);
    // console.log('-------------------------------');

    const product = {
        title: 'Update prueba',
    };

    // await manager.updateProduct(3, product);
    // await manager.deleteProduct(1);

}

env()