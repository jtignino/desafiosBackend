import UsersRepository from '../repositories/users.repository.js';

const userRepository = new UsersRepository();

const getUser = async (email) => {
    const user = await userRepository.getUserByEmail(email);
    return user;
}

const getUsers = async () => {
    const user = await userRepository.getUsers(email);
    return user;
}

const getUserById = async (id) => {
    const user = await userRepository.getUserById(id);
    return user;
}

const saveUser = async (user) => {
    await userRepository.addUser(user);
    return user;
}

export {
    getUser,
    getUsers,
    getUserById,
    saveUser
}