import { USERSDAO } from "../dao/index.js";

const getUser = async (email) => {
    const user = await USERSDAO.getUserByEmail(email);
    return user;
}

const saveUser = async (user) => {
    await USERSDAO.addUser(user);
    return user;
}

export {
    getUser,
    saveUser
}