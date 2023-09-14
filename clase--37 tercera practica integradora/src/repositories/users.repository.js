export default class UsersRepository {
    constructor(dao) {
        this.dao = dao;
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

    saveUser = async (user) => {
        const result = await this.dao.saveUser(user);
        return result;
    }

    updateUser = async (id, user) => {
        const result = await this.dao.updateUser(id, user);
        return result;
    }

}