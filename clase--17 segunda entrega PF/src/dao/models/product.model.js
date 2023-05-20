import mongoose from 'mongoose';

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

// Ahora exporto el modelo:
export const productModel = mongoose.model(productCollection, productSchema);