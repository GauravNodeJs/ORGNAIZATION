import UserService from '../services/userservices'
import Authentication from '../middleware/authentication';
import JoiMiddleware from '../middleware/joi-middleware';
const userRoute = (app) => {
    app.post('/user/add',JoiMiddleware.joiMiddleware,UserService.addUser)
    app.post('/user/login',JoiMiddleware.joiMiddleware,UserService.loginUser)
    app.put('/user/update',Authentication.tokenMiddleware,UserService.updateUser)
}
export default userRoute