import bcrypt from 'bcrypt';
import moment from 'moment';
import jwt from 'jsonwebtoken'


// encryptPassWord
const hashCredentials = (user) => {
    const salt = bcrypt.genSaltSync(10)

    // 1 - crypter le password
    // req { login, password } + cryptage(salt)
    const credentials = bcrypt.hashSync(user.login + user.password, salt)
    return  {
        login: user.login,
        credentials: credentials
    }
}

const generateToken = (user) => {
    const payload = {
        iat: moment().unix(), // issued at : now
        // exp: moment().add(1, 'days').unix(), // expires at
        iss: user.login, // issuer 'emy' => BDD => { login, credentials}
        sub: user.credentials // substring
    }

    return jwt.sign(payload, 'Untrucsecret', { expiresIn: '1h' })
}


const verifyLogin = (reqUser, bddUser) => {
    if (!bddUser) return {success: false, msg: 'User doesn\'t exist'}
    if (bcrypt.compareSync(reqUser.login + reqUser.password, bddUser.credentials)) return {success: true, msg: 'Successfully logged in'}
    else  return {success: false, msg: 'wrong password'}
}

export default {
    register: (req, res) => {

        const newUser = hashCredentials({login: "emilie", password: "princess"})
        // 2 - Sauvegarder le nouvel user dans la BDD
        // bdd user = {login, hash}

        // 3 - envoyer un token au client pour avec access au site
        newUser.token = generateToken(newUser)

        res.send(newUser)
    },

    login: (req, res) => {

        const reqUser = { login: 'emilie', password: 'princess'}

        // 1 - utiliser le login de cette requete
        // search dans ma BDD
        const bddUser = { login: 'emilie', credentials: '$2b$10$y2.77WFYJLCoSfTkQZVzWuPnQXl7Lb8brcRVf8g1reL0QqYTA8XUi'}

        const logged = verifyLogin(reqUser, bddUser)

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
