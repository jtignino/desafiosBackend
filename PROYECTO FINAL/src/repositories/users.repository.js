import UserDto from "../dao/DTOs/user.dto.js";

export default class UsersRepository {
    constructor(dao) {
        this.dao = dao;
    }

    getUserById = async (id) => {
        const result = await this.dao.getUserById(id);
        const user = new UserDto(result);
        return user;
    }

    getUserByEmail = async (email) => {
        const result = await this.dao.getUserByEmail(email);
        const user = new UserDto(result);
        return user;
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