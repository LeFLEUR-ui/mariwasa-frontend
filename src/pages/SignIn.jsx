import React, { useState } from 'react';

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
const [isExtracting, setIsExtracting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // para ma akses backend taena perwisyo
      const response = await fetch('http://localhost:8000/hr/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email, 
          password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Failed to sign in. Please check your credentials.');
      }

      localStorage.setItem('token', data.access_token);
      

      console.log("Login Success:", data);


    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-white via-[#fff5f7] to-[#ffeef2] font-['Inter',_sans-serif] antialiased">
 
      <a href="#" className="text-gray-500 hover:text-gray-800 text-[13px] flex items-center mb-8 transition-colors group">
        <i className="fa-solid fa-arrow-left mr-2 text-[10px] transition-transform group-hover:-translate-x-1"></i> 
        Back to Home
      </a>

      <div className="text-center mb-8">
        <div className="flex justify-center mb-5">
          <div className="w-12 h-12 flex items-center justify-center">
            <img src="src/assets/logo.png" alt="Logo" className="w-full h-full object-contain" />
          </div>
        </div>
        <h1 className="text-[28px] font-bold text-[#1a1a1a] mb-1 tracking-[-0.025em]">
          Welcome Back
        </h1>
        <p className="text-gray-500 text-[14px] font-normal">
          Sign in to access the Resume Analysis System
        </p>
      </div>

      <div className="bg-white rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] w-full max-w-[440px] p-10 border border-gray-50">
        <div className="flex items-center justify-center mb-2">
          <h2 className="text-[19px] font-bold text-[#1a1a1a] flex items-center tracking-[-0.025em]">
            <i className="fa-solid fa-right-to-bracket mr-2 text-[16px]"></i> Sign In
          </h2>
        </div>

        <p className="text-center text-[13px] leading-relaxed text-gray-500 mb-9 px-6">
          Enter your credentials - we'll automatically identify your account type
        </p>

        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-100 text-red-600 text-[12px] rounded-xl text-center font-medium animate-pulse">
            <i className="fa-solid fa-circle-exclamation mr-2"></i>{error}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-[13px] font-bold text-[#1a1a1a] mb-2">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email" 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-pink-50 focus:border-[#D60041] transition-all text-[14px] placeholder:text-gray-400 bg-white"
            />
          </div>

          <div>
            <label className="block text-[13px] font-bold text-[#1a1a1a] mb-2">Password</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password" 
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-pink-50 focus:border-[#D60041] transition-all text-[14px] placeholder:text-gray-400 bg-white"
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                <i className={`fa-regular ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-[14px]`}></i>
              </button>
            </div>
          </div>

          <div className="mt-2">
            <a href="#" className="text-[13px] font-semibold text-[#D60041] hover:text-[#b50037]">Forgot password?</a>
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#D60041] hover:bg-[#b50037] text-white font-semibold py-3.5 rounded-xl transition-all text-[15px] shadow-lg shadow-pink-100 mt-2 active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <i className="fa-solid fa-circle-notch animate-spin text-[18px]"></i>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <div className="mt-10 p-5 bg-[#fcfcfc] rounded-2xl border border-gray-100">
          <p className="text-[12px] text-gray-500 text-center leading-[1.6]">
            The system will automatically detect if you're an applicant or HR staff based on your credentials.
          </p>
        </div>


        <div className="mt-8 text-center">
          <p className="text-[14px] text-gray-600">
            Don't have an account? 
            <a href="#" className="text-[#D60041] font-bold hover:underline ml-1">Create Account</a>
          </p>
        </div>
      </div>


      <footer className="mt-12 text-center text-[11px] text-gray-400 space-y-1.5 font-medium">
        <p className="tracking-tight">&copy; 2025 Mariwasa Siam Ceramics Inc. All rights reserved.</p>
        <p className="opacity-80">Automated Resume Analysis System - Secure & Confidential</p>
      </footer>

    </div>
  );
};

export default SignIn;