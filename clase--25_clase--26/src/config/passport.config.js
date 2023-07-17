import passport from 'passport';
import jwt from 'passport-jwt';
import GitHubStrategy from 'passport-github2';
import Users from '../dao/dbManagers/user.manager.js';
import config from './constants.config.js';

const userManager = new Users();
const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

const initializePassport = () => {
    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.privateKey
    }, async (jwt_payload, done) => {
        try {
            return done(null, jwt_payload.user);
        } catch (error) {
            return done(error);
        }
    }));

    /*
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
                    age: '30',
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
    */
}

export default initializePassport;