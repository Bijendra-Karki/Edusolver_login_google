"use client"

import { useState, useEffect } from "react"
import { Eye, EyeOff, User, Mail, Lock, CheckCircle, ArrowLeft, Sparkles, Shield, X } from "lucide-react"
import boyCharacter from "../../assets/Img/boy.gif"
import "./LoginPage.css"

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Sign-up form data
  const [signUpData, setSignUpData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  // Sign-in form data
  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  const togglePasswordVisibility = () => setShowPassword(!showPassword)
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword)

  const handleSignUpChange = (e) => {
    const { name, value } = e.target
    setSignUpData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSignInChange = (e) => {
    const { name, value } = e.target
    setSignInData((prev) => ({ ...prev, [name]: value }))
  }

  const validateSignUp = () => {
    if (!signUpData.fullName.trim()) {
      setError("Full name is required")
      return false
    }
    if (!signUpData.email.trim()) {
      setError("Email is required")
      return false
    }
    if (!signUpData.email.includes("@")) {
      setError("Please enter a valid email address")
      return false
    }
    if (!signUpData.password) {
      setError("Password is required")
      return false
    }
    if (signUpData.password.length < 6) {
      setError("Password must be at least 6 characters long")
      return false
    }
    if (signUpData.password !== signUpData.confirmPassword) {
      setError("Passwords do not match")
      return false
    }
    return true
  }

  const validateSignIn = () => {
    if (!signInData.username || !signInData.password) {
      setError("Please enter both username and password")
      return false
    }
    return true
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setSuccess("")

    const isValid = isSignUp ? validateSignUp() : validateSignIn()
    if (!isValid) {
      setIsLoading(false)
      return
    }

    setTimeout(() => {
      setIsLoading(false)
      setSuccess(`${isSignUp ? "Account created" : "Login"} successful! Redirecting...`)
    }, 2000)
  }

  const handleGoogleAuth = () => {
    setIsLoading(true)
    setError("")

    setTimeout(() => {
      setIsLoading(false)
      setSuccess(`Google ${isSignUp ? "sign-up" : "sign-in"} successful! Redirecting...`)
    }, 1500)
  }

  const switchToSignIn = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      setIsSignUp(false)
      setError("")
      setSuccess("")
      setShowPassword(false)
      setShowConfirmPassword(false)
      setIsTransitioning(false)
    }, 100)
  }

  const switchToSignUp = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      setIsSignUp(true)
      setError("")
      setSuccess("")
      setShowPassword(false)
      setIsTransitioning(false)
    }, 100)
  }

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 via-purple-600 to-blue-900">
        <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
      </div>
    )
  }

  const inputFields = [
    {
      name: "fullName",
      type: "text",
      placeholder: "Full Name",
      icon: User,
      value: signUpData.fullName,
    },
    {
      name: "email",
      type: "email",
      placeholder: "Email Address",
      icon: Mail,
      value: signUpData.email,
    },
    {
      name: "password",
      type: showPassword ? "text" : "password",
      placeholder: "Password",
      icon: Lock,
      value: signUpData.password,
      hasToggle: true,
      toggle: togglePasswordVisibility,
      showPassword,
    },
    {
      name: "confirmPassword",
      type: showConfirmPassword ? "text" : "password",
      placeholder: "Confirm Password",
      icon: Lock,
      value: signUpData.confirmPassword,
      hasToggle: true,
      toggle: toggleConfirmPasswordVisibility,
      showPassword: showConfirmPassword,
    },
  ]

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-purple-500 via-purple-600 to-blue-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-400/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Mobile-only form container */}
      <div className="md:hidden flex bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl overflow-hidden max-w-md w-full min-h-[600px] relative shadow-[0_8px_32px_rgba(0,0,0,0.12),0_2px_16px_rgba(0,0,0,0.08),0_0_0_1px_rgba(255,255,255,0.05)]">
        {/* Mobile form content */}
        <div className="w-full p-6 flex flex-col relative overflow-hidden">
          {/* Close button */}
          <div className="flex justify-end items-center mb-6 relative z-20 flex-shrink-0">
            <button className="text-white/70 hover:text-white transform hover:scale-125 transition-all duration-300 hover:rotate-90 p-1 rounded-full hover:bg-white/10">
              <X size={24} />
            </button>
          </div>

          {/* Mobile Forms Container */}
          <div className="relative w-full flex-1 overflow-hidden">
            {/* Mobile Sign-Up Form */}
            <div
              className={`absolute inset-0 transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                isSignUp
                  ? "translate-x-0 opacity-100 scale-100"
                  : "translate-x-full opacity-0 scale-95 pointer-events-none"
              } ${isTransitioning ? "blur-sm" : ""}`}
            >
              <div className="h-full overflow-y-auto custom-scrollbar">
                <div className="flex flex-col justify-start w-full py-4 px-2">
                  {/* Header */}
                  <div className="text-center mb-6 flex-shrink-0">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
                      <h1 className="text-3xl font-bold text-white">
                        Join Edu<span className="text-blue-400">Solver</span>
                      </h1>
                      <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse delay-300" />
                    </div>
                    <p className="text-white/70 text-sm">Create your account and start learning</p>
                  </div>

                  {/* Messages */}
                  {error && isSignUp && (
                    <div className="mb-4 p-3 bg-red-500/20 backdrop-blur-sm border border-red-400/30 text-red-200 rounded-xl text-sm animate-in slide-in-from-top-2 duration-300 flex items-center gap-2 flex-shrink-0">
                      <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse flex-shrink-0"></div>
                      <span className="break-words">{error}</span>
                    </div>
                  )}

                  {success && isSignUp && (
                    <div className="mb-4 p-3 bg-green-500/20 backdrop-blur-sm border border-green-400/30 text-green-200 rounded-xl text-sm flex items-center gap-2 animate-in slide-in-from-top-2 duration-300 flex-shrink-0">
                      <CheckCircle size={16} className="animate-pulse flex-shrink-0" />
                      <span className="break-words">{success}</span>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="flex flex-col gap-4 flex-shrink-0">
                    {/* Input Fields */}
                    {inputFields.map((field, index) => (
                      <div key={field.name} className="relative group/input">
                        <field.icon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5 transition-all duration-300 group-focus-within/input:text-white/70 group-focus-within/input:scale-110 z-10" />
                        <input
                          type={field.type}
                          name={field.name}
                          placeholder={field.placeholder}
                          value={field.value}
                          onChange={handleSignUpChange}
                          disabled={isLoading}
                          className="w-full pl-12 pr-12 py-4 border-2 border-white/20 rounded-xl text-white bg-white/10 backdrop-blur-sm transition-all duration-300 outline-none text-base focus:border-white/40 focus:bg-white/20 focus:ring-4 focus:ring-white/10 focus:scale-[1.02] placeholder-white/50 disabled:opacity-50 disabled:cursor-not-allowed hover:border-white/30 hover:bg-white/15 hover:shadow-lg relative z-0"
                        />
                        {field.hasToggle && (
                          <button
                            type="button"
                            onClick={field.toggle}
                            disabled={isLoading}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white p-1 rounded transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110 hover:bg-white/10 z-10"
                          >
                            {field.showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        )}
                      </div>
                    ))}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-green-500/80 to-emerald-600/80 backdrop-blur-sm text-white border-none py-4 rounded-xl text-base font-semibold cursor-pointer transition-all duration-500 shadow-lg hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(34,197,94,0.3)] hover:from-green-500 hover:to-emerald-600 hover:scale-[1.02] active:translate-y-0 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/0 before:via-white/20 before:to-white/0 before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700"
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Creating Account...</span>
                        </div>
                      ) : (
                        <>
                          <Sparkles className="w-5 h-5 mr-2 animate-pulse" />
                          Create Account
                        </>
                      )}
                    </button>
                  </form>

                  {/* Switch Button */}
                  <div className="mt-4 flex-shrink-0">
                    <button
                      onClick={switchToSignIn}
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-blue-500/80 to-indigo-600/80 backdrop-blur-sm text-white border-none py-4 rounded-xl text-base font-semibold cursor-pointer transition-all duration-500 shadow-lg hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(59,130,246,0.3)] hover:from-blue-500 hover:to-indigo-600 hover:scale-[1.02] active:translate-y-0 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/0 before:via-white/20 before:to-white/0 before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700"
                    >
                      Already have an account? Sign In
                    </button>
                  </div>

                  {/* Social Section */}
                  <div className="mt-4 flex-shrink-0">
                    <p className="text-center text-white/70 text-sm mb-4 relative">
                      <span className="bg-transparent px-4 relative z-10">Or sign up with</span>
                      <span className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-white/20"></span>
                      </span>
                    </p>
                    <div className="flex gap-4 justify-center">
                      <button
                        onClick={handleGoogleAuth}
                        disabled={isLoading}
                        title="Sign up with Google"
                        className="w-14 h-14 border-2 border-white/20 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center cursor-pointer transition-all duration-500 hover:border-white/30 hover:-translate-y-1 hover:shadow-lg hover:bg-white/20 hover:scale-110 hover:rotate-3 active:scale-95 active:rotate-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group/social"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover/social:translate-x-[100%] transition-transform duration-700"></div>
                        <svg width="20" height="20" viewBox="0 0 24 24" className="relative z-10">
                          <path
                            fill="#4285F4"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          />
                          <path
                            fill="#34A853"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          />
                          <path
                            fill="#FBBC05"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          />
                          <path
                            fill="#EA4335"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Sign-In Form */}
            <div
              className={`absolute inset-0 transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                !isSignUp
                  ? "translate-x-0 opacity-100 scale-100"
                  : "-translate-x-full opacity-0 scale-95 pointer-events-none"
              } ${isTransitioning ? "blur-sm" : ""}`}
            >
              <div className="h-full overflow-y-auto custom-scrollbar">
                <div className="flex flex-col justify-start w-full py-4 px-2">
                  {/* Back Button */}
                  <div className="mb-4 flex-shrink-0">
                    <button
                      onClick={switchToSignUp}
                      className="text-white/70 hover:text-white text-sm transition-all duration-300 hover:scale-105 flex items-center gap-2 group/back"
                    >
                      <ArrowLeft size={16} className="transition-transform group-hover/back:-translate-x-1" />
                      Back to Sign Up
                    </button>
                  </div>

                  {/* Header */}
                  <div className="text-center mb-6 flex-shrink-0">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Shield className="w-6 h-6 text-blue-400 animate-pulse" />
                      <h1 className="text-3xl font-bold text-white">
                        Welcome Back to Edu<span className="text-blue-400">Solver</span>
                      </h1>
                    </div>
                    <p className="text-white/70 text-sm">Sign in to continue your learning journey</p>
                  </div>

                  {/* Messages */}
                  {error && !isSignUp && (
                    <div className="mb-4 p-3 bg-red-500/20 backdrop-blur-sm border border-red-400/30 text-red-200 rounded-xl text-sm animate-in slide-in-from-top-2 duration-300 flex items-center gap-2 flex-shrink-0">
                      <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse flex-shrink-0"></div>
                      <span className="break-words">{error}</span>
                    </div>
                  )}

                  {success && !isSignUp && (
                    <div className="mb-4 p-3 bg-green-500/20 backdrop-blur-sm border border-green-400/30 text-green-200 rounded-xl text-sm flex items-center gap-2 animate-in slide-in-from-top-2 duration-300 flex-shrink-0">
                      <CheckCircle size={16} className="animate-pulse flex-shrink-0" />
                      <span className="break-words">{success}</span>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="flex flex-col gap-4 flex-shrink-0">
                    {/* Input Fields */}
                    <div className="relative group/input">
                      <input
                        type="text"
                        name="username"
                        placeholder="Enter username or email"
                        value={signInData.username}
                        onChange={handleSignInChange}
                        disabled={isLoading}
                        className="w-full px-5 py-4 border-2 border-white/20 rounded-xl text-white bg-white/10 backdrop-blur-sm transition-all duration-300 outline-none text-base focus:border-white/40 focus:bg-white/20 focus:ring-4 focus:ring-white/10 focus:scale-[1.02] placeholder-white/50 disabled:opacity-50 disabled:cursor-not-allowed hover:border-white/30 hover:bg-white/15 hover:shadow-lg"
                      />
                    </div>

                    <div className="relative group/input">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        value={signInData.password}
                        onChange={handleSignInChange}
                        disabled={isLoading}
                        className="w-full px-5 py-4 pr-12 border-2 border-white/20 rounded-xl text-white bg-white/10 backdrop-blur-sm transition-all duration-300 outline-none text-base focus:border-white/40 focus:bg-white/20 focus:ring-4 focus:ring-white/10 focus:scale-[1.02] placeholder-white/50 disabled:opacity-50 disabled:cursor-not-allowed hover:border-white/30 hover:bg-white/15 hover:shadow-lg"
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        disabled={isLoading}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white p-1 rounded transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110 hover:bg-white/10 z-10"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>

                    <div className="flex justify-end -mt-1 mb-2 flex-shrink-0">
                      <button
                        type="button"
                        className="text-white/70 text-sm hover:text-white transition-all duration-300 hover:scale-105 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
                      >
                        Recovery Password
                      </button>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-blue-500/80 to-indigo-600/80 backdrop-blur-sm text-white border-none py-4 rounded-xl text-base font-semibold cursor-pointer transition-all duration-500 shadow-lg hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(59,130,246,0.3)] hover:from-blue-500 hover:to-indigo-600 hover:scale-[1.02] active:translate-y-0 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/0 before:via-white/20 before:to-white/0 before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700"
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Signing In...</span>
                        </div>
                      ) : (
                        <>
                          <Shield className="w-5 h-5 mr-2" />
                          Sign In
                        </>
                      )}
                    </button>
                  </form>

                  {/* Social Section */}
                  <div className="mt-6 flex-shrink-0">
                    <p className="text-center text-white/70 text-sm mb-4 relative">
                      <span className="bg-transparent px-4 relative z-10">Or continue with</span>
                      <span className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-white/20"></span>
                      </span>
                    </p>
                    <div className="flex gap-4 justify-center">
                      <button
                        onClick={handleGoogleAuth}
                        disabled={isLoading}
                        title="Sign in with Google"
                        className="w-14 h-14 border-2 border-white/20 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center cursor-pointer transition-all duration-500 hover:border-white/30 hover:-translate-y-1 hover:shadow-lg hover:bg-white/20 hover:scale-110 hover:rotate-3 active:scale-95 active:rotate-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group/social"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover/social:translate-x-[100%] transition-transform duration-700"></div>
                        <svg width="20" height="20" viewBox="0 0 24 24" className="relative z-10">
                          <path
                            fill="#4285F4"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          />
                          <path
                            fill="#34A853"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          />
                          <path
                            fill="#FBBC05"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          />
                          <path
                            fill="#EA4335"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl overflow-hidden max-w-5xl w-full h-[550px] relative group shadow-[0_8px_32px_rgba(0,0,0,0.12),0_2px_16px_rgba(0,0,0,0.08),0_0_0_1px_rgba(255,255,255,0.05)] hover:shadow-[0_32px_64px_rgba(0,0,0,0.25),0_16px_32px_rgba(0,0,0,0.15),0_0_0_1px_rgba(255,255,255,0.1)] transform transition-all duration-1000 ease-out hover:scale-[1.01] hover:-translate-y-1 md:flex hidden">
        {/* Left side with illustration */}
        <div className="hidden md:flex flex-1 bg-gradient-to-br from-purple-500/20 via-purple-600/15 to-blue-900/20 backdrop-blur-sm items-center justify-center p-6 relative overflow-hidden">
          {/* Floating Elements */}
          <div className="absolute top-8 left-8 w-2 h-2 bg-white/30 rounded-full animate-ping"></div>
          <div className="absolute top-12 right-12 w-1 h-1 bg-blue-300/50 rounded-full animate-pulse delay-300"></div>
          <div className="absolute bottom-10 left-12 w-1.5 h-1.5 bg-purple-300/40 rounded-full animate-pulse delay-700"></div>

          <div className="flex items-center justify-center w-full h-full transform scale-110 transition-transform duration-1000 group-hover:scale-115 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-purple-500/10 to-transparent rounded-full blur-2xl"></div>
            <img
              src={boyCharacter || "/placeholder.svg"}
              alt="EduSolver Character"
              className="max-w-full max-h-full object-contain drop-shadow-2xl transition-all duration-1000 group-hover:drop-shadow-[0_25px_50px_rgba(0,0,0,0.4)] relative z-10"
              style={{ width: "300px", height: "300px" }}
            />
          </div>
        </div>

        {/* Right side with forms */}
        <div className="flex-1 w-full p-6 flex flex-col relative overflow-hidden">
          {/* Close button */}
          <div className="flex justify-end items-center mb-4 relative z-20 flex-shrink-0">
            <button className="text-white/70 hover:text-white transform hover:scale-125 transition-all duration-300 hover:rotate-90 p-1 rounded-full hover:bg-white/10">
              <X size={24} />
            </button>
          </div>

          {/* Forms Container with Enhanced Animation - Scrollable */}
          <div className="relative w-full flex-1 overflow-hidden">
            {/* Sign-Up Form */}
            <div
              className={`absolute inset-0 transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                isSignUp
                  ? "translate-x-0 opacity-100 scale-100"
                  : "translate-x-full opacity-0 scale-95 pointer-events-none"
              } ${isTransitioning ? "blur-sm" : ""}`}
            >
              <div className="h-full overflow-y-auto custom-scrollbar">
                <div className="flex flex-col justify-start max-w-sm mx-auto w-full py-3 px-2">
                  {/* Header */}
                  <div className="text-center mb-4 flex-shrink-0">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
                      <h1 className="text-2xl font-bold text-white">
                        Join Edu<span className="text-blue-400">Solver</span>
                      </h1>
                      <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse delay-300" />
                    </div>
                    <p className="text-white/70 text-xs">Create your account and start learning</p>
                  </div>

                  {/* Messages */}
                  {error && isSignUp && (
                    <div className="mb-4 p-3 bg-red-500/20 backdrop-blur-sm border border-red-400/30 text-red-200 rounded-xl text-sm animate-in slide-in-from-top-2 duration-300 flex items-center gap-2 flex-shrink-0">
                      <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse flex-shrink-0"></div>
                      <span className="break-words">{error}</span>
                    </div>
                  )}

                  {success && isSignUp && (
                    <div className="mb-4 p-3 bg-green-500/20 backdrop-blur-sm border border-green-400/30 text-green-200 rounded-xl text-sm flex items-center gap-2 animate-in slide-in-from-top-2 duration-300 flex-shrink-0">
                      <CheckCircle size={16} className="animate-pulse flex-shrink-0" />
                      <span className="break-words">{success}</span>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="flex flex-col gap-3 flex-shrink-0">
                    {/* Input Fields */}
                    {inputFields.map((field, index) => (
                      <div key={field.name} className="relative group/input">
                        <field.icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4 transition-all duration-300 group-focus-within/input:text-white/70 group-focus-within/input:scale-110 z-10" />
                        <input
                          type={field.type}
                          name={field.name}
                          placeholder={field.placeholder}
                          value={field.value}
                          onChange={handleSignUpChange}
                          disabled={isLoading}
                          className="w-full pl-10 pr-10 py-3 border-2 border-white/20 rounded-xl text-white bg-white/10 backdrop-blur-sm transition-all duration-300 outline-none text-sm focus:border-white/40 focus:bg-white/20 focus:ring-4 focus:ring-white/10 focus:scale-[1.02] placeholder-white/50 disabled:opacity-50 disabled:cursor-not-allowed hover:border-white/30 hover:bg-white/15 hover:shadow-lg relative z-0"
                        />
                        {field.hasToggle && (
                          <button
                            type="button"
                            onClick={field.toggle}
                            disabled={isLoading}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white p-1 rounded transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110 hover:bg-white/10 z-10"
                          >
                            {field.showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        )}
                      </div>
                    ))}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-green-500/80 to-emerald-600/80 backdrop-blur-sm text-white border-none py-3 rounded-xl text-sm font-semibold cursor-pointer transition-all duration-500 shadow-lg hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(34,197,94,0.3)] hover:from-green-500 hover:to-emerald-600 hover:scale-[1.02] active:translate-y-0 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/0 before:via-white/20 before:to-white/0 before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700"
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Creating Account...</span>
                        </div>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
                          Create Account
                        </>
                      )}
                    </button>
                  </form>

                  {/* Switch Button */}
                  <div className="mt-3 flex-shrink-0">
                    <button
                      onClick={switchToSignIn}
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-blue-500/80 to-indigo-600/80 backdrop-blur-sm text-white border-none py-3 rounded-xl text-sm font-semibold cursor-pointer transition-all duration-500 shadow-lg hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(59,130,246,0.3)] hover:from-blue-500 hover:to-indigo-600 hover:scale-[1.02] active:translate-y-0 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/0 before:via-white/20 before:to-white/0 before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700"
                    >
                      Already have an account? Sign In
                    </button>
                  </div>

                  {/* Social Section */}
                  <div className="mt-3 flex-shrink-0">
                    <p className="text-center text-white/70 text-xs mb-3 relative">
                      <span className="bg-transparent px-4 relative z-10">Or sign up with</span>
                      <span className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-white/20"></span>
                      </span>
                    </p>
                    <div className="flex gap-4 justify-center">
                      <button
                        onClick={handleGoogleAuth}
                        disabled={isLoading}
                        title="Sign up with Google"
                        className="w-12 h-12 border-2 border-white/20 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center cursor-pointer transition-all duration-500 hover:border-white/30 hover:-translate-y-1 hover:shadow-lg hover:bg-white/20 hover:scale-110 hover:rotate-3 active:scale-95 active:rotate-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group/social"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover/social:translate-x-[100%] transition-transform duration-700"></div>
                        <svg width="18" height="18" viewBox="0 0 24 24" className="relative z-10">
                          <path
                            fill="#4285F4"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          />
                          <path
                            fill="#34A853"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          />
                          <path
                            fill="#FBBC05"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          />
                          <path
                            fill="#EA4335"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sign-In Form */}
            <div
              className={`absolute inset-0 transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                !isSignUp
                  ? "translate-x-0 opacity-100 scale-100"
                  : "-translate-x-full opacity-0 scale-95 pointer-events-none"
              } ${isTransitioning ? "blur-sm" : ""}`}
            >
              <div className="h-full overflow-y-auto custom-scrollbar">
                <div className="flex flex-col justify-start max-w-sm mx-auto w-full py-3 px-2">
                  {/* Back Button */}
                  <div className="mb-4 flex-shrink-0">
                    <button
                      onClick={switchToSignUp}
                      className="text-white/70 hover:text-white text-sm transition-all duration-300 hover:scale-105 flex items-center gap-2 group/back"
                    >
                      <ArrowLeft size={16} className="transition-transform group-hover/back:-translate-x-1" />
                      Back to Sign Up
                    </button>
                  </div>

                  {/* Header */}
                  <div className="text-center mb-4 flex-shrink-0">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <Shield className="w-5 h-5 text-blue-400 animate-pulse" />
                      <h1 className="text-2xl font-bold text-white">
                        Welcome Back to Edu<span className="text-blue-400">Solver</span>
                      </h1>
                    </div>
                    <p className="text-white/70 text-xs">Sign in to continue your learning journey</p>
                  </div>

                  {/* Messages */}
                  {error && !isSignUp && (
                    <div className="mb-4 p-3 bg-red-500/20 backdrop-blur-sm border border-red-400/30 text-red-200 rounded-xl text-sm animate-in slide-in-from-top-2 duration-300 flex items-center gap-2 flex-shrink-0">
                      <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse flex-shrink-0"></div>
                      <span className="break-words">{error}</span>
                    </div>
                  )}

                  {success && !isSignUp && (
                    <div className="mb-4 p-3 bg-green-500/20 backdrop-blur-sm border border-green-400/30 text-green-200 rounded-xl text-sm flex items-center gap-2 animate-in slide-in-from-top-2 duration-300 flex-shrink-0">
                      <CheckCircle size={16} className="animate-pulse flex-shrink-0" />
                      <span className="break-words">{success}</span>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="flex flex-col gap-3 flex-shrink-0">
                    {/* Input Fields */}
                    <div className="relative group/input">
                      <input
                        type="text"
                        name="username"
                        placeholder="Enter username or email"
                        value={signInData.username}
                        onChange={handleSignInChange}
                        disabled={isLoading}
                        className="w-full px-4 py-3 border-2 border-white/20 rounded-xl text-white bg-white/10 backdrop-blur-sm transition-all duration-300 outline-none text-sm focus:border-white/40 focus:bg-white/20 focus:ring-4 focus:ring-white/10 focus:scale-[1.02] placeholder-white/50 disabled:opacity-50 disabled:cursor-not-allowed hover:border-white/30 hover:bg-white/15 hover:shadow-lg"
                      />
                    </div>

                    <div className="relative group/input">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        value={signInData.password}
                        onChange={handleSignInChange}
                        disabled={isLoading}
                        className="w-full px-4 py-3 pr-10 border-2 border-white/20 rounded-xl text-white bg-white/10 backdrop-blur-sm transition-all duration-300 outline-none text-sm focus:border-white/40 focus:bg-white/20 focus:ring-4 focus:ring-white/10 focus:scale-[1.02] placeholder-white/50 disabled:opacity-50 disabled:cursor-not-allowed hover:border-white/30 hover:bg-white/15 hover:shadow-lg"
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        disabled={isLoading}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white p-1 rounded transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110 hover:bg-white/10 z-10"
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>

                    <div className="flex justify-end -mt-1 mb-2 flex-shrink-0">
                      <button
                        type="button"
                        className="text-white/70 text-sm hover:text-white transition-all duration-300 hover:scale-105 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
                      >
                        Recovery Password
                      </button>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-blue-500/80 to-indigo-600/80 backdrop-blur-sm text-white border-none py-3 rounded-xl text-sm font-semibold cursor-pointer transition-all duration-500 shadow-lg hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(59,130,246,0.3)] hover:from-blue-500 hover:to-indigo-600 hover:scale-[1.02] active:translate-y-0 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/0 before:via-white/20 before:to-white/0 before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700"
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Signing In...</span>
                        </div>
                      ) : (
                        <>
                          <Shield className="w-4 h-4 mr-2" />
                          Sign In
                        </>
                      )}
                    </button>
                  </form>

                  {/* Social Section */}
                  <div className="mt-3 flex-shrink-0">
                    <p className="text-center text-white/70 text-xs mb-3 relative">
                      <span className="bg-transparent px-4 relative z-10">Or continue with</span>
                      <span className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-white/20"></span>
                      </span>
                    </p>
                    <div className="flex gap-4 justify-center">
                      <button
                        onClick={handleGoogleAuth}
                        disabled={isLoading}
                        title="Sign in with Google"
                        className="w-12 h-12 border-2 border-white/20 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center cursor-pointer transition-all duration-500 hover:border-white/30 hover:-translate-y-1 hover:shadow-lg hover:bg-white/20 hover:scale-110 hover:rotate-3 active:scale-95 active:rotate-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group/social"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover/social:translate-x-[100%] transition-transform duration-700"></div>
                        <svg width="18" height="18" viewBox="0 0 24 24" className="relative z-10">
                          <path
                            fill="#4285F4"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          />
                          <path
                            fill="#34A853"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          />
                          <path
                            fill="#FBBC05"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          />
                          <path
                            fill="#EA4335"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}