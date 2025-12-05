import React, { useState } from "react";
import { motion } from "framer-motion";

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-[#0f3069] to-[#183b7a] px-4 py-6">
            
            {/* MAIN CARD */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-4xl bg-white/90 backdrop-blur-lg shadow-2xl rounded-2xl overflow-hidden flex flex-col md:flex-row border border-white/40"
            >

                {/* LEFT: IMAGE / BRAND PANEL */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="hidden md:flex md:w-1/2 bg-[#0f3069] text-white flex-col justify-center items-center p-10"
                >
                    <h1 className="text-4xl font-extrabold tracking-wide mb-3">
                        {isLogin ? "Welcome Back" : "Join Us"}
                    </h1>

                    <p className="text-gray-200 text-center text-lg">
                        {isLogin
                            ? "Sign in to access your personalised dashboard."
                            : "Create your account & start your learning journey!"}
                    </p>

                    {/* Glow Effect */}
                    <div className="mt-10 w-full h-1 bg-gradient-to-r from-[#ff6575] to-transparent rounded-full"></div>
                </motion.div>

                {/* RIGHT: FORM SECTION */}
                <div className="w-full md:w-1/2 p-8 sm:p-10">

                    {/* SWITCH BUTTONS */}
                    <div className="flex justify-center gap-6 mb-8">
                        <button
                            onClick={() => setIsLogin(true)}
                            className={`text-lg font-semibold pb-2 transition ${
                                isLogin
                                    ? "text-[#ff6575] border-b-2 border-[#ff6575]"
                                    : "text-gray-500 hover:text-[#ff6575]"
                            }`}
                        >
                            Login
                        </button>

                        <button
                            onClick={() => setIsLogin(false)}
                            className={`text-lg font-semibold pb-2 transition ${
                                !isLogin
                                    ? "text-[#ff6575] border-b-2 border-[#ff6575]"
                                    : "text-gray-500 hover:text-[#ff6575]"
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
                            className="space-y-5"
                        >
                            <div>
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#ff6575] outline-none shadow-sm"
                                />
                            </div>
                            <div>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#ff6575] outline-none shadow-sm"
                                />
                            </div>

                            <button className="w-full bg-[#ff6575] text-white py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-[#ff465f] transition-all">
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
                            className="space-y-5"
                        >
                            <input
                                type="text"
                                placeholder="Full Name"
                                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#ff6575] outline-none shadow-sm"
                            />

                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#ff6575] outline-none shadow-sm"
                            />

                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#ff6575] outline-none shadow-sm"
                            />

                            <input
                                type="password"
                                placeholder="Confirm Password"
                                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#ff6575] outline-none shadow-sm"
                            />

                            <button className="w-full bg-[#ff6575] text-white py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-[#ff465f] transition-all">
                                Sign Up
                            </button>
                        </motion.form>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default AuthPage;
