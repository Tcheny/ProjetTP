import { Router } from 'express';
import { generateToken } from '../Authentication';
import verifyUser from '../controllers/verifyUser';

const router = Router();

router.post('/login', async (req, res) => {
    let userToLogin = null;

    try {
        userToLogin = await verifyUser(req.body.user_email, req.body.user_password)
    } catch (error) {
        console.log('Erreur dans verifyUser :', error)
        return res.status(500).json(error.message)
    }

    res.cookie('token', generateToken(userToLogin.userid))

    res.status(200).send(`Bienvenue, ${userToLogin.user_firstname}`)
})

router.get('/logout', (req, res) => {
    res.clearCookie('token')

    res.status(200).send('token deleted')
})

export default router;
