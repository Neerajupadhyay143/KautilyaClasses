import React from 'react';
import { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import {
    Phone,
    MapPin,
    Mail,
    Facebook,
    Instagram,
    Youtube,
    Play
} from 'lucide-react';

import Logo from "../../assets/images/LandingPage/LOGO/Kautilya.png";

function Footer() {

    const Motion = ({ children, className, delay = 0, duration = 0.5 }) => {
        const [isVisible, setIsVisible] = useState(false);
        const ref = React.useRef(null);

        useEffect(() => {
            const observer = new IntersectionObserver(
                ([entry]) => entry.isIntersecting && setIsVisible(true),
                { threshold: 0.1 }
            );

            if (ref.current) observer.observe(ref.current);
            return () => ref.current && observer.unobserve(ref.current);
        }, []);

        return (
            <div
                ref={ref}
                className={className}
                style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateY(0)" : "translateY(25px)",
                    transition: `all ${duration}s ease-out ${delay}s`
                }}
            >
                {children}
            </div>
        );
    };

    return (
        <footer className="bg-[#0f3069] text-gray-200 py-12">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

                {/* LEFT COLUMN - Logo + About + Social */}
                <Motion delay={0.1}>
                    <div>
                        <img src={Logo} alt="Logo" className="w-24 h-24 rounded-full mb-4" />

                        <p className="text-sm leading-relaxed mb-6">
                            At Kautilya Law Institute, we provide result-oriented CLAT & CUET(UG) preparation through expert classes, detailed class notes, weekly mock tests, targeted revision sessions, and fast-track crash courses. Our student-focused approach ensures consistent practice, personalised mentoring, and complete support from the first day of preparation to final exam day.
                        </p>

                        {/* Social icons */}
                        <div className="flex items-center gap-4">
                            <span className="text-sm">Connect :</span>

                            <a href="#" className="hover:text-[#ff6575]">
                                <Facebook size={18} />
                            </a>

                            <a href="#" className="hover:text-[#ff6575]">
                                <Instagram size={18} />
                            </a>

                            <a href="#" className="hover:text-[#ff6575]">
                                <Youtube size={18} />
                            </a>

                            <a href="#" className="hover:text-[#ff6575]">
                                <Play size={18} />
                            </a>
                        </div>
                    </div>
                </Motion>

                {/* MIDDLE COLUMN - Courses */}
                <Motion delay={0.2}>
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Courses</h3>

                        <ul className="space-y-2 text-sm">
                            <NavLink to="/courses" className="hover:text-[#ff6575] block">CLAT 2026-27</NavLink>
                            <NavLink to="/courses" className="hover:text-[#ff6575] block">CUET (UG)</NavLink>
                            <NavLink to="/courses" className="hover:text-[#ff6575] block">MH-CET</NavLink>
                            <NavLink to="/courses" className="hover:text-[#ff6575] block">MDU BA-LLB (5 Years) Law Entrance Exam</NavLink>
                            <NavLink to="/courses" className="hover:text-[#ff6575] block">State Law Entrance Exams</NavLink>
                        </ul>


                        <h3 className="text-xl font-semibold mt-8 mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <NavLink to="/privacy-policy" className="hover:text-[#ff6575] block">Privacy Policy</NavLink>
                            <NavLink to="/terms" className="hover:text-[#ff6575] block">Terms & Conditions</NavLink>
                        </ul>
                    </div>
                </Motion>

                {/* RIGHT COLUMN - Address */}
                <Motion delay={0.3}>
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Address</h3>

                        <p className="text-sm mb-4">+91 9996732928</p>

                        <p className="text-sm mb-4">info@kautilyavisionclasses.com</p>

                        <p className="text-sm leading-relaxed">
                            2nd Floor, Delhi Rd, near<br />
                            MDU Gate no. 2, opp.<br />
                            Agro Mall, Maharshi<br />
                            Dayanand University,<br />
                            Rohtak, Haryana
                        </p>
                    </div>
                </Motion>

            </div>

            {/* Bottom bar */}
            <div className="text-center border-t border-white/10 mt-10 pt-6">
                <p className="text-sm">
                    © 2025 Kautilya Law Institute. All rights reserved.
                </p>
            </div>
        </footer>
    );
}

export default Footer;
