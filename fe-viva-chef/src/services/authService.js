import axios from 'axios';

const BASE_URL = 'http://localhost:3001/auth'; // Replace with your actual API endpoint

const AuthService = {
  async loginViaGoogle(idToken) {
    try{
      const response = await axios.post(`${BASE_URL}/google-login`, {idToken});
      console.log("response:", response);
      return response.data;
    } catch(error){
        console.log(error);
    }
  }
};

export default AuthService;