import userModel from '../models/users.model.js';

export default class Users {
    constructor() {
        console.log('Working users with DB')
    }

    getUser = async (email) => {
        const user = await userModel.findOne({ email });
        return user;
    }

    getUserById = async (id) => {
        const user = await userModel.findById(id);
        return user;
    }

    addUser = async (user) => {
        const result = await userModel.create(user);
        return result;
    }

}