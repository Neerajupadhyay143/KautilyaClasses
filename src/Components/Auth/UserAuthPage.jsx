import React, { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { useSnackbar } from "notistack";
import {
    X,
    Mail,
    Lock,
    User,
    Eye,
    EyeOff,
    Sparkles,
    Shield,
    Zap,
} from "lucide-react";

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Fields
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");

    const { loginWithEmail, registerUser } = useAuth();
    const { enqueueSnackbar } = useSnackbar();

    // LOGIN HANDLER
    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            enqueueSnackbar("Please fill all fields", { variant: "warning" });
            return;
        }

        const res = await loginWithEmail(email, password);

        if (res.success) {
            enqueueSnackbar("Login Successful!", { variant: "success" });
            setEmail("");
            setPassword("");
        } else {
            enqueueSnackbar(res.error, { variant: "error" });
        }
    };

    // SIGNUP HANDLER
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
            enqueueSnackbar("Password must be at least 6 characters", {
                variant: "error",
            });
            return;
        }

        const trimmedEmail = email.trim().toLowerCase();
        const emailRegex =
            /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!emailRegex.test(trimmedEmail)) {
            enqueueSnackbar("Please enter a valid email address", {
                variant: "error",
            });
            return;
        }

        const res = await registerUser(trimmedEmail, password, fullName);

        if (res.success) {
            enqueueSnackbar("Account Created Successfully!", {
                variant: "success",
            });
            setFullName("");
            setEmail("");
            setPassword("");
            setConfirmPass("");
        } else {
            enqueueSnackbar(res.error, { variant: "error" });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-3 sm:p-4 md:p-6 relative overflow-hidden">

            {/* Background Blurs */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-10 left-10 w-32 sm:w-40 h-32 sm:h-40 bg-[#ff6575] rounded-full opacity-20 blur-3xl"></div>
                <div className="absolute bottom-10 right-10 w-40 sm:w-52 h-40 sm:h-52 bg-[#0f3069] rounded-full opacity-20 blur-3xl"></div>
            </div>

            {/* MAIN CARD */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-5xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden relative z-10 flex flex-col lg:flex-row"
            >

                {/* LEFT SIDE SECTION - Hidden on mobile, visible on md+ */}
                <div className="hidden lg:flex lg:w-2/5 bg-gradient-to-br from-[#0f3069] to-[#1a4d8f] text-white p-8 xl:p-12 flex-col justify-center items-start gap-6">
                    <Sparkles className="h-10 w-10 xl:h-12 xl:w-12 text-[#ff6575]" />

                    <h1 className="text-3xl xl:text-4xl font-extrabold leading-tight">
                        {isLogin ? "Welcome Back!" : "Create Account"}
                    </h1>

                    <p className="text-gray-200 text-base xl:text-lg leading-relaxed">
                        {isLogin
                            ? "Sign in to access your personalized dashboard and learning resources."
                            : "Create an account to unlock premium features and courses."}
                    </p>

                    {/* Features */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <Shield className="h-5 w-5 text-[#ff6575] flex-shrink-0" />
                            <span className="text-sm xl:text-base">Secure Authentication</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Zap className="h-5 w-5 text-[#ff6575] flex-shrink-0" />
                            <span className="text-sm xl:text-base">Fast & Smooth Login</span>
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE FORM */}
                <div className="w-full lg:w-3/5 p-5 sm:p-8 lg:p-10 bg-gradient-to-br from-gray-50 to-white">

                    {/* Mobile Header - Only visible on small screens */}
                    <div className="lg:hidden mb-6 text-center">
                        <div className="flex justify-center mb-3">
                            <Sparkles className="h-10 w-10 text-[#ff6575]" />
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0f3069] mb-2">
                            {isLogin ? "Welcome Back!" : "Create Account"}
                        </h1>
                        <p className="text-gray-600 text-sm sm:text-base">
                            {isLogin
                                ? "Sign in to continue"
                                : "Join us today"}
                        </p>
                    </div>

                    {/* Switch Buttons */}
                    <div className="flex gap-1.5 sm:gap-2 mb-6 p-1 bg-gray-200 rounded-lg sm:rounded-xl">
                        <button
                            onClick={() => setIsLogin(true)}
                            className={`flex-1 py-2.5 sm:py-3 rounded-md sm:rounded-lg font-semibold text-sm sm:text-base transition-all ${isLogin
                                ? "bg-[#0f3069] text-white shadow-md"
                                : "text-gray-700 hover:bg-gray-300/50"
                                }`}
                        >
                            Login
                        </button>
                        <button
                            onClick={() => setIsLogin(false)}
                            className={`flex-1 py-2.5 sm:py-3 rounded-md sm:rounded-lg font-semibold text-sm sm:text-base transition-all ${!isLogin
                                ? "bg-[#ff6575] text-white shadow-md"
                                : "text-gray-700 hover:bg-gray-300/50"
                                }`}
                        >
                            Sign Up
                        </button>
                    </div>

                    {/* LOGIN FORM */}
                    {isLogin && (
                        <form className="space-y-4 sm:space-y-5" onSubmit={handleLogin}>
                            <InputField
                                icon={<Mail className="h-4 w-4 sm:h-5 sm:w-5" />}
                                label="Email Address"
                                value={email}
                                setter={setEmail}
                                type="email"
                                placeholder="Enter your email"
                            />

                            <PasswordField
                                label="Password"
                                value={password}
                                setter={setPassword}
                                placeholder="Enter your password"
                                show={showPassword}
                                toggle={() => setShowPassword(!showPassword)}
                            />

                            <SubmitButton text="Login" color="blue" />
                        </form>
                    )}

                    {/* SIGNUP FORM */}
                    {!isLogin && (
                        <form className="space-y-4 sm:space-y-5" onSubmit={handleSignup}>
                            <InputField
                                icon={<User className="h-4 w-4 sm:h-5 sm:w-5" />}
                                label="Full Name"
                                value={fullName}
                                setter={setFullName}
                                type="text"
                                placeholder="Enter your full name"
                            />

                            <InputField
                                icon={<Mail className="h-4 w-4 sm:h-5 sm:w-5" />}
                                label="Email Address"
                                value={email}
                                setter={setEmail}
                                type="email"
                                placeholder="Enter your email"
                            />

                            <PasswordField
                                label="Password"
                                value={password}
                                setter={setPassword}
                                show={showPassword}
                                toggle={() => setShowPassword(!showPassword)}
                                placeholder="Create a password"
                            />

                            <PasswordField
                                label="Confirm Password"
                                value={confirmPass}
                                setter={setConfirmPass}
                                show={showConfirmPassword}
                                toggle={() =>
                                    setShowConfirmPassword(!showConfirmPassword)
                                }
                                placeholder="Confirm your password"
                            />

                            <SubmitButton text="Create Account" color="pink" />
                        </form>
                    )}

                    {/* Mobile Features - Only visible on small screens */}
                    <div className="lg:hidden mt-6 pt-6 border-t border-gray-200">
                        <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                                <Shield className="h-4 w-4 text-[#ff6575]" />
                                <span>Secure</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Zap className="h-4 w-4 text-[#ff6575]" />
                                <span>Fast</span>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

/* -------------------- REUSABLE COMPONENTS -------------------- */

const InputField = ({ label, icon, value, setter, type, placeholder }) => (
    <div>
        <label className="text-xs sm:text-sm font-semibold text-gray-700 block mb-1.5">
            {label}
        </label>
        <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                {icon}
            </span>
            <input
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={(e) => setter(e.target.value)}
                className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg sm:rounded-xl border-2 border-gray-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-300/20 outline-none transition-all"
            />
        </div>
    </div>
);

const PasswordField = ({
    label,
    value,
    setter,
    placeholder,
    show,
    toggle,
}) => (
    <div>
        <label className="text-xs sm:text-sm font-semibold text-gray-700 block mb-1.5">
            {label}
        </label>
        <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5" />
            <input
                type={show ? "text" : "password"}
                placeholder={placeholder}
                value={value}
                onChange={(e) => setter(e.target.value)}
                className="w-full pl-9 sm:pl-10 pr-10 sm:pr-12 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg sm:rounded-xl border-2 border-gray-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-300/20 outline-none transition-all"
            />
            <button
                type="button"
                onClick={toggle}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
            >
                {show ? <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" /> : <Eye className="h-4 w-4 sm:h-5 sm:w-5" />}
            </button>
        </div>
    </div>
);

const SubmitButton = ({ text, color }) => {
    const gradient =
        color === "pink"
            ? "from-[#ff6575] to-[#ff8591]"
            : "from-[#0f3069] to-[#1a4d8f]";

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className={`w-full py-3 sm:py-3.5 text-base sm:text-lg text-white font-bold rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl bg-gradient-to-r ${gradient} transition-all mt-2`}
            type="submit"
        >
            {text}
        </motion.button>
    );
};

export default AuthPage;