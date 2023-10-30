import usersModel from '../models/users.model.js';

export default class UsersDao {

    getUserById = async (id) => {
        const user = await usersModel.findById(id).lean();
        return user;
    }

    getUserByEmail = async (email) => {
        const user = await usersModel.findOne({ email }).lean();
        return user;
    }

    getUsers = async () => {
        const users = await usersModel.find().lean();
        return users;
    }

    saveUser = async (user) => {
        const result = await usersModel.create(user);
        return result;
    }

    updateUser = async (id, data) => {
        const result = await usersModel.findOneAndUpdate({ _id: id }, data, { new: true });
        return result;
    }
}