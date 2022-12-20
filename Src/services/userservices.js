import user from "../models/user";
import orgnaization from "../models/organization";
import MESSAGES from "../helpers/messages";
import Helper from "../helpers/index";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
class UserService {
  async addUser(req, res) {
    try {
      
      const extUser = await user.findOne({ userName: req.body.userName });
      if (extUser) {
        
        let resPayload = {
          message: MESSAGES.USER_EXIST,
        };
        return Helper.error(res, resPayload, 409);
      }
      
      const myData = new user(req.body);
      
      if(req.body.orgnaization){
        const addOrg = {
          userId: myData._id,
          orgName: req.body.orgnaization.orgName,
          address:req.body.orgnaization.address
        };  
        const org =  new orgnaization(addOrg);
        org.save();
      }
      
      myData.save().then((value)=>{
        const extUser =  user.findOne({ userName: req.body.userName });
        const token = jwt.sign({ _id: extUser._id }, process.env.SECRET_KEY);
        console.log(token)
        let resPayload = {
          message: MESSAGES.REGISTER_SUCCESS,
          payload:token
        };
        return Helper.success(res, resPayload);
      })     
    } 
    catch (err) {
      let resPayload = {
        message: MESSAGES.SOMETHING_WENT_WRONG,
      };
      return Helper.error(res, resPayload, 500);
    }
  }
  async loginUser(req, res) {
    try {
      const extUser = await user.findOne({ userName: req.body.userName });

      if (!extUser) {
        let resPayload = {
          message: MESSAGES.INVALID_CREDENTIALS,
        };
        return Helper.error(res, resPayload, 401);
      }

      const validPassword = await bcrypt.compare(
        req.body.password,
        extUser.password
      );
      if (!validPassword) {
        let resPayload = {
          message: MESSAGES.INVALID_CREDENTIALS,
        };
        return Helper.error(res, resPayload, 401);
      }

      const token = jwt.sign({ _id: extUser._id }, process.env.SECRET_KEY);
      const resPayload = {
        message: MESSAGES.LOGIN_SUCCESS,
        payload: { token: token },
      };
      return Helper.success(res, resPayload);
    } catch (err) {
      let resPayload = {
        message: MESSAGES.SOMETHING_WENT_WRONG,
      };
      return Helper.error(res, resPayload, 500);
    }
  }
  
  
  async updateUser(req, res) {
    try{
      const extUser = await user.findOne({ _id: req.user._id });
      if(!extUser.changePassword) {
         delete req.body.password
      }   
      const updatedUser=await user.findOneAndUpdate(req.user._id, req.body, { new: true })
        .then((item) => {
        let resPayload = {
          message: MESSAGES.UPDATED_SUCCESS
        };
        return Helper.success(res, resPayload);
      })
      .catch((err) => {
        let resPayload = {
          message: MESSAGES.USER_EXIST,
        };
        return Helper.error(res, resPayload, 500);
      });
    }
    catch(err){
      let resPayload = {
        message: MESSAGES.SOMETHING_WENT_WRONG
      };
      return Helper.error(res, resPayload, 500);
    }
    
  }
}  
export default new UserService();
