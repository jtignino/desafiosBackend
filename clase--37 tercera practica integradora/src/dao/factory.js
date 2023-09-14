import config from '../config/constants.config.js';

export let Users;

const persistence = config.persistence;

switch (persistence) {
    case 'MONGO':
        console.log('MONGO PERSISTENCE')
        const mongoose = await import('mongoose');
        await mongoose.connect(config.mongoUrl);
        const { default: UsersMongo } = await import ('./dbManagers/classes/users.dao.js');
        Users = UsersMongo;
        break;
    case 'FILE':
        // const { default: UsersFile } = await import ('./fileManagers/users.dao.js');
        // Users = UsersFile;
        break;
}