import { Router } from 'express';
import Users from '../dao/dbManagers/user.manager.js';
import passport from 'passport';

const router = Router();
const userManager = new Users();

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }), async (req, res) => {
    res.send({ status: 'success', message: 'User registered.' });
});

router.get('/githubcallback', passport.authenticate('github', { failureRedirect: 'login'}, async (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
}));

// router.post('/register', passport.authenticate('register', { failureRedirect: '/fail-register' }), async (req, res) => {
//     res.send({ status: 'success', message: 'User registered.' });
// });

// router.get('/fail-register', async (req, res) => {
//     res.send({ status: 'error', message: 'Register failed.' });
// });

// router.post('/login', passport.authenticate('login', { failureRedirect: '/fail-login' }), async (req, res) => {
//     if (!req.user) return res.status(400).send({ status: 'error', error: 'Incorrect credentials' });
//     console.log('REQUEST-USER', req.user)
//     req.session.user = {
//         name: req.user.first_name,
//         last_name: req.user.last_name,
//         age: req.user.age,
//         email: req.user.email,
//         role: req.user.role
//     };

//     res.send({ status: 'success', message: 'Login success.' })

//     /*
//     try {
//         const { email, password } = req.body;

//         if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
//             req.session.user = {
//                 name: 'Admin Coder',
//                 email: email,
//                 role: 'admin'
//             }
//             return res.send({ status: 'success', message: 'Admin login success.' });
//         }

//         const user = await userManager.getUser(email, password);

//         if (!user) {
//             return res.status(400).send({ status: 'error', error: 'Incorrect credentials' });
//         }

//         req.session.user = {
//             name: `${user.first_name} ${user.last_name}`,
//             email: user.email,
//             age: user.age,
//             role: 'user'
//         }

//         res.send({ status: 'success', message: 'Login success.' });
//     } catch (error) {
//         res.status(500).send({ status: 'error', error });
//     }
//     */
// });

// router.get('/fail-login', async (req, res) => {
//     res.send({ status: 'error', message: 'Login failed' });
// });

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).send({ status: 'error', error: 'Logout fail.' });
        res.redirect('/products');
    })
});

export default router;