import mongoose from "mongoose";
import config from '../../config/constants.config.js';

const URI = config.mongoUrl;

// Conexión a la DB utilizando mongoose:
// try {
//     await mongoose.connect(URI);
//     console.log('DB connected.');
// } catch (error) {
//     console.log(error);
// }

export default class MongoSingleton {
    static #instance;

    constructor() {
        connection = async () => { 
            await mongoose.connect(URI);
            console.log('DB connected.'); 
        }
    }

    static getInstance() {
        if(this.#instance) {
            console.log('La conexion ya existe');
            return this.#instance;
        }

        console.log('La conexión no existe, se crea una nueva');
        this.#instance = new MongoSingleton();
        return this.#instance;
    }
}