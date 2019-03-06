const jwt = require('jsonwebtoken');

const generateToken = userId => {
    if (process.env.JWT_SECRET) {
        const secret = process.env.JWT_SECRET;
        const payload = {
            userId,
        };
        const token = jwt.sign(payload, secret, {
            expiresIn: '30day',
        });
        return token;
    } else {
        throw new Error('Vous ne pouvez pas générer de token');
    }
};

const validateToken = async (req, res, next) => {
    // User crée un compte ou se connecte sans token
    if (
        // req.path !== "/logout"
        req.path === '/users/add' ||
        req.path === '/login' ||
        req.path === '/posts/postInfos' ||
        req.path === '/posts/allId' ||
        req.path === '/auth'
    ) {
        next();
    } else if (!req.cookies.token) {
        res.redirect('/');
    } else {
        const { token } = req.cookies;

        const secret = process.env.JWT_SECRET;
        jwt.verify(token, secret, (err, decoded) => {
            // Si le token n'est pas authentifié
            if (err) {
                console.log('JWT invalide', req.path, err);
                res.clearCookie();
                return res.redirect('/');
            }
            console.log('Token validé pour', req.path);

            const session = { userId: decoded.userId };
            req.session = session;
            next();
        });
    }
};

module.exports = {
    generateToken,
    validateToken,
};
