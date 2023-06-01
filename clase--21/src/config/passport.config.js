import passport from 'passport';
import local from 'passport-local';
import Users from '../dao/dbManagers/user.manager.js';
import { createHash, isValidPassword } from '../utils.js';

const userManager = new Users();
const LocalStrategy = local.Strategy;

const initializePassport = () => {
    passport.use('register', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email'
    }, async (req, username, password, done) => {
        const { first_name, last_name, email, age } = req.body;

        try {
            const user = await userManager.getUser(username);
            
            if (user) return done(null, false); // envío un false porque a pesar de que no hubo error no se seteo el registro de usuario.
            
            const userToSave = {
                first_name,
                last_name,
                email,
                age,
                password: createHash(password)
            };

            const result = await userManager.addUser(userToSave);
            return done(null, result);

        } catch (error) {
            return done(`Error getting user: ${error}`);
        }
    }));

    passport.use('login', new LocalStrategy({
        usernameField: 'email'
    }, async (username, password, done) => {
        try {
            // console.log(username);
            const result = await userManager.getUser(username);
            // console.log('passport login', result);
            if (!result) return done(null, false); 
            
            if (!isValidPassword(result, password)) return done(null, false);
            
            const user = {...result._doc, role: 'user'};
            // console.log(user);
            return done(null, user);
        } catch (error) {
            return done(`Error getting user: ${error}`);
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        const user = await userManager.getUserById(id);
        done(null, user);
    });
}

export default initializePassport;