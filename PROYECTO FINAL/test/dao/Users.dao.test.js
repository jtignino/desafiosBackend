import Assert from 'assert';
import { Users } from '../../src/dao/factory.js';
import UsersRepository from "../../src/repositories/users.repository.js";
import mongoose from 'mongoose';

const assert = Assert.strict;

let usersDao;

describe('Probando el DAO de usuarios.', () => {
    before(() => {
        const users = new Users();
        usersDao = new UsersRepository(users);
    })

    beforeEach(async () => {
        try {
            await mongoose.connection.collections.users.drop();
        } catch (error) {
            console.log(error);
        }
    })
    
    
    it('El DAO debe poder obtener los usuarios en formato de arreglo.', async () => {
        const result = await usersDao.getUsers();
        assert.strictEqual(Array.isArray(result.users), true);
    })
    
    it('El DAO debe poder registrar un usuario en la BDD correctamente.', async () => {
        const mockUser = {
            first_name: 'Testing',
            last_name: 'Mocha',
            email: 'test_mocha@gmail.com',
            password: 'testmocha1234',
            role: 'tester'
        };

        const result = await usersDao.saveUser(mockUser);
        assert.ok(result._id);
    })

    it('El DAO debe poder obtener un usuario a partir de su email.', async () => {
        const mockUser = {
            first_name: 'Testing',
            last_name: 'Mocha',
            email: 'test_mocha@gmail.com',
            password: 'testmocha1234',
            role: 'tester'
        };

        const result = await usersDao.saveUser(mockUser);
        const user = await usersDao.getUserByEmail(mockUser.email);
        assert.strictEqual(typeof user, 'object')
    })

})