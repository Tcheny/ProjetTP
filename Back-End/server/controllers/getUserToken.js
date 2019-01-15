import jwt from 'jsonwebtoken'
import { getOneUser } from './users';

export default {
    getUserFromToken: async (jwtToken) => {
        if (!jwtToken) {
            throw new Error('Pas de Token')
        }

        const verified = jwt.verify(jwtToken, process.env.JWT_SECRET)

        const decodedToken = jwt.decode(jwtToken)
        if (!decodedToken) {
            throw new Error('Décodage du token échoué')
        }

        const user = await getOneUser(decodedToken)
    }
}
