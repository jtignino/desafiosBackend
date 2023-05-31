import { Router } from 'express';
import Users from '../dao/dbManagers/user.manager.js';

const router = Router();
const userManager = new Users();

router.post('/register', async (req, res) => {
    try {
        const { first_name, last_name, email, age, password } = req.body;

        const exists = await userManager.getUser(email);

        if (exists) {
            return res.status(400).send({ status: 'error', error: 'User already exists.' })
        };

        const user = {
            first_name,
            last_name,
            email,
            age,
            password
        };

        await userManager.addUser(user);

        res.send({ status: 'success', message: 'User registered.' });
    } catch (error) {
        res.status(500).send({ status: 'error', error });
    }
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
            req.session.user = {
                name: 'Admin Coder',
                email: email,
                role: 'admin'
            }
            return res.send({ status: 'success', message: 'Admin login success.' });
        }

        const user = await userManager.getUser(email, password);

        if (!user) {
            return res.status(400).send({ status: 'error', error: 'Incorrect credentials' });
        }

        req.session.user = {
            name: `${user.first_name} ${user.last_name}`,
            email: user.email,
            age: user.age,
            role: 'user'
        }

        res.send({ status: 'success', message: 'Login success.' });
    } catch (error) {
        res.status(500).send({ status: 'error', error });
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).send({ status: 'error', error: 'Logout fail.' });
        res.redirect('/products');
    })
});

export default router;