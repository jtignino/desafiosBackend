import { Router } from 'express';
import { userModel} from '../dao/models/user.model.js';

const router = Router();

const users = [];
/*
router.post('/', (req, res) => {
    const user = req.body;
    users.push(user);
    res.send({ status: 'success', user });
});

router.get('/', (req, res) => {
    res.send({ users });
});
*/

// Defino los servicios para trabajar con la DB:
router.get('/', async (req, res) => {
    // hago una consulta a la DB y le muestro los reg al cliente 
    try {
        const users = await userModel.find(); // userModel reemplaza db.usuarios, users va a ser un arreglo de objetos
        res.send({ result: 'success', payload: users })
    } catch (error) {
        res.status(500).send({ error });
    }
});

// Create:
router.post('/', async (req, res) => {
    const { first_name, last_name, email } = req.body; // obtengo los atributos del body usando {}

    if (!first_name || !last_name || !email) {  // valido que lleguen todos los atributos
        res.status(400).send({ error: ' Incomplete values.' });
    }

    // try/catch porque acá voy a hacer la consulta a la DB
    try {
        const result = await userModel.create({
            first_name,
            last_name,
            email
        });
        res.send({ result: 'success', payload: result });
    } catch (error) {
        res.status(500).send({ error });
    }
});

// Update:
router.put('/:uid', async (req, res) => {
    const { uid } = req.params;

    const userToReplace = req.body;

    if (!userToReplace.first_name || !userToReplace.last_name || !userToReplace.email) {  // valido que lleguen todos los atributos
        res.status(400).send({ error: ' Incomplete values.' });
    }

    try {
        const result = await userModel.updateOne({ _id: uid }, userToReplace);
        res.send({ result: 'success', payload: result });
    } catch (error) {
        res.status(500).send({ error });
    }

});

// Delete:
router.delete('/:uid', async (req, res) => {
    const { uid } = req.params;

    try {
        const result = await userModel.deleteOne({ _id: uid });
        res.send({ result: 'success', payload: result });
    } catch (error) {
        res.status(500).send({ error });
    }
});

export default router;