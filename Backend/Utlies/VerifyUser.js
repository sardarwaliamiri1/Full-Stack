import { errorHandler } from "./Errorhandler.js";
import jwt from 'jsonwebtoken';

const verfiy= (req, res, next)=>{
      const token = req.cookies.access_token;
      if (!token) {
            return res.status(401).json({
                  success: false,
                  message: 'You are not authenticated',
            });
      }
      if (!token) return next(errorHandler('You are not authenticated', 401));

      jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                  return res.status(403).json({
                        success: false,
                        message: 'Token is not valid',
                  });
            }
            req.user = user;
            next();
      });


}
export default verfiy;