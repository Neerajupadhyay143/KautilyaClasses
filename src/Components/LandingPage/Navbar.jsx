import React, { useState, useEffect, useRef } from "react";
import { Menu, X, UserRound, LogOut } from "lucide-react";
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
    const [openMenu, setOpenMenu] = useState(false);

    const { enqueueSnackbar } = useSnackbar();  // ⬅ MUI SNACKBAR
    const { user, logout, loading } = useAuth();

    const menuRef = useRef();
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
                menuRef.current &&
                !menuRef.current.contains(e.target) &&
                !avatarRef.current.contains(e.target)
            ) {
                setOpenMenu(false);
            }
        };
        document.addEventListener("click", closeMenu);
        return () => document.removeEventListener("click", closeMenu);
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
        enqueueSnackbar("Logged out successfully!", { variant: "success" }); // SNACKBAR
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
                                        } hover:text-[#ff6575] ${isActive ? "font-bold text-[#ff6575]" : ""}`
                                    }
                                >
                                    {name}
                                </NavLink>
                            ))}

                            {!user && (
                                <button
                                    onClick={() => setOpenLogin(true)}
                                    className="flex items-center gap-2 px-4 py-2 bg-[#ff6575] text-white rounded-full"
                                >
                                    <UserRound size={18} /> Login
                                </button>
                            )}

                            {/* USER AVATAR */}
                            {user && (
                                <div className="relative">
                                    <div
                                        ref={avatarRef}
                                        onClick={() => setOpenMenu(!openMenu)}
                                        className="h-12 w-12 bg-[#113471] text-white rounded-full flex items-center justify-center cursor-pointer text-lg font-bold border-2 border-white"
                                    >
                                        {getInitials(user.displayName)}
                                    </div>

                                    {openMenu && (
                                        <div
                                            ref={menuRef}
                                            className="absolute right-0 mt-3 w-48 bg-white shadow-xl rounded-xl py-2"
                                        >
                                            <p className="px-4 py-2 text-gray-700 text-sm">
                                                {user.displayName}
                                            </p>

                                            <button
                                                onClick={handleLogout}
                                                className="w-full flex items-center gap-2 px-4 py-3 hover:bg-gray-100 text-red-600 font-medium"
                                            >
                                                <LogOut size={18} /> Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* MOBILE: Avatar or Hamburger */}
                        <div className="lg:hidden">
                            {user ? (
                                <div
                                    ref={avatarRef}
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    className="h-10 w-10 bg-[#113471] text-white rounded-full flex items-center justify-center font-semibold cursor-pointer"
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
                    <div className="lg:hidden bg-white shadow-md p-4 space-y-4">
                        {navItems.map(({ name, path }) => (
                            <NavLink
                                key={path}
                                to={path}
                                onClick={() => setIsMenuOpen(false)}
                                className="block text-gray-700 text-lg border-b pb-2"
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
                                className="w-full bg-[#ff6575] text-white py-3 rounded-xl"
                            >
                                Login
                            </button>
                        ) : (
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-red-500 text-red-600"
                            >
                                <LogOut size={20} /> Logout
                            </button>
                        )}
                    </div>
                )}
            </nav>

            {/* LOGIN POPUP */}
            {openLogin && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-[999]">
                    <div className="relative w-full max-w-3xl mx-4">
                        <button
                            onClick={() => setOpenLogin(false)}
                            className="absolute top-4 right-4 bg-[#ff6575] p-2 rounded-full text-white"
                        >
                            <X size={20} />
                        </button>

                        <AuthPage />
                    </div>
                </div>
            )}
        </>
    );
}
