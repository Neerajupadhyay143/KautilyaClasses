import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import { Avatar } from "@mantine/core";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import logo from "../assets/images/LandingPage/LOGO/Kautilya.png";

export default function AdminLayout() {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            localStorage.removeItem("admin");
            document.cookie = "admin=; max-age=0; path=/";
            navigate("/admin", { replace: true });
        } catch (err) {
            console.error("Logout failed:", err);
        }
    };

    // Sidebar Content
    const SidebarContent = ({ isMobile = false }) => (
        <div className="flex flex-col h-full bg-[#113471]">
            {/* Close button for mobile */}
            {isMobile && (
                <div className="flex justify-end p-2">
                    <IconButton onClick={() => setOpen(false)} sx={{ color: "#fff" }}>
                        <CloseIcon />
                    </IconButton>
                </div>
            )}

            {/* Navigation Links */}
            <nav className="flex-1 px-5 pt-6">
                <NavLink
                    to="/admin-panel/dashboard"
                    className={({ isActive }) =>
                        `block mb-3 px-4 py-3 rounded-lg text-white no-underline transition-colors ${isActive ? "bg-[#ff6575]" : "hover:bg-[#1a4a8f]"
                        }`
                    }
                    onClick={() => setOpen(false)}
                >
                    Dashboard
                </NavLink>

                <NavLink
                    to="/admin-panel/courses"
                    className={({ isActive }) =>
                        `block mb-3 px-4 py-3 rounded-lg text-white no-underline transition-colors ${isActive ? "bg-[#ff6575]" : "hover:bg-[#1a4a8f]"
                        }`
                    }
                    onClick={() => setOpen(false)}
                >
                    Manage Courses
                </NavLink>

                <NavLink
                    to="/admin-panel/blogs"
                    className={({ isActive }) =>
                        `block mb-3 px-4 py-3 rounded-lg text-white no-underline transition-colors ${isActive ? "bg-[#ff6575]" : "hover:bg-[#1a4a8f]"
                        }`
                    }
                    onClick={() => setOpen(false)}
                >
                    Manage Blogs
                </NavLink>
            </nav>

            {/* Logout Button */}
            <div className="p-5">
                <button
                    onClick={handleLogout}
                    className="flex items-center w-full bg-[#ff6575] hover:bg-[#ff4555] border-none px-4 py-3 rounded-lg text-white cursor-pointer text-base transition-colors"
                >
                    <LogOut size={20} className="mr-2" /> Logout
                </button>
            </div>
        </div>
    );

    return (
        <div className="flex flex-col h-screen">
            {/* Mobile Navbar */}
            <header className="lg:hidden sticky top-0 z-50 bg-white shadow-xl py-3 px-3">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <img src={logo} alt="Kautilya Logo" className="h-10 sm:h-16" />
                        <h1 className="text-base sm:text-xl font-bold text-[#113471] leading-tight">
                            Kautilya Law Institute
                        </h1>
                    </div>

                    {/* Right Side Icons */}
                    <div className="flex items-center gap-3">
                        <Avatar
                            src="/avatar.png"
                            alt="avatar"
                            size={45}
                            radius="xl"
                        />
                        <IconButton onClick={() => setOpen(true)} sx={{ color: "#113471" }}>
                            <MenuIcon />
                        </IconButton>
                    </div>
                </div>
            </header>

            {/* Main Layout */}
            <div className="flex flex-1 overflow-hidden">
                {/* Desktop Sidebar */}
                <aside className="hidden lg:block w-[250px] h-full">
                    <SidebarContent />
                </aside>

                {/* Mobile Drawer */}
                <Drawer
                    anchor="left"
                    open={open}
                    onClose={() => setOpen(false)}
                    PaperProps={{
                        sx: { width: 250 }
                    }}
                >
                    <SidebarContent isMobile={true} />
                </Drawer>

                {/* Main Content Area */}
                <main className="flex-1 bg-gray-200 p-5 overflow-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}