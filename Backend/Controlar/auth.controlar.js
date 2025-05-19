import User from "../Model/User.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../Utlies/Errorhandler.js";
const signup = async(req, res, next) => {
      const {name, email, password} = req.body;
      const hashedPassword = await bcryptjs.hashSync(password, 10);
      const newUser= new User({
            name,
            email,
            password: hashedPassword,
      })
      
      try {
            const user = await newUser.save();
            return res.status(201).json({
                  message: "User created successfully",
                  user,
            })
      } catch (error) {
            error.message= "User already exists checked by sardar";
          next(error)  
            
      }
     
}
export default signup;