import userModel from './models/users.model.js';

export default class Users {
    constructor() {
        console.log('Working users with DB')
    }

    getUserById = async (id) => {
        const user = await userModel.findById(id).lean();
        return user;
    }

    getByEmail = async (email) => {
        const user = await userModel.findOne({ email }).lean();
        return user;
    }

    addUser = async (user) => {
        const result = await userModel.create(user);
        return result;
    }

}