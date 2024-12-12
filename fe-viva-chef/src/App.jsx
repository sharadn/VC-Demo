import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css';
import { Box } from '@mui/material';
// import { GoogleLogin } from 'react-google-login';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import AuthService from './services/authService';
import RecipeSearch from './components/RecipeSearch';


const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
console.log('Google GOOGLE_CLIENT_ID:', GOOGLE_CLIENT_ID);
function App() {
  const [user, setUser] = useState(null);

  const handleLoginSuccess = async (response) => {
    console.log('Login Success:', response.credential);
    const idToken = response.credential;
    let googleResponse  = await AuthService.loginViaGoogle(idToken);
    setUser(googleResponse.user); // Store user data after successful login
    //Navigate to 
  };

  const handleLoginFailure = (response) => {
    if (response.error === 'popup_closed_by_user') {
      console.log('The user closed the popup before completing the login process');
    } else {
      console.error('Login Failed:', response);
    }
  };

  return (
    <Box
      sx={{
        width: '100%', 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '16px', 
      }}
    >
      {/* <RecipeSearch /> */}
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        {!user ? (
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={handleLoginFailure}
          />
        ) : (
          <RecipeSearch user={user} />
        )}
      </GoogleOAuthProvider>
    </Box>
  );
}

export default App;
