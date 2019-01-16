import jwt from 'jsonwebtoken'
import { getOneUser } from './users';

export const getUserFromToken = async (jwtToken) => {
        if (!jwtToken) {
            throw new Error('Pas de Token')
        }

        const decodedToken = jwt.decode(jwtToken)
        if (!decodedToken) {
            throw new Error('Décodage du token échoué')
        }

        const user = await getOneUser(decodedToken)
        return user
    }

export default getUserFromToken;
