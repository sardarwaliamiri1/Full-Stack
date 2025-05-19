import { Schema ,model} from "mongoose";
import { type } from "os";
const userSchema = new Schema({
      name:{
            type: String,
            required: true,
            trim: true      
      },
      email:{
            type: String,
            required: true,
            unique: true,
            trim: true
      },
      password:{
            type: String,
            required: true,
            trim: true
      },

})

const User = model('User', userSchema);
export default User;