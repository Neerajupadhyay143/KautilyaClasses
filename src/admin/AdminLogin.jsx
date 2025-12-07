import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/config.js";
import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import { SnackbarProvider, useSnackbar } from "notistack";

function AdminLoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    // Redirect if already logged in
    useEffect(() => {
        const admin = localStorage.getItem("admin") || document.cookie.includes("admin=true");
        if (admin) {
            navigate("/admin-panel/dashboard", { replace: true });
        }
    }, []);

    const handleLogin = async () => {
        if (!email || !password) {
            enqueueSnackbar("Please enter email & password", { variant: "warning" });
            return;
        }

        setLoading(true);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);

            //  Login success → set localStorage / cookie
            localStorage.setItem("admin", "true");
            document.cookie = "admin=true; path=/; max-age=86400";

            enqueueSnackbar("Login Successful!", { variant: "success" });
            navigate("/admin-panel/dashboard", { replace: true });
        } catch (err) {
            
            enqueueSnackbar(err.message, { variant: "error" });
        }
        setLoading(false);
    };

    const handleReset = () => {
        if (!email) {
            enqueueSnackbar("Enter your email first!", { variant: "warning" });
            return;
        }

        sendPasswordResetEmail(auth, email)
            .then(() => enqueueSnackbar("Reset link sent to your email", { variant: "success" }))
            .catch((err) => enqueueSnackbar(err.message, { variant: "error" }));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#113471] px-4">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl p-8 rounded-2xl w-full max-w-sm"
            >
                <motion.h2
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-3xl font-bold text-white text-center mb-6 tracking-wide"
                >
                    Admin Login
                </motion.h2>

                <motion.input
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-200 border border-white/30 
          focus:outline-none focus:ring-2 focus:ring-[#ff6575] transition"
                />

                <br /><br />

                <motion.input
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-200 border border-white/30 
          focus:outline-none focus:ring-2 focus:ring-[#ff6575] transition"
                />

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.55 }}
                    className="text-right mt-2"
                >
                    <Button
                        onClick={handleReset}
                        variant="text"
                        sx={{ color: "#ff6575", textTransform: "none", fontSize: "0.875rem" }}
                    >
                        Forgot Password?
                    </Button>
                </motion.div>

                <motion.button
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 }}
                    onClick={handleLogin}
                    disabled={loading}
                    className="w-full mt-6 bg-[#ff6575] text-white py-3 rounded-lg font-semibold text-lg shadow-lg 
          hover:bg-[#ff5565] hover:scale-105 active:scale-95 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? "Logging in..." : "Login"}
                </motion.button>
            </motion.div>
        </div>
    );
}

// ✅ Wrap with SnackbarProvider
export default function AdminLogin() {
    return (
        
            <AdminLoginForm />
        
    );
}
