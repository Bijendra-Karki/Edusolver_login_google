import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"


import PageNotFound from "./components/PageNotFound"
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google"
import LandingPage from "./components/home/LandingPage"
import MainAbout from "./components/about/MainAbout"
import Service from "./components/service/Service"
import ContactPage from "./components/Contact/ContactPage"
import LoginPage from "./components/auth/LoginPage"

import ExpertPanel from "./Export/ExpertPanel"
import ClientPanel from "./client/ClientPanel"
import AdminPanel from "./Admin/AdminPanel"

function App() {
  const GoogleAuthWrapper = () => {
    return (
      <GoogleOAuthProvider clientId="314824028312-1hh17m9aatjohq75fkdp7h268a13du5m.apps.googleusercontent.com">
        <GoogleLogin />
      </GoogleOAuthProvider>
    )
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/google-login" element={<GoogleAuthWrapper />} />
        <Route path="/clientPanel" element={<ClientPanel/>} />
        <Route path="/adminPanel" element={<AdminPanel />} />
        <Route path="/expertPanel" element={<ExpertPanel />} />
        <Route path="/about" element={<MainAbout />} />
        <Route path="/service" element={<Service />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
