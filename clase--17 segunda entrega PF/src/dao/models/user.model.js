import mongoose from 'mongoose';

// Creo la coleccion y le asigno el nombre usuarios:
const userCollection = 'usuarios';

// Este es el esquema que van a tener los registros:
// {
//     first_name: 'John',
//     last_name: 'Tignino',
//     email: 'jon@gmail.com'
// }

// Ahora creo el esquema:
const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        unique: true
    }
});

// Ahora exporto el modelo:
export const userModel = mongoose.model(userCollection, userSchema);