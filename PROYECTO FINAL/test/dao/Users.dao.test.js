import { expect } from 'chai';
import { Users } from '../../src/dao/factory.js';
import UsersRepository from "../../src/repositories/users.repository.js";
import mongoose from 'mongoose';

let usersDao;

describe('Probando el DAO de usuarios.', () => {
    before(() => {
        const users = new Users();
        usersDao = new UsersRepository(users);
    })

    // beforeEach(async () => {
    //     try {
    //         await mongoose.connection.collections.users.drop();
    //     } catch (error) {
    //         console.log(error);
    //     }
    // })

    it('El DAO debe poder registrar un usuario en la BDD correctamente.', async () => {
        const mockUser = {
            first_name: 'Testing',
            last_name: 'Mocha',
            email: 'test_mocha@hotmail.com',
            password: 'testmocha1234',
            role: 'tester'
        };

        const result = await usersDao.saveUser(mockUser);
        expect(result._id).to.be.ok;
    })

    it('El DAO debe poder obtener un usuario a partir de su email', async () => {
        const mockUser = {
            first_name: 'Testing',
            last_name: 'Mocha 2',
            email: 'test_mocha@gmail.com',
            password: 'testmocha1234',
            role: 'tester'
        };

        const result = await usersDao.saveUser(mockUser);
        const user = await usersDao.getUserByEmail(mockUser.email);
        expect(typeof user).to.be.equal('object');
    })

    it('El DAO debe poder obtener los usuarios en formato de arreglo', async () => {
        const result = await usersDao.getUsers();
        expect(Array.isArray(result.users)).to.be.equal(true);
    })

    it('El DAO debe poder actualizar un usuario en la BDD', async () => {
        const mockUser = {
            first_name: 'Testing',
            last_name: 'Mocha 3',
            email: 'test_mocha@outlook.com',
            password: 'testmocha1234',
            role: 'tester'
        };

        const result = await usersDao.saveUser(mockUser);
        
        const mockUserUpdate = {
            first_name: 'Testing Update',
            last_name: 'Mocha Update',
            email: 'test_mocha@outlook.com',
            password: 'testmocha1234',
            role: 'tester'
        };

        await usersDao.updateUser(result._id, mockUserUpdate);
        const user = await usersDao.getUserByEmail(result.email);
        expect(user.first_name).to.be.equal('Testing Update');
        expect(user.last_name).to.be.equal('Mocha Update');
    })

    it('El DAO debe poder eliminar al usuario', async () => {
        const result = await usersDao.deleteUser('test_mocha@outlook.com');
        console.log(result.deletedCount)
        expect(result.deletedCount).to.be.not.equal(0);        
    })

})