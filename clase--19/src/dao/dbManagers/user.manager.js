import userModel from '../models/users.model.js';

export default class Users {
    constructor() {
        console.log('Working users with DB')
    }

    getUser = async (email, password) => {
        const user = await userModel.findOne({ email, password});
        return user;
    }

    addUser = async (user) => {
        const result = await userModel.create(user);
        return result;
    }

}