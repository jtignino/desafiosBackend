import Assert from 'assert';
import { Users } from '../../src/dao/factory.js';
import UsersRepository from "../../src/repositories/users.repository.js";

const assert = Assert.strict;

let usersDao;

describe('Probando el DAO de usuarios.', () => {
    before(() => {
        const users = new Users();
        usersDao = new UsersRepository(users);
    })
    
    it('El DAO debe poder obtener los usuarios en formato de arreglo.', async () => {
        const result = await usersDao.getUsers();
        assert.strictEqual(Array.isArray(result.users), true);
    })
})