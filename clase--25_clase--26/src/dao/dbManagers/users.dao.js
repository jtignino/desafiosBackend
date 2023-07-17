import usersModel from './models/users.model.js';

export default class UsersDao {
    constructor() {}

    getUserById = async (id) => {
        const user = await usersModel.findById(id).lean();
        return user;
    }

    getUserByEmail = async (email) => {
        const user = await usersModel.findOne({ email }).lean();
        return user;
    }

    addUser = async (user) => {
        const result = await usersModel.create(user);
        return result;
    }
}