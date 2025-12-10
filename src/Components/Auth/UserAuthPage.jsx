import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { useSnackbar } from "notistack";
import { X, Mail, Lock, User, Eye, EyeOff, Sparkles, Shield, Zap } from "lucide-react";

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // FIELDS
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");

    const { loginWithEmail, registerUser } = useAuth();
    const { enqueueSnackbar } = useSnackbar();

    // 🚀 LOGIN FUNCTION
    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            enqueueSnackbar("Please fill all fields", { variant: "warning" });
            return;
        }

        const res = await loginWithEmail(email, password);

        if (res.success) {
            enqueueSnackbar("Login Successful!", { variant: "success" });
            // Reset form
            setEmail("");
            setPassword("");
        } else {
            enqueueSnackbar(res.error, { variant: "error" });
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        if (!fullName || !email || !password || !confirmPass) {
            enqueueSnackbar("Please fill all fields", { variant: "warning" });
            return;
        }

        if (password !== confirmPass) {
            enqueueSnackbar("Passwords do not match!", { variant: "error" });
            return;
        }

        if (password.length < 6) {
            enqueueSnackbar("Password must be at least 6 characters", { variant: "error" });
            return;
        }

        // Email validation - trim whitespace
        const trimmedEmail = email.trim().toLowerCase();
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(trimmedEmail)) {
            enqueueSnackbar("Please enter a valid email address", { variant: "error" });
            return;
        }

        const res = await registerUser(trimmedEmail, password, fullName);

        if (res.success) {
            enqueueSnackbar("Account Created Successfully!", { variant: "success" });
            // Reset form
            setFullName("");
            setEmail("");
            setPassword("");
            setConfirmPass("");
        } else {
            enqueueSnackbar(res.error || "Registration failed. Please try again.", { variant: "error" });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4 relative overflow-hidden">

            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-20 w-72 h-72 bg-[#ff6575] rounded-full opacity-20 blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#0f3069] rounded-full opacity-20 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-400 rounded-full opacity-10 blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            {/* MAIN CARD */}
            <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
                className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden relative z-10"
            >
                <div className="flex flex-col md:flex-row">
                    {/* LEFT SIDE - BRANDING */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="md:w-1/2 bg-gradient-to-br from-[#0f3069] via-[#1a4d8f] to-[#0f3069] text-white p-8 md:p-12 relative overflow-hidden"
                    >
                        {/* Animated Background Elements */}
                        <div className="absolute top-10 right-10 w-40 h-40 bg-[#ff6575] rounded-full opacity-20 blur-3xl animate-pulse"></div>
                        <div className="absolute bottom-10 left-10 w-60 h-60 bg-blue-400 rounded-full opacity-20 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

                        <div className="relative z-10 flex flex-col justify-center h-full min-h-[400px]">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                                className="mb-6"
                            >
                                <Sparkles className="h-16 w-16 text-[#ff6575] mb-4" />
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight"
                            >
                                {isLogin ? "Welcome Back!" : "Join Us Today"}
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="text-gray-200 text-lg mb-8"
                            >
                                {isLogin
                                    ? "Sign in to access your personalized dashboard and continue your learning journey."
                                    : "Create your account and unlock a world of knowledge and opportunities!"}
                            </motion.p>

                            {/* Features */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.7 }}
                                className="space-y-4"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                                        <Shield className="h-5 w-5 text-[#ff6575]" />
                                    </div>
                                    <span className="text-sm font-medium">Secure & Private</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                                        <Zap className="h-5 w-5 text-[#ff6575]" />
                                    </div>
                                    <span className="text-sm font-medium">Instant Access</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                                        <Sparkles className="h-5 w-5 text-[#ff6575]" />
                                    </div>
                                    <span className="text-sm font-medium">Premium Content</span>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* RIGHT SIDE - FORM */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="w-full md:w-1/2 p-6 md:p-12 bg-gradient-to-br from-gray-50 to-white"
                    >
                        {/* SWITCH BUTTONS */}
                        <div className="flex gap-2 mb-8 p-1 bg-gray-200 rounded-xl">
                            <button
                                onClick={() => setIsLogin(true)}
                                className={`flex-1 text-base md:text-lg font-bold transition-all px-4 py-3 rounded-lg ${isLogin
                                    ? "bg-gradient-to-r from-[#0f3069] to-[#1a4d8f] text-white shadow-lg"
                                    : "text-gray-600 hover:text-gray-800"
                                    }`}
                            >
                                Login
                            </button>

                            <button
                                onClick={() => setIsLogin(false)}
                                className={`flex-1 text-base md:text-lg font-bold transition-all px-4 py-3 rounded-lg ${!isLogin
                                    ? "bg-gradient-to-r from-[#ff6575] to-[#ff8591] text-white shadow-lg"
                                    : "text-gray-600 hover:text-gray-800"
                                    }`}
                            >
                                Sign Up
                            </button>
                        </div>

                        {/* LOGIN FORM */}
                        {isLogin && (
                            <motion.form
                                onSubmit={handleLogin}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4 }}
                                className="space-y-5"
                            >
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <input
                                            type="email"
                                            placeholder="Enter your email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full pl-11 pr-4 py-3 rounded-xl border-2 border-gray-300 focus:border-[#0f3069] focus:ring-4 focus:ring-[#0f3069]/20 outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Enter your password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full pl-11 pr-11 py-3 rounded-xl border-2 border-gray-300 focus:border-[#0f3069] focus:ring-4 focus:ring-[#0f3069]/20 outline-none transition-all"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        >
                                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                        </button>
                                    </div>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-[#0f3069] to-[#1a4d8f] hover:from-[#1a4d8f] hover:to-[#0f3069] py-3.5 rounded-xl text-white font-bold shadow-lg transition-all"
                                >
                                    Login to Account
                                </motion.button>
                            </motion.form>
                        )}

                        {/* SIGNUP FORM */}
                        {!isLogin && (
                            <motion.form
                                onSubmit={handleSignup}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4 }}
                                className="space-y-4"
                            >
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Full Name
                                    </label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <input
                                            type="text"
                                            placeholder="Enter your full name"
                                            value={fullName}
                                            onChange={(e) => setFullName(e.target.value)}
                                            className="w-full pl-11 pr-4 py-3 rounded-xl border-2 border-gray-300 focus:border-[#ff6575] focus:ring-4 focus:ring-[#ff6575]/20 outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <input
                                            type="email"
                                            placeholder="Enter your email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full pl-11 pr-4 py-3 rounded-xl border-2 border-gray-300 focus:border-[#ff6575] focus:ring-4 focus:ring-[#ff6575]/20 outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Create a password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full pl-11 pr-11 py-3 rounded-xl border-2 border-gray-300 focus:border-[#ff6575] focus:ring-4 focus:ring-[#ff6575]/20 outline-none transition-all"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        >
                                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Confirm Password
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            placeholder="Confirm your password"
                                            value={confirmPass}
                                            onChange={(e) => setConfirmPass(e.target.value)}
                                            className="w-full pl-11 pr-11 py-3 rounded-xl border-2 border-gray-300 focus:border-[#ff6575] focus:ring-4 focus:ring-[#ff6575]/20 outline-none transition-all"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        >
                                            {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                        </button>
                                    </div>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-[#ff6575] to-[#ff8591] hover:from-[#ff8591] hover:to-[#ff6575] py-3.5 rounded-xl text-white font-bold shadow-lg transition-all mt-6"
                                >
                                    Create Account
                                </motion.button>
                            </motion.form>
                        )}
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default AuthPage;