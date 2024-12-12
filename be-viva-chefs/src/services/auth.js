import jsonwebtoken from "jsonwebtoken";
import { OAuth2Client } from 'google-auth-library';
// const GOOGLE_CLIENT_ID = "245995719734-quoi1ulg2o53heau0tgnbms8b8hb1r8q.apps.googleusercontent.com";
// const JWT_SECRETE_STRING = 'qwertuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890';
import { GOOGLE_CLIENT_ID, JWT_SECRETE_STRING } from "../configs/index.js";

export const verifyGoogleToken = async (token) => {
  const client = new OAuth2Client(GOOGLE_CLIENT_ID); //google client id
  const verifiedToken = await client.verifyIdToken({
    audience: GOOGLE_CLIENT_ID,
    idToken: token,
  });

    const payload = verifiedToken.getPayload(); // Contains user info
    console.log('Google User Payload:', payload);
    return {
      googleId: payload.sub,
      email: payload.email,
      name: payload.name,
      avatar: payload.picture
    };
};

export const generateToken = function (user) {
  const JWT_SECRET = JWT_SECRETE_STRING; // Replace with a secure secret key
  const jwtToken = jsonwebtoken.sign({ id: user._id }, JWT_SECRET, {
    expiresIn: "30d",
  });
  return jwtToken;
};
