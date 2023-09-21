import { Router } from 'express';
import passport from 'passport';

const router = Router();

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }), async (req, res) => {
    res.send({ status: "success", message: "User registered." });
});

router.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/' }), async (req, res) => {
    req.session.user = {...req.user._doc, role: 'user'};
    res.redirect('/products');
});

router.post('/register', passport.authenticate('register', { failureRedirect: '/fail-register' }), async (req, res) => {
    res.send({ status: 'success', message: 'User registered.' });
});

router.get('/fail-register', async (req, res) => {
    res.send({ status: 'error', message: 'Register failed.' });
});

router.post('/login', passport.authenticate('login', { failureRedirect: '/fail-login' }), async (req, res) => {
    if (!req.user)  {
        return res.status(400).send({ status: 'error', error: 'Incorrect credentials' });
    }
    console.log('REQUEST-USER', req.user)
    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age,
        email: req.user.email,
        role: req.user.role
    };

    res.send({ status: 'success', message: 'Login success.' });
});

router.get('/fail-login', async (req, res) => {
    res.send({ status: 'error', message: 'Login failed.' });
});


router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).send({ status: 'error', error: 'Logout fail.' });
        res.redirect('/products');
    })
});

export default router;