import React, { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { useSnackbar } from "notistack";

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);

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
        } else {
            enqueueSnackbar(res.error, { variant: "error" });
        }
    };

    // 🚀 SIGNUP FUNCTION
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

        const res = await registerUser(email, password);

        if (res.success) {
            enqueueSnackbar("Account Created Successfully!", { variant: "success" });
        } else {
            enqueueSnackbar(res.error, { variant: "error" });
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-[#0f3069] to-[#183b7a] px-4 py-6 relative overflow-hidden">

            {/* BACKGROUND EFFECTS */}
            <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-purple-500 opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-40 -right-20 w-96 h-96 rounded-full bg-pink-500 opacity-20 animate-pulse"></div>

            {/* MAIN CARD */}
            <motion.div
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="w-full max-w-7xl bg-white/20 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden flex flex-col md:flex-row border border-white/30 relative z-10"
            >

                {/* LEFT SIDE */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="hidden md:flex md:w-1/2 bg-gradient-to-br from-[#0f3069] to-[#0d2450] text-white flex-col justify-center items-center p-12 relative"
                >
                    <h1 className="text-5xl font-extrabold tracking-wide mb-4">
                        {isLogin ? "Welcome Back" : "Join Us"}
                    </h1>
                    <p className="text-gray-200 text-center text-lg">
                        {isLogin
                            ? "Sign in to access your personalised dashboard."
                            : "Create your account & start your learning journey!"}
                    </p>
                    <div className="mt-12 w-3/4 h-1 bg-gradient-to-r from-[#ff6575] to-transparent rounded-full animate-pulse"></div>
                </motion.div>

                {/* RIGHT FORM */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="w-full md:w-1/2 p-8 sm:p-12 flex flex-col justify-center"
                >

                    {/* SWITCH BUTTONS */}
                    <div className="flex justify-center gap-6 mb-10 bg-white/10 p-1 rounded-full">
                        <button
                            onClick={() => setIsLogin(true)}
                            className={`text-lg font-semibold transition-all px-6 py-2 rounded-full ${isLogin
                                ? "bg-gradient-to-r from-[#ff6575] to-[#ff6575] text-white shadow-lg"
                                : "text-white/70 hover:text-white"
                                }`}
                        >
                            Login
                        </button>

                        <button
                            onClick={() => setIsLogin(false)}
                            className={`text-lg font-semibold transition-all px-6 py-2 rounded-full ${!isLogin
                                ? "bg-gradient-to-r from-[#ff6575] to-[#ff6575] text-white shadow-lg"
                                : "text-white/70 hover:text-white"
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
                            <div className="relative">
                                <input
                                    type="email"
                                    placeholder=" "
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full p-4 rounded-xl border border-gray-200 bg-white/30 text-white focus:ring-2 focus:ring-[#ff6575]"
                                />
                                <label className="absolute left-4 top-3 text-white/70 text-sm">
                                    Email Address
                                </label>
                            </div>

                            <div className="relative">
                                <input
                                    type="password"
                                    placeholder=" "
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full p-4 rounded-xl border border-gray-200 bg-white/30 text-white focus:ring-2 focus:ring-[#ff6575]"
                                />
                                <label className="absolute left-4 top-3 text-white/70 text-sm">
                                    Password
                                </label>
                            </div>

                            <button className="w-full bg-gradient-to-r from-[#ff6575] to-[#ff6575] py-3 rounded-xl text-white font-bold shadow-lg hover:scale-105 transition-transform">
                                Login
                            </button>
                        </motion.form>
                    )}

                    {/* SIGNUP FORM */}
                    {!isLogin && (
                        <motion.form
                            onSubmit={handleSignup}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            className="space-y-5"
                        >
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder=" "
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    className="w-full p-4 rounded-xl border border-gray-200 bg-white/30 text-white focus:ring-2 focus:ring-[#ff6575]"
                                />
                                <label className="absolute left-4 top-3 text-white/70 text-sm">
                                    Full Name
                                </label>
                            </div>

                            <div className="relative">
                                <input
                                    type="email"
                                    placeholder=" "
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full p-4 rounded-xl border border-gray-200 bg-white/30 text-white focus:ring-2 focus:ring-[#ff6575]"
                                />
                                <label className="absolute left-4 top-3 text-white/70 text-sm">
                                    Email
                                </label>
                            </div>

                            <div className="relative">
                                <input
                                    type="password"
                                    placeholder=" "
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full p-4 rounded-xl border border-gray-200 bg-white/30 text-white focus:ring-2 focus:ring-[#ff6575]"
                                />
                                <label className="absolute left-4 top-3 text-white/70 text-sm">
                                    Password
                                </label>
                            </div>

                            <div className="relative">
                                <input
                                    type="password"
                                    placeholder=" "
                                    value={confirmPass}
                                    onChange={(e) => setConfirmPass(e.target.value)}
                                    className="w-full p-4 rounded-xl border border-gray-200 bg-white/30 text-white focus:ring-2 focus:ring-[#ff6575]"
                                />
                                <label className="absolute left-4 top-3 text-white/70 text-sm">
                                    Confirm Password
                                </label>
                            </div>

                            <button className="w-full bg-gradient-to-r from-[#ff6575] to-[#ff6575] py-3 rounded-xl text-white font-bold shadow-lg hover:scale-105 transition-transform">
                                Sign Up
                            </button>
                        </motion.form>
                    )}
                </motion.div>
            </motion.div>
        </div>
    );
};

export default AuthPage;
