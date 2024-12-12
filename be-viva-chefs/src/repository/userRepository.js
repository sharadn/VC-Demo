import User from '../models/UserSchema.js';

export const findUserByEmail = async (email)=>{
  return await User.findOne({ email });
}

export const createUser = async (googleId, email, name, avatar)=> {
  let user = new User({ googleId, email, name, avatar });
  await user.save();
};
