import React, { useState, useEffect, useRef } from "react";
import { Menu, X, UserRound, LogOut, User, Settings } from "lucide-react";
import { NavLink } from "react-router-dom";
import LOGO from "../../assets/images/LandingPage/LOGO/Kautilya.png";
import AuthPage from "../Auth/UserAuthPage";
import { useAuth } from "../../context/AuthContext";
import { useSnackbar } from "notistack";
import CenterLoader from "../Loader/CenterLoader";

/* --- Generate Initials Function --- */
function getInitials(name = "") {
    if (!name) return "";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [openLogin, setOpenLogin] = useState(false);
    const [openAvatarMenu, setOpenAvatarMenu] = useState(false);

    const { enqueueSnackbar } = useSnackbar();
    const { user, logout, loading } = useAuth();

    const avatarMenuRef = useRef();
    const avatarRef = useRef();

    const navItems = [
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
        { name: "Blogs", path: "/blogs" },
        { name: "Courses", path: "/courses" },
        { name: "Contact", path: "/contact" },
    ];

    /* --- Close avatar dropdown on outside click --- */
    useEffect(() => {
        const closeMenu = (e) => {
            if (
                avatarMenuRef.current &&
                !avatarMenuRef.current.contains(e.target) &&
                avatarRef.current &&
                !avatarRef.current.contains(e.target)
            ) {
                setOpenAvatarMenu(false);
            }
        };
        document.addEventListener("mousedown", closeMenu);
        return () => document.removeEventListener("mousedown", closeMenu);
    }, []);

    /* --- Scroll effect --- */
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 70);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    /* --- Logout Handler with Snackbar --- */
    const handleLogout = async () => {
        await logout();
        setOpenAvatarMenu(false);
        enqueueSnackbar("Logged out successfully!", { variant: "success" });
    };

    return (
        <>
            {loading && <CenterLoader />}
            <nav
                className={`fixed w-full z-40 transition-all duration-300 ${scrolled ? "bg-[#113471] shadow-md" : "bg-transparent"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex justify-between items-center h-20">

                        {/* Logo */}
                        <div className="flex items-center flex-shrink-0">
                            <img src={LOGO} alt="Kautilya Logo" className="h-10 sm:h-12 mr-2" />
                            <h1
                                className={`text-base sm:text-xl md:text-2xl font-bold 
                                ${scrolled ? "text-white" : "text-blue-900"} leading-tight`}
                            >
                                Kautilya Law Institute
                            </h1>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden lg:flex items-center gap-8">
                            {navItems.map(({ name, path }) => (
                                <NavLink
                                    key={path}
                                    to={path}
                                    className={({ isActive }) =>
                                        `text-lg transition ${scrolled ? "text-white" : "text-gray-700"
                                        } hover:text-[#ff6575] ${isActive ? "font-bold text-[#ff6575]" : ""
                                        }`
                                    }
                                >
                                    {name}
                                </NavLink>
                            ))}

                            {/* Login Button (if not logged in) */}
                            {!user && (
                                <button
                                    onClick={() => setOpenLogin(true)}
                                    className="flex items-center gap-2 px-5 py-2.5 bg-[#ff6575] text-white rounded-full hover:bg-[#ff4560] transition-all shadow-lg hover:shadow-xl"
                                >
                                    <UserRound size={18} /> Login
                                </button>
                            )}

                            {/* USER AVATAR DROPDOWN (Desktop) */}
                            {user && (
                                <div className="relative">
                                    <div
                                        ref={avatarRef}
                                        onClick={() => setOpenAvatarMenu(!openAvatarMenu)}
                                        className="h-11 w-11 bg-gradient-to-br from-[#113471] to-[#1a4d8f] text-white rounded-full flex items-center justify-center cursor-pointer text-base font-bold border-2 border-white shadow-lg hover:shadow-xl transition-all hover:scale-105"
                                    >
                                        {getInitials(user.displayName)}
                                    </div>

                                    {/* Dropdown Menu */}
                                    {openAvatarMenu && (
                                        <div
                                            ref={avatarMenuRef}
                                            className="absolute right-0 mt-3 w-56 bg-white shadow-2xl rounded-2xl py-2 border border-gray-100 animate-slideDown"
                                        >
                                            {/* User Info */}
                                            <div className="px-4 py-3 border-b border-gray-100">
                                                <p className="text-sm font-semibold text-gray-800">
                                                    {user.displayName || "User"}
                                                </p>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    {user.email}
                                                </p>
                                            </div>

                                            {/* Menu Items */}
                                            <div className="py-1">
                                                <button
                                                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-gray-700 transition-colors"
                                                >
                                                    <User size={18} className="text-[#113471]" />
                                                    <span className="text-sm font-medium">My Profile</span>
                                                </button>

                                                <button
                                                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-gray-700 transition-colors"
                                                >
                                                    <Settings size={18} className="text-[#113471]" />
                                                    <span className="text-sm font-medium">Settings</span>
                                                </button>
                                            </div>

                                            {/* Logout Button */}
                                            <div className="border-t border-gray-100 pt-1">
                                                <button
                                                    onClick={handleLogout}
                                                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 text-red-600 font-medium transition-colors rounded-b-2xl"
                                                >
                                                    <LogOut size={18} />
                                                    <span className="text-sm">Logout</span>
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* MOBILE: Avatar or Hamburger */}
                        <div className="lg:hidden">
                            {user ? (
                                <div
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    className="h-10 w-10 bg-gradient-to-br from-[#113471] to-[#1a4d8f] text-white rounded-full flex items-center justify-center font-semibold cursor-pointer border-2 border-white shadow-lg"
                                >
                                    {getInitials(user.displayName)}
                                </div>
                            ) : (
                                <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                                    {isMenuOpen ? (
                                        <X size={30} className="text-[#ff6575]" />
                                    ) : (
                                        <Menu size={30} className="text-[#ff6575]" />
                                    )}
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* MOBILE MENU */}
                {isMenuOpen && (
                    <div className="lg:hidden bg-white shadow-md p-4 space-y-4 rounded-b-2xl">
                        {navItems.map(({ name, path }) => (
                            <NavLink
                                key={path}
                                to={path}
                                onClick={() => setIsMenuOpen(false)}
                                className="block text-gray-700 text-lg border-b pb-2 hover:text-[#ff6575] transition-colors"
                            >
                                {name}
                            </NavLink>
                        ))}

                        {!user ? (
                            <button
                                onClick={() => {
                                    setOpenLogin(true);
                                    setIsMenuOpen(false);
                                }}
                                className="w-full bg-[#ff6575] text-white py-3 rounded-xl font-medium hover:bg-[#ff4560] transition-all"
                            >
                                Login
                            </button>
                        ) : (
                            <>
                                {/* User Info in Mobile */}
                                <div className="border-t pt-3">
                                    <p className="text-sm font-semibold text-gray-800 mb-1">
                                        {user.displayName || "User"}
                                    </p>
                                    <p className="text-xs text-gray-500 mb-3">
                                        {user.email}
                                    </p>
                                </div>

                                {/* Logout Button Mobile */}
                                <button
                                    onClick={() => {
                                        handleLogout();
                                        setIsMenuOpen(false);
                                    }}
                                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-red-500 text-red-600 font-medium hover:bg-red-50 transition-all"
                                >
                                    <LogOut size={20} /> Logout
                                </button>
                            </>
                        )}
                    </div>
                )}
            </nav>

            {/* LOGIN POPUP */}
            {openLogin && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-[999]">
                    <div className="relative w-full max-w-3xl mx-4">
                        <button
                            onClick={() => setOpenLogin(false)}
                            className="absolute top-0 -right-2 bg-[#ff6575] p-2 rounded-full text-white shadow-lg hover:bg-[#ff4560] transition-all z-10 hover:scale-110"
                        >
                            <X size={20} />
                        </button>

                        <AuthPage />
                    </div>
                </div>
            )}

            <style jsx>{`
                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-slideDown {
                    animation: slideDown 0.2s ease-out;
                }
            `}</style>
        </>
    );
}