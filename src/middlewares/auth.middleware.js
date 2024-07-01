const { verifyAccessToken } = require('../services/auth-service');
const responseFormat = require('../utils/response-formatter');

module.exports = ( ...roles ) => {
    return async (req, res, next) => {

        const authorization = req.headers.authorization;
    
        if ( !authorization ) {
            return res.status(403).send( responseFormat.ErrorResponse('unauthorized_request'));
        }
    
        const token = authorization.replace('Bearer ', '');
    
        if ( !token ) {
            return res.status(403).send( responseFormat.ErrorResponse('unauthorized_request'));
        }
    
        try {
            const payload = await verifyAccessToken( token );
            const { userId, email, userRole } = payload;

            if ( !roles.includes(userRole)) {
                return res.status(403).send( responseFormat.ErrorResponse('unauthorized_request'));
            }

            req.user = {
                id: userId,
                email,
                role: userRole
            };
        } catch (e) {
            console.error(e);
            return res.status(403).send( responseFormat.ErrorResponse('unauthorized_request'));
        }
    
        next();
    }
}