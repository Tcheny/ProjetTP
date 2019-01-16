import jwt from 'jsonwebtoken'

export const generateToken = (user) => {
    if (process.env.JWT_SECRET) {
        const secret = process.env.JWT_SECRET
        const payload = {
            user
        }
        const token = jwt.sign(payload, secret, {
            expiresIn: '30day'
        })
        return token
    } else {
        throw new Error('Vous ne pouvez pas générer de token')
    }
}

export const validateToken = async (req, res, next) => {

    // User crée un compte ou se connecte sans token
    if (req.originalUrl === '/users/add' || req.originalUrl === '/login') {
        next()
    } else if (!req.cookies.token) {
        res.redirect('/')
    } else {
        const { token } = req.cookies

        const secret = process.env.JWT_SECRET
        jwt.verify(token, secret, (err, decoded) => {

            // Si le token n'est pas authentifié
            if (err) {
                console.log('JSON web token invalide', req.originalUrl, err)
                return res.redirect('/')
            }
            console.log('Token validé pour ', req.originalUrl)

            req.userId = decoded.userId
            console.log("REQ USERID", decoded.userId)
            next()
        })
    }
}
