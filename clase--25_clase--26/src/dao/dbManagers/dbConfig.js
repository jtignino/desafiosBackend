import mongoose from "mongoose";
import config from '../../config/constants.config.js';

const URI = config.mongoUrl;

// Conexión a la DB utilizando mongoose:
try {
    await mongoose.connect(URI);
    console.log('DB connected.');
} catch (error) {
    console.log(error);
}