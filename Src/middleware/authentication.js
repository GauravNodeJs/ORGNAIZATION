import Helper from '../helpers/index'
import jwt from 'jsonwebtoken'
class Authentication {
    tokenMiddleware(req, res, next) {

        let authorization = req.headers.authorization
        const token = authorization.replace("Bearer ", "")
        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            req.user = decoded
        }
        catch (err) {
            let resPayload = {
                message: err.message,
                payload: {}
            };
            return Helper.error(res, resPayload, 401)
        }

        next();
    }
}


export default new Authentication;