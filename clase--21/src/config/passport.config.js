import passport from 'passport';
import local from 'passport-local';
import GitHubStrategy from 'passport-github2';
import Users from '../dao/dbManagers/user.manager.js';
import { createHash, isValidPassword } from '../utils.js';

const userManager = new Users();

const initializePassport = () => {
    passport.use('github', new GitHubStrategy({
        clientID: "Iv1.73c20a4ba1a184b0",
        clientSecret: "6e5f1751f9f676a977f3a8b62d3c946d163b9a93",
        callbackURL: "http://localhost:8080/api/sessions/githubcallback",
        scope: ["user:email"]
    }, async (accesToken, refreshToken, profile, done) => {
        try {
            const email = profile.emails[0].value;

            const user = await userManager.getUser(email);
            
            if (!user) {
                const newUser = {
                    first_name: profile._json.name,
                    last_name: '',
                    age: 30,
                    email,
                    password: ''
                }
                const result = await userManager.addUser(newUser);

                done(null, result); 
            } else {
                done(null, user);
            }
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