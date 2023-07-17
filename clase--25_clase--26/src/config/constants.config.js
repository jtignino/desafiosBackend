// const PRIVATE_KEY = 'coder39760'

// export { PRIVATE_KEY }

import dotenv from 'dotenv';

dotenv.config();

export default {
    port: process.env.PORT,
    mongoUrl: process.env.MONGO_URL,
    privateKey: process.env.PRIVATE_KEY
}