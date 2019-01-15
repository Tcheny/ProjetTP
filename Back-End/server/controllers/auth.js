import bcrypt from 'bcrypt';
import moment from 'moment';
import jwt from 'jsonwebtoken'

import { createOne, getOne } from './registrer'
import { addUsers } from './users'

// encryptPassWord
const hashCredentials = (user) => {
    const salt = bcrypt.genSaltSync(10)

    // 1 - crypter le password
    // req { login, password } + cryptage(salt)
    const credentials = bcrypt.hashSync(user.user_email + user.user_password, salt)
    return  {
        email: user.user_email,
        password: credentials
    }
}

const generateToken = (user) => {
    const payload = {
        iat: moment().unix(), // issued at : now
        // exp: moment().add(1, 'days').unix(), // expires at
        iss: user.user_email, // issuer 'emy' => BDD => { login, credentials}
        sub: user.user_password // substring
    }

    return jwt.sign(payload, 'Untrucsecret', { expiresIn: '1h' })
}


const verifyLogin = (reqUser, bddUser) => {

    if (!bddUser) return {success: false, msg: 'User doesn\'t exist'}
    if (bcrypt.compareSync(reqUser.user_email + reqUser.user_password, bddUser.credentials)) return {success: true, msg: 'Successfully logged in'}
    else  return {success: false, msg: 'wrong password'}
}

export default {
    register: async (req, res) => {

        const newUser = hashCredentials(req.body)
        // 2 - Sauvegarder le nouvel user dans la BDD
        // bdd user = {login, hash}
        createOne(newUser)

        // 3 - envoyer un token au client pour avec access au site
        newUser.token = generateToken(newUser)

        res.send(newUser)
    },

    login: async (req, res) => {

        // 1 - utiliser le login de cette requete
        // search dans ma BDD
        // const bddUser = { login: 'emilie', credentials: '$2b$10$y2.77WFYJLCoSfTkQZVzWuPnQXl7Lb8brcRVf8g1reL0QqYTA8XUi'}

        const result = await getOne(req.body)


        const logged = verifyLogin(req.body, result)

        if (logged.success) {
            bddUser.token =  generateToken(bddUser)
            res.send(bddUser)
        } else {
            res.send(logged.msg)
        }

        res.send(logged)
        // 2 - comparer ce qui vient avec la requet {login, password}
        // contre l'user qui a le meme login en BDD { login, hash}
        // decrypter le hash
        // 3 - envoyer un token au client pour avec access au site

    }
}
