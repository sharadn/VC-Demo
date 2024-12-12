import { verifyGoogleToken, generateToken } from "../services/auth.js";
import { createUser, findUserByEmail } from "../repository/userRepository.js";


export const googleLogin = async (req, res, next) => {
  console.log('Request received:', req.body);
  const { idToken } = req.body;
  try {
    const { googleId, email, name, avatar } = await verifyGoogleToken(idToken); //verify and get token details
    console.log("googleId, email, name, avatar:", googleId, email, name, avatar);

    let user = await findUserByEmail(email);
    if (!user) {
      user = await createUser(googleId, email, name, avatar);
    }

    console.log("user:", user);

    const jwtToken = generateToken(user);
    return res.status(200).json({ token: jwtToken, user });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

export const jwtLogin = async (req, res, next) => {
  const { email, password} = req.body;
  let jwtToken;
  try{
      let user = await findUserByEmail(email);

      if(!user){
        return new Error({ message: 'Invalid credentiald...'});
      }
      
      if(await bcrypt.compare(password, user.password)){
        jwtToken = generateToken(user);
      }
      
      return res.status(200).json({ token: jwtToken, user });
  } catch(error){
    return res.status(500).send(error);
  }
};
