import UsersDao from "../dao/dbManagers/classes/users.dao.js";

export default class UsersRepository {
    constructor() {
        this.dao = new UsersDao();
    }

    getUserById = async (id) => {
        const result = await this.dao.getUserById(id);
        return result;
    }

    getUserByEmail = async (email) => {
        const result = await this.dao.getUserByEmail(email);
        return result;
    }
    
    getUsers = async () => {
        const result = await this.dao.getUsers();
        return result;
    }

    addUser = async (user) => {
        const result = await this.dao.addUser(user);
        return result;
    }

    updateUser = async (id, user) => {
        const result = await this.dao.updateUser(id, user);
        return result;
    }

}