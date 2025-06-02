import { useState } from 'react'
import './App.css'
import {BrowserRouter,Routes,Route,Navigate}from 'react-router-dom'
import GoogleLogin from './GoogleLogin'
import Dashboard from './Dashboard'
import PageNotFound from './PageNotFound'
import {GoogleOAuthProvider} from '@react-oauth/google'

function App() {
  const GoogleAuthWrapper = () => {
  return (
    <GoogleOAuthProvider clientId="314824028312-1hh17m9aatjohq75fkdp7h268a13du5m.apps.googleusercontent.com">
      <GoogleLogin />
    </GoogleOAuthProvider>
  );
};

  
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<GoogleAuthWrapper />} />
				<Route path="/" element={<Navigate to="/login" />} />
				<Route path='/dashboard'  element={<Dashboard/>}/>
				<Route path="*" element={<PageNotFound/>} />

     
    </Routes>
    </BrowserRouter>
  )
}

export default App
