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

      const myData =await new user(req.body);
      
      const addOrg = {
        userId: myData._id,
        orgName: req.body.orgnaization.orgName,
        address:req.body.orgnaization.address,
        changePassword:req.body.changePassword
      };

      const org = await new orgnaization(addOrg);
      org.save();
      await myData.save();

      let resPayload = {
        message: MESSAGES.REGISTER_SUCCESS,
      };
      return Helper.success(res, resPayload);
    } catch (err) {
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
  async addOrgnaization(req, res) {
    try {
      const idUser = req.user._id;
      let attribute = {
          userId: idUser,
          orgName: req.body.orgName,
          address:req.body.address
        
      };
      
      let org =await new orgnaization(attribute);

      org
        .save()
        .then((value) => {
          let resPayload = {
            message: MESSAGES.SUCCESSFULLY_ADDED_ORGANIZATION,
            payload: value,
          };
          return Helper.success(res, resPayload);
        })
        .catch((err) => {
          let resPayload = {
            message: err,
            payload: {},
          };
          return Helper.error(res, resPayload);
        });
    } catch (err) {
      let resPayload = {
        message: MESSAGES.SOMETHING_WENT_WRONG,
        payload: {},
      };
      return Helper.error(res, resPayload, 500);
    }
  }
  async orgList(req, res) {
    try {
      const extUser = req.user.userId;
      const userData = await user.aggregate([
        {
          $lookup: {
            from: "orgs",
            localField: "_id",
            foreignField: "userId",
            as: "userOrgs",
          },
        },
        {
          $match: {
            userName: "gaurav",
          },
        },
        {
          $project: {
            _id: 0,
            by: "$firstName",
            userOrgs: {
              _id:1,
              orgName: 1,
            },
          },
        },
      ]);
      let resPayload = {
        message: "your orgs",
        payload: userData,
      };
      return Helper.success(res, resPayload);
    } catch (err) {
      const resPayload = {
        message: MESSAGES.SOMETHING_WENT_WRONG,
        payload: {},
      };
      return Helper.error(res, resPayload);
    }
  }
  async updateUser(req, res) {
    try{
      const extUser = await user.findOne({ _id: req.user._id });
      if(req.body.password){
        if(extUser.changePassword==false){
          let resPayload = {
            message: MESSAGES.NOT_ALLOWED,
          };
          return Helper.error(res, resPayload, 409);
        }
      }
      
      const updatedUser=await user.findOneAndUpdate(req.user._id, req.body, { new: true })
        .then((item) => {
        let resPayload = {
          message: MESSAGES.UPDATED_SUCCESS,
          payload:item
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
  async updateOrg(req,res){
    try {
      const extUser=req.user._id
      const searchUser=await orgnaization.findById({_id:req.params.id})
      if(searchUser.userId != extUser){
        let resPayload = {
          message: MESSAGES.NOT_ALLOWED
        };
        return Helper.error(res, resPayload, 500);
      }
      const updatedOrg=await orgnaization.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then((item) => {
        let resPayload = {
          message: MESSAGES.UPDATED_SUCCESS,
          payload:item
        };
        return Helper.success(res, resPayload);
      })
      .catch((err) => {
        let resPayload = {
          message: MESSAGES.CANNOT_UPDATE,
        };
        return Helper.error(res, resPayload, 500);
      });
    }
     catch (err) {
      const resPayload = {
        message: MESSAGES.SOMETHING_WENT_WRONG,
        payload: {},
      };
      return Helper.error(res, resPayload,409);
    }
  }
}  
export default new UserService();
