import mongoUserDao from './dbManagers/classes/users.dao.js'
import mongoCartDao from './dbManagers/classes/carts.dao.js'
import mongoProductDao from './dbManagers/classes/products.dao.js'
//Import del dao de manejo de datos con archivos

const MongoUserDao = new mongoUserDao();
const MongoCartDao = new mongoCartDao();
const MongoProductDao = new mongoProductDao();
//Crear las instancia de manejo de datos con archivos

//export const TOYSDAO = config.persistence === 'MEMORY' ? MemoryToyDao : MongoToyDao;
export const USERSDAO = MongoUserDao;
export const CARTSDAO = MongoCartDao;
export const PRODUCTSDAO = MongoProductDao;
