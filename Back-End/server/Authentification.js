import jwt from 'jsonwebtoken'

export const generateToken = (user) => {
    if (process.env.JWT_SECRET) {
        const secret = process.env.JWT_SECRET
        const payload = {
            user
        }
        const token = jwt.sign(payload, secret, {
            expiresIn: '1h'
        })
        return token
    } else {
        throw new Error('Vous ne pouvez pas générer de token')
    }
}
