// import mongoose from "mongoose";
// import config from '../../config/constants.config.js';

// const MONGO_URL = config.mongoUrl;


// export default class MongoSingleton {
//     static #instance;

//     constructor() {
//         mongoose.connect(MONGO_URL);
//         console.log('*** DB connected. ***'); 
//     }

//     static getInstance() {
//         if(this.#instance) {
//             console.log('La conexion ya existe');
//             return this.#instance;
//         }

//         console.log('* La conexión no existe, se crea una nueva.');
//         this.#instance = new MongoSingleton();
//         return this.#instance;
//     }
// }
