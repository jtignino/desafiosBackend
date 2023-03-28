class ProductManager {
    constructor() {
        this.products = [];
    }

    addProduct = (title, description, price, thumbnail, code, stock) => {
        const product = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };

        if (!(title && description && price && thumbnail && code && stock)) {        
            console.log('No puede haber campos vacíos.')
            return
        }

        this.products.length === 0 ? product.id = 1 : product.id = this.products[this.products.length - 1].id + 1
        this.products.find((product) => product.code === code) ? console.log(`El producto que intenta agregar con el código "${code}" ya existe.`) : this.products.push(product);
    }
    
    getProducts = () => {
        return this.products;
    }

    getProductById = (id) => {
        const productoById = this.products.find((product) => product.id === id) 
        productoById ? console.log(productoById) : console.log("No se encontró el producto.")
    }
    
};

const manejadorProductos = new ProductManager();
console.log(manejadorProductos.getProducts());
// manejadorProductos.addProduct('producto prueba', 'Este es un producto prueba', 200, 'sin imagen', 'abc123', 25);
// console.log(manejadorProductos.getProducts());
// manejadorProductos.addProduct('producto prueba', 'Este es un producto prueba', 200, 'sin imagen', 'abc123', 25);
// manejadorProductos.addProduct('2- producto prueba', '2- Este es un producto prueba', 200, 'sin imagen', 'abc1231', 25);
// manejadorProductos.addProduct('3- producto prueba', '3- Este es un producto prueba', 200, 'sin imagen', 'abc12312', 25);
// manejadorProductos.getProductById(1)
// manejadorProductos.addProduct("");
// console.log(manejadorProductos.getProducts());

