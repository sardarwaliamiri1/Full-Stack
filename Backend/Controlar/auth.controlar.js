import User from "../Model/User.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../Utlies/Errorhandler.js";
import jwt from "jsonwebtoken";
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
                  success: true,   

            
            })
      } catch (error) {
            error.message= "User already exists checked by sardar";
          next(error)  
            
      }
     
}
export default signup;

export const signin= async (req,res,next)=>{
   try{

      const {email, password}=req.body;
      const validUser= await User.findOne({email}); 
      if(!validUser) return next(errorHandler('User not found', 404));
      const isPasswordValid= bcryptjs.compareSync(password,validUser.password);
      if(!isPasswordValid) return next(errorHandler('Invalid credentials', 404));
      //console.log(process.env.JWT_SECRET);
      const token=jwt.sign({id:validUser._id}, process.env.JWT_SECRET, {expiresIn: '1d'});
      res.cookie('access_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
      }).status(200).json({
            success: true,
            message: 'Login successful',
            user: {
                  
                  name: validUser.name,
                  email: validUser.email,
            },
            
      })
      
   }

      catch(error){
        // next( errorHandler(404,'catch Erro'))
        next(error)
      }


}