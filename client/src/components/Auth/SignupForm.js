import React, { useState } from 'react';
import { Eye, EyeOff, User, Mail, Lock, Phone } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../apis/axios';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    otp: '',
  });

  const [step, setStep] = useState(1); // Step 1: Email → Send OTP, Step 2: Full Form
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'At least 6 characters';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Confirm your password';
    else if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.otp.trim()) newErrors.otp = 'OTP is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sendOtp = async (e) => {
    e.preventDefault();
    if (!formData.email.trim()) {
      setErrors({ email: 'Email is required' });
      return;
    }
    try {
      await axios.post('/send-otp', { email: formData.email });
      setMessage("OTP sent to your email");
      setStep(2);
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to send OTP");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const res = await axios.post('/signup', {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          otp: formData.otp,
        });
        alert("Signup successful");
        navigate('/login');
      } catch (err) {
        alert(err.response?.data?.message || "Signup failed");
      }
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-blue-100">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Join PulseGuard</h1>
            <p className="text-gray-600">Create your account to get started</p>
            {message && <p className="text-blue-600 mt-2 text-sm">{message}</p>}
          </div>

          <form onSubmit={step === 1 ? sendOtp : handleSubmit} className="space-y-5">
            {/* Email (Always visible) */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full pl-11 pr-4 py-3 border-2 rounded-xl ${
                    errors.email ? 'border-red-300 bg-red-50' : 'border-gray-200'
                  }`}
                  placeholder="Enter your email"
                  disabled={step === 2}
                />
              </div>
              {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
            </div>

            {step === 2 && (
              <>
                {/* OTP */}
                <div>
                  <label htmlFor="otp" className="block text-sm font-semibold text-gray-700 mb-2">OTP</label>
                  <div className="relative">
                    <input
                      id="otp"
                      name="otp"
                      type="text"
                      value={formData.otp}
                      onChange={handleInputChange}
                      className={`w-full pl-4 pr-4 py-3 border-2 rounded-xl ${
                        errors.otp ? 'border-red-300 bg-red-50' : 'border-gray-200'
                      }`}
                      placeholder="Enter OTP from email"
                    />
                  </div>
                  {errors.otp && <p className="text-sm text-red-600">{errors.otp}</p>}
                </div>

                {/* Full Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full pl-11 pr-4 py-3 border-2 rounded-xl ${
                        errors.name ? 'border-red-300 bg-red-50' : 'border-gray-200'
                      }`}
                      placeholder="Enter your full name"
                    />
                  </div>
                  {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
                </div>

                {/* Phone (Optional) */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full pl-11 pr-4 py-3 border-2 rounded-xl ${
                        errors.phone ? 'border-red-300 bg-red-50' : 'border-gray-200'
                      }`}
                      placeholder="Enter your phone number"
                    />
                  </div>
                  {errors.phone && <p className="text-sm text-red-600">{errors.phone}</p>}
                </div>

                {/* Password */}
                <div>
                  <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleInputChange}
                      className={`w-full pl-11 pr-12 py-3 border-2 rounded-xl ${
                        errors.password ? 'border-red-300 bg-red-50' : 'border-gray-200'
                      }`}
                      placeholder="Create password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    >
                      {showPassword ? <EyeOff /> : <Eye />}
                    </button>
                  </div>
                  {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
                </div>

                {/* Confirm Password */}
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className={`w-full pl-11 pr-12 py-3 border-2 rounded-xl ${
                        errors.confirmPassword ? 'border-red-300 bg-red-50' : 'border-gray-200'
                      }`}
                      placeholder="Confirm password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    >
                      {showConfirmPassword ? <EyeOff /> : <Eye />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="text-sm text-red-600">{errors.confirmPassword}</p>}
                </div>
              </>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-xl font-semibold mt-4"
            >
              {step === 1 ? "Send OTP" : "Create Account"}
            </button>

            {/* Login Link */}
            <div className="text-center pt-4 border-t border-gray-100">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-blue-600 font-semibold hover:underline">
                  Sign In
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
