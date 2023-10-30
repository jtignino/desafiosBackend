import UserDto from "../dao/DTOs/user.dto.js";

export default class UsersRepository {
    constructor(dao) {
        this.dao = dao;
    }

    getUserById = async (id) => {
        const result = await this.dao.getUserById(id);
        // const user = new UserDto(result);
        return result;
    }

    getUserByEmail = async (email) => {
        const result = await this.dao.getUserByEmail(email);
        return result;
    }
    
    getUsers = async () => {
        const result = await this.dao.getUsers();
        const users = new UserDto(null, result);
        return users;
    }

    saveUser = async (user) => {
        const result = await this.dao.saveUser(user);
        return result;
    }

    updateUser = async (id, data) => {
        const result = await this.dao.updateUser(id, data);
        return result;
    }
}