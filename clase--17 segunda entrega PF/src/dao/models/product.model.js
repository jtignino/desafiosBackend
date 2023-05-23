import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

// Creo la coleccion y le asigno el nombre products:
const productCollection = 'products';

// Ahora creo el esquema:
const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    status: { 
        type: Boolean,
        default: true
    }
});

productSchema.plugin(mongoosePaginate);

// Ahora exporto el modelo:
const productModel = mongoose.model(productCollection, productSchema);

export default productModel;