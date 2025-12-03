import React, { useState } from "react";
import { motion } from "framer-motion";

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-3xl bg-white shadow-xl rounded-xl overflow-hidden flex flex-col md:flex-row"
            >
                {/* LEFT SIDE / SLIDER PANEL */}
                <motion.div
                    initial={{ x: 0 }}
                    animate={{ x: isLogin ? 0 : "-100%" }}
                    transition={{ duration: 0.5 }}
                    className="relative w-full md:w-1/2 h-56 md:h-auto flex items-center justify-center bg-[#0f3069] text-white font-bold text-2xl p-6"
                >
                    {isLogin ? "Welcome Back!" : "Create Your Account"}

                    {/* OVERLAY TEXT CHANGE ANIMATION */}
                    <motion.div
                        key={isLogin ? "login" : "signup"}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="absolute bottom-6 text-sm text-gray-200"
                    >
                        {isLogin
                            ? "Sign in to continue your journey"
                            : "Sign up to get started"}
                    </motion.div>
                </motion.div>

                {/* RIGHT SIDE - FORMS */}
                <motion.div
                    className="w-full md:w-1/2 p-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex justify-center mb-6">
                        <button
                            onClick={() => setIsLogin(true)}
                            className={`px-4 py-2 ${isLogin
                                    ? "border-b-2 border-[#ff6575] text-[#ff6575]"
                                    : "text-gray-500"
                                }`}
                        >
                            Login
                        </button>
                        <button
                            onClick={() => setIsLogin(false)}
                            className={`px-4 py-2 ${!isLogin
                                    ? "border-b-2 border-[#ff6575] text-[#ff6575]"
                                    : "text-gray-500"
                                }`}
                        >
                            Sign Up
                        </button>
                    </div>

                    {/* LOGIN FORM */}
                    {isLogin && (
                        <motion.form
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4 }}
                            className="space-y-4"
                        >
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full border p-3 rounded-md"
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full border p-3 rounded-md"
                            />
                            <button className="w-full bg-[#ff6575] text-white py-3 rounded-md mt-2">
                                Login
                            </button>
                        </motion.form>
                    )}

                    {/* SIGNUP FORM */}
                    {!isLogin && (
                        <motion.form
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4 }}
                            className="space-y-4"
                        >
                            <input
                                type="text"
                                placeholder="Full Name"
                                className="w-full border p-3 rounded-md"
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full border p-3 rounded-md"
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full border p-3 rounded-md"
                            />
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                className="w-full border p-3 rounded-md"
                            />
                            <button className="w-full bg-[#ff6575] text-white py-3 rounded-md mt-2">
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
