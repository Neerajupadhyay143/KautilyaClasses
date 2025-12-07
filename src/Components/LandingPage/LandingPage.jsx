import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, MapPin, Mail, ChevronRight, Award, Users, BookOpen, TrendingUp, CheckCircle, Star, Clock, Video, FileText, BarChart, Check, PhoneCall, Monitor, MessageCircle, ClipboardList, BarChart2, MessageSquare, CreditCard, Laptop, UserCheck, } from 'lucide-react';
import logo from "../../assets/images/LandingPage/LOGO/Kautilya.png"
import Navbar from './Navbar';
import design from "../../assets/images/designs/design.webp"
// Motion component for animations
const Motion = ({ children, className, delay = 0, duration = 0.5, type = 'fadeUp' }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = React.useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []);

    const animations = {
        fadeUp: {
            initial: { opacity: 0, transform: 'translateY(30px)' },
            animate: { opacity: 1, transform: 'translateY(0)' }
        },
        fadeIn: {
            initial: { opacity: 0 },
            animate: { opacity: 1 }
        },
        slideLeft: {
            initial: { opacity: 0, transform: 'translateX(-30px)' },
            animate: { opacity: 1, transform: 'translateX(0)' }
        },
        slideRight: {
            initial: { opacity: 0, transform: 'translateX(30px)' },
            animate: { opacity: 1, transform: 'translateX(0)' }
        },
        scale: {
            initial: { opacity: 0, transform: 'scale(0.9)' },
            animate: { opacity: 1, transform: 'scale(1)' }
        }
    };

    const style = {
        ...animations[type].initial,
        ...(isVisible ? animations[type].animate : {}),
        transition: `all ${duration}s ease-out ${delay}s`
    };

    return (
        <div ref={ref} className={className} style={style}>
            {children}
        </div>
    );
};

export default function LandingPage() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 80);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const features = [
        { icon: Award, title: "Expert Mentors", desc: "Learn from CUET specialists with 10+ years experience" },
        { icon: BookOpen, title: "Comprehensive Coverage", desc: "Language, Domain Subjects & General Test" },
        { icon: TrendingUp, title: "Smart Preparation", desc: "Daily quizzes & weekly mock tests" },
        { icon: Users, title: "Personalized Support", desc: "One-on-one feedback & doubt sessions" }
    ];

    const stats = [
        { number: "1000+", label: "Students Placed" },
        { number: "90%", label: "Student Satisfaction Rate" },
        { number: "100+", label: "CUET Selections in Delhi University 2024" },
        { number: "10+", label: "Faculty with 10+ Years of Teaching Experience" }
    ];

    const universities = [
        "Delhi University", "BHU", "JNU", "Jamia Millia Islamia",
        "Allahabad University", "Hyderabad University"
    ];

    const courseFeatures = [
        { icon: Award, title: "Excellent Faculty", desc: "Expert educators with deep subject mastery and 10+ years experience" },
        { icon: BarChart, title: "Regular Assessment", desc: "Weekly tests and personalized feedback for continuous improvement" },
        { icon: Users, title: "Unlimited Doubt Clearing", desc: "One-on-one guidance till you're confident with every concept" },
        { icon: BookOpen, title: "Affordable Fees", desc: "Quality CUET coaching that fits every budget" },
        { icon: Video, title: "Flexible Learning", desc: "Online + Offline options — learn your way, accessible anywhere" },
        { icon: FileText, title: "Smart Classrooms", desc: "Digital boards, test dashboards & real-time analysis" }
    ];

    const successTips = [
        { tip: "Start Early", desc: "Build a daily routine around revision and test practice" },
        { tip: "Focus on Accuracy", desc: "CUET rewards precision more than speed" },
        { tip: "Attempt Mock Tests", desc: "Simulate exam conditions regularly" },
        { tip: "Revise NCERTs", desc: "They form the base for every domain subject" },
        { tip: "Stay Positive", desc: "Confidence is your biggest asset" },
        { tip: "Track Progress", desc: "Analyze your performance to identify weak areas" }
    ];

    return (
        <div className="min-h-screen bg-white overflow-x-hidden">
            {/* Navigation */}
            <Navbar />

            {/* Hero Section */}
            <section
                className="relative pt-24 pb-20 bg-[#113471] overflow-hidden mt-24 lg:mt-28 md:mt-28"
                style={{
                    backgroundImage: `url(${design})`,
                    backgroundSize: "contain",
                   
                   
                }}
            >
                <div className="absolute inset-0 bg-[#113471]/60 backdrop-blur-[1px]"></div>



                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">

                        {/* Left Content */}
                        <Motion type="fadeUp" delay={0.4}>
                            <div>
                                <div className="inline-block bg-blue-100 text-blue-800 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
                                    Rohtak’s Most Trusted CLAT & CUET(UG) Coaching
                                </div>

                                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                                    Your GATEWAY to <span className="text-[#ff6575]">CLAT 2026-27</span> & CUET(UG) Exams
                                </h1>

                                <p className="text-base font-semibold sm:text-lg md:text-xl text-gray-300 mb-2 sm:mb-4">
                                    Live + Offline Classes | Weekly Tests | Performance Analytics | 24/7 Doubt Support
                                </p>

                                <p className="text-xs sm:text-lg md:text-md text-gray-300 mb-6 sm:mb-8">
                                    Everything you need to crack CLAT & CUET with confidence.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                                    <a
                                        href="tel:+919996732928"
                                        className="border-2 border-[#ff6575] text-[#ff6575] px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:bg-[#ff6575] hover:text-white transition flex items-center justify-center text-sm sm:text-base"
                                    >
                                        <Phone className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                                        Call Now
                                    </a>
                                </div>
                            </div>
                        </Motion>

                        {/* Right Content / Image or Form */}
                        <Motion type="scale" delay={0.4}>
                            <div className="relative mt-8 lg:mt-0">
                                <div className="bg-white p-6 sm:p-8 md:p-10 rounded-2xl shadow-2xl transition-all duration-500">
                                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-600 mb-4 text-center">
                                        Enquire Now
                                    </h2>

                                    <form className="flex flex-col gap-3">
                                        <input
                                            type="text"
                                            placeholder="Name"
                                            className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        />

                                        <input
                                            type="email"
                                            placeholder="Email"
                                            className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        />

                                        <input
                                            type="text"
                                            placeholder="Contact Number"
                                            className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        />

                                        {/* DROPDOWN ADDED */}
                                        <select
                                            className="border px-3 py-2 rounded-md text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        >
                                            <option value="" disabled selected>
                                                Select Exam
                                            </option>
                                            <option value="clat">CLAT 2026-27</option>
                                            <option value="cuet">CUET (UG)</option>
                                            <option value="mh-cet">MH-CET Law</option>
                                            <option value="mdu">MDU BA-LLB (5 Years)</option>
                                            <option value="state-law">State Law Entrance Exams</option>
                                        </select>

                                        <textarea
                                            placeholder="Enter Your Query"
                                            className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        ></textarea>
                                        <button
                                            type="submit"
                                            className="border-2 border-blue-500 text-blue-500 px-4 py-2 rounded-md font-semibold hover:bg-blue-50 transition flex items-center justify-center"
                                        >
                                            Send Message
                                        </button>

                                    </form>
                                </div>
                            </div>
                        </Motion>


                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section id="features" className="py-12 sm:py-16 md:py-20 bg-white ">
                <Motion type="fadeUp">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8 items-center mb-6 md:mb-8">

                        {/* Left Text Column */}
                        <div>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                                Why We Stand Out?
                            </h2>

                            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mb-4">
                                Our consistent results speak louder than words.
                                Kautilya Law Institute has become India’s leading CLAT & CUET coaching brand through its commitment to excellence and personalized learning.
                            </p>

                            <p className="text-base sm:text-lg md:text-sm text-gray-600 max-w-3xl font-semibold">
                                Kautilya Law Institute – Student’s Most Trusted CLAT & CUET Coaching<br />
                                When you join Kautilya, you don’t just prepare for CLAT or CUET Exam — you prepare for life.<br />
                                Our classroom and online programs combine conceptual clarity, practical mock tests, and motivational mentorship to ensure success.<br />
                                Students from Delhi NCR, Haryana, Punjab, Rajasthan and nearby regions choose us because we deliver results with responsibility.
                            </p>
                        </div>

                        {/* Right Image Column */}
                        <div className="flex justify-center lg:justify-end mt-6 lg:mt-0">
                            <img
                                src={logo}
                                alt="Why choose us"
                                className="w-full max-w-sm rounded-2xl"
                            />
                        </div>

                    </div>
                </Motion>


                {/* Stats Section */}
                <section className="py-10 sm:py-12 md:py-16 bg-blue-900 ">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
                            {stats.map((stat, idx) => (
                                <Motion key={idx} type="fadeUp" delay={idx * 0.1}>
                                    <div className="text-center">
                                        <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-1 sm:mb-2">{stat.number}</p>
                                        <p className="text-xs sm:text-sm md:text-base text-blue-200">{stat.label}</p>
                                    </div>
                                </Motion>
                            ))}
                        </div>
                    </div>
                </section>
            </section>


            {/* How to Get Started Section */}
            <section id="get-started" className="py-12 sm:py-16 md:py-20 bg-gradient-to-r from-blue-50 to-indigo-50">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Motion type="fadeUp">
                        <div className="text-center mb-10 sm:mb-12 md:mb-16">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                                How to Get Started with Our CUET Coaching?
                            </h2>
                            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
                                It’s quick and simple to begin your journey with Kautilya Law Institute:
                            </p>
                        </div>
                    </Motion>

                    <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
                        {[
                            "Visit our center or fill out the online enquiry form.",
                            "Attend a Free Demo Class to experience our teaching style.",
                            "Choose your preferred Batch Type (Regular / Weekend / Online).",
                            "Enroll and start preparing with India’s best CUET faculty."
                        ].map((step, idx) => (
                            <Motion key={idx} type="fadeUp" delay={0.1 * (idx + 1)}>
                                <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 flex items-start gap-4">
                                    <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-blue-600 text-white font-bold rounded-full text-lg">
                                        {idx + 1}
                                    </div>
                                    <p className="text-gray-700 text-base sm:text-lg">{step}</p>
                                </div>
                            </Motion>
                        ))}
                    </div>

                    {/* Call to Action */}
                    <Motion type="scale" delay={0.5}>
                        <div className="mt-10 text-center">
                            <a
                                href="tel:+919996732928"
                                className="inline-block bg-blue-600 text-white px-8 py-4 rounded-full font-semibold text-base sm:text-lg hover:bg-blue-700 transition transform hover:scale-105"
                            >
                                Call Now to Book Your Demo: +91-9996732928
                            </a>
                        </div>
                    </Motion>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-12 sm:py-16 md:py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Motion type="fadeUp">
                        <div className="text-center mb-10 sm:mb-12 md:mb-16">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                                Why Choose Kautilya Law Institute?
                            </h2>
                            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
                                We're not just another coaching institute — we're your academic partners in success.
                            </p>
                        </div>
                    </Motion>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
                        {features.map((feature, idx) => (
                            <Motion key={idx} type="fadeUp" delay={idx * 0.1}>
                                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl hover:shadow-xl transition h-full flex flex-col">
                                    {/* Icon */}
                                    <div className="bg-blue-600 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                                        <feature.icon className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-white" />
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2">
                                        {feature.title}
                                    </h3>
                                    <p className="text-sm sm:text-base text-gray-600 flex-grow">
                                        {feature.desc}
                                    </p>
                                </div>
                            </Motion>
                        ))}
                    </div>

                </div>
            </section>
        </div>
    );
}