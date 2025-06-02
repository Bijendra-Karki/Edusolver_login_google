import React from 'react';
import { useGoogleLogin} from '@react-oauth/google';

function GoogleLogin() {
    // This function will be called when the user clicks the login button
    const responseGoogle= async(authResult) => {
        try{
            if(authResult[code]){
                
            }
        }
        catch(error) {
            console.error('Login Error:', error);
        }
        login();
    };

    // Use the useGoogleLogin hook to handle the login process
    const googleLogin = useGoogleLogin({
        onSuccess: responseGoogle,
        onError: responseGoogle,
        flow: 'auth-code', // Use 'auth-code' for server-side flow
    });

    return (
      <div className="App">
        <button onClick={googleLogin}>
            Login With Google
        </button>
      </div>
    );
}   

export default GoogleLogin;