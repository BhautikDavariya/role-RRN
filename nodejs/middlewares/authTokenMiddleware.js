const jwt = require('jsonwebtoken');

const authTokenMiddleware = (req, res, next) => {
    try {
        const token = req.headers['authtoken']
        if (!token) {
            return res.status(401).send({ error: 'Unauthorized' })
        }
        const decoded = jwt.verify(token, "SECRET_KEY")
        req.user = decoded
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}

module.exports = authTokenMiddleware