import { useState } from 'react'
import './App.css'
import {BrowserRouter,Routes,Route,Navigate}from 'react-router-dom'
import GoogleLogin from './components/GoogleLogin'
import Dashboard from './components/Dashboard'
import PageNotFound from './components/PageNotFound'
import {GoogleOAuthProvider} from '@react-oauth/google'
import LandingPage from './components/LandingPage'
import MainAbout from './components/MainAbout'


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
  <Route path="/" element={<LandingPage/>} /> 
  <Route path="/login" element={<GoogleAuthWrapper />} />
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/about" element={<MainAbout/>} />
  <Route path="*" element={<PageNotFound />} />
  </Routes>
  </BrowserRouter>



    
  )
}

export default App
