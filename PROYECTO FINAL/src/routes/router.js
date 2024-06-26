import passport from 'passport';
import { Router as expressRouter } from 'express';
import { passportStrategiesEnum } from '../config/enums.config.js';

export default class Router {
    constructor() {
        this.router = expressRouter();
        this.init();  
    };

    getRouter() {
        return this.router;
    };

    init() { }

    get(path, policies, passportStrategy, cookieName, ...callbacks) {
        this.router.get(
            path,
            this.applyCustomPassportCall(passportStrategy, cookieName),
            this.handlePolicies(policies),
            this.generateCustomReponse,
            this.applyCallbacks(callbacks)
        );
    };

    post(path, policies, passportStrategy, cookieName, ...callbacks) {
        this.router.post(
            path,
            this.applyCustomPassportCall(passportStrategy, cookieName),
            this.handlePolicies(policies),
            this.generateCustomReponse,
            this.applyCallbacks(callbacks)
        );
    };

    put(path, policies, passportStrategy, cookieName, ...callbacks) {
        this.router.put(
            path,
            this.applyCustomPassportCall(passportStrategy, cookieName),
            this.handlePolicies(policies),
            this.generateCustomReponse,
            this.applyCallbacks(callbacks)
        );
    };

    delete(path, policies, passportStrategy, cookieName, ...callbacks) {
        this.router.delete(
            path,
            this.applyCustomPassportCall(passportStrategy, cookieName),
            this.handlePolicies(policies),
            this.generateCustomReponse,
            this.applyCallbacks(callbacks)
        );
    };

    applyCustomPassportCall = (strategy, cookieName) => (req, res, next) => {
        if (strategy === passportStrategiesEnum.JWT) {
            req.cookieName = cookieName;
            console.log(req.cookieName)
            passport.authenticate(strategy, function (err, user, info) {
                if (err) return next(err);

                if (!user) {
                    return res.status(401).send({
                        error: info.messages ? info.messages : info.toString()
                    })
                }
                req.user = user;
                next();
            })(req, res, next);
        } else {
            next();
        }
    }

    handlePolicies = (policies) => (req, res, next) => {
        if (policies[0] === 'PUBLIC') return next();
        
        const user = req.user;

        if (!policies.includes(user.role.toUpperCase()))
            return res.status(403).json({ message: 'Forbidden' })
            
        next();
    };

    generateCustomReponse = (req, res, next) => {
        res.sendSuccess = (data) => {
            res.status(200).json({ data });
        };
        res.sendClientError = (error, statusHttp) => {
            res.status(statusHttp ?? 400).json({ error });
        };
        res.sendServerError = (error) => {
            res.status(500).json({ error });
        };
        next();
    }

    applyCallbacks(callbacks) {
        return callbacks.map((callback) => async (...params) => {
            try {
                await callback.apply(this, params);//req, res, next
            } catch (error) {
                params[1].status(500).json({ error: error.message });
            }
        })
    }
}