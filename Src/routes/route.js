import bodyParser from 'express'
import UserService from '../services/userservices'
import Authentication from '../middleware/authentication';
import JoiMiddleware from '../middleware/joi-middleware';
const route = (app) => {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json())
    app.post('/user/add',JoiMiddleware.joiMiddleware,UserService.addUser)
    app.post('/user/login',JoiMiddleware.joiMiddleware,UserService.loginUser)
    app.post('/org/add',Authentication.tokenMiddleware,JoiMiddleware.joiMiddleware,UserService.addOrgnaization)
    app.get('/org/list',Authentication.tokenMiddleware,UserService.orgList)
    app.put('/user/update',Authentication.tokenMiddleware,UserService.updateUser)
    app.put('/org/list/update/:id',Authentication.tokenMiddleware,JoiMiddleware.joiMiddleware,UserService.updateOrg)
}
export default route