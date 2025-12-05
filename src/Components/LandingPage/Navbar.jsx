import React, { useState, useEffect } from "react";
import { Menu, X, Phone, Mail, UserRound } from "lucide-react";
import LOGO from "../../assets/images/LandingPage/LOGO/Kautilya.png";
import { NavLink } from "react-router-dom";
import AuthPage from "../Auth/UserAuthPage";


export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [openLogin, setOpenLogin] = useState(false); // ⬅ POPUP CONTROL

    const navItems = [
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
        { name: "Blogs", path: "/blogs" },
        { name: "Courses", path: "/courses" },
        { name: "Contact", path: "/contact" },
    ];

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 70);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            {/* ------------------ MAIN NAVBAR ------------------ */}
            <nav
                className={`fixed w-full z-40 transition-all duration-300 
                ${scrolled ? "bg-[#113471] shadow-md" : "bg-transparent"}
            `}
            >
                <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16 sm:h-20">

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
                        <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
                            {navItems.map(({ name, path }) => (
                                <NavLink
                                    key={path}
                                    to={path}
                                    className={({ isActive }) =>
                                        `text-sm xl:text-base transition capitalize 
                                        ${scrolled ? "text-white" : "text-gray-700"}
                                        hover:text-[#ff6575]
                                        ${isActive ? "font-bold text-[#ff6575]" : ""}`
                                    }
                                >
                                    {name}
                                </NavLink>
                            ))}

                            {/* Login Button → Dialog Open */}
                            <button
                                onClick={() => setOpenLogin(true)}
                                className="flex items-center gap-1 px-4 py-2 border border-[#ff6575] rounded-full 
                                 bg-[#ff6575] text-white transition"
                            >
                                <UserRound className="h-4 w-4" />
                                Login
                            </button>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="lg:hidden p-2"
                        >
                            {isMenuOpen ? (
                                <X className="h-6 w-6 text-[#ff6575]" />
                            ) : (
                                <Menu className="h-6 w-6 text-[#ff6575]" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="lg:hidden bg-white border-t shadow-lg">
                        <div className="px-4 py-4 space-y-4">
                            {navItems.map(({ name, path }) => (
                                <NavLink
                                    key={path}
                                    to={path}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={({ isActive }) =>
                                        `block py-2 capitalize text-gray-700 hover:text-[#ff6575] 
                                        ${isActive ? "font-bold text-[#ff6575]" : ""}`
                                    }
                                >
                                    {name}
                                </NavLink>
                            ))}

                            <button
                                onClick={() => { setOpenLogin(true); setIsMenuOpen(false); }}
                                className="block w-full border border-[#113471] text-[#113471] px-6 py-3 rounded-full text-center hover:bg-[#113471] hover:text-white transition"
                            >
                                Login
                            </button>

                            <NavLink
                                to="/register"
                                className="block bg-[#ff6575] text-white px-6 py-3 rounded-full hover:opacity-90 transition text-center"
                            >
                                Register
                            </NavLink>
                        </div>
                    </div>
                )}
            </nav>

            {/* ------------------ LOGIN DIALOG POPUP ------------------ */}
            {openLogin && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-[999]">
                    <div className="relative w-full max-w-3xl mx-4">

                        {/* Close Button */}
                        <button
                            onClick={() => setOpenLogin(false)}
                            className="absolute top-4 right-4 bg-[#ff6575] text-white rounded-full p-2 z-50 hover:bg-red-500"
                        >
                            <X className="h-5 w-5" />
                        </button>

                        {/* Auth Component Here */}
                        <AuthPage />
                    </div>
                </div>
            )}
        </>
    );
}
