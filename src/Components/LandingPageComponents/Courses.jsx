import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Gavel, Globe, Building, Scale, Search, Users, Clock, Award, TrendingUp, Star, X, PlayCircle, CheckCircle } from "lucide-react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";

// Icons Map from Firebase category
const iconsMap = {
    UPSC: BookOpen,
    SSC: Gavel,
    Banking: Building,
    Railways: Scale,
    "State Exams": Globe,
};

const examCategories = [
    { name: "All", icon: BookOpen },
    { name: "UPSC", icon: BookOpen },
    { name: "SSC", icon: Gavel },
    { name: "Banking", icon: Building },
    { name: "Railways", icon: Scale },
    { name: "State Exams", icon: Globe },
];

// Custom Star Rating Component
const StarRating = ({ rating, size = "small" }) => {
    const stars = [];
    const numRating = parseFloat(rating);
    const starSize = size === "small" ? "h-4 w-4" : size === "large" ? "h-6 w-6" : "h-5 w-5";

    for (let i = 1; i <= 5; i++) {
        if (i <= Math.floor(numRating)) {
            stars.push(<Star key={i} className={`${starSize} fill-[#ff6575] text-[#ff6575]`} />);
        } else if (i === Math.ceil(numRating) && numRating % 1 !== 0) {
            stars.push(
                <div key={i} className="relative">
                    <Star className={`${starSize} text-gray-300`} />
                    <div className="absolute top-0 left-0 overflow-hidden" style={{ width: `${(numRating % 1) * 100}%` }}>
                        <Star className={`${starSize} fill-[#ff6575] text-[#ff6575]`} />
                    </div>
                </div>
            );
        } else {
            stars.push(<Star key={i} className={`${starSize} text-gray-300`} />);
        }
    }

    return <div className="flex gap-0.5">{stars}</div>;
};

// Course Details Drawer Component
const CourseDrawer = ({ course, isOpen, onClose }) => {
    if (!course) return null;

    return (
        <>
            {/* Backdrop */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                    />
                )}
            </AnimatePresence>

            {/* Drawer */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-full w-full md:w-[500px] lg:w-[600px] bg-white shadow-2xl z-50 overflow-y-auto"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors z-10"
                        >
                            <X className="h-6 w-6 text-gray-700" />
                        </button>

                        {/* Thumbnail Section */}
                        <div className="relative h-64 md:h-80 overflow-hidden">
                            {course.thumbnail ? (
                                <img
                                    src={course.thumbnail}
                                    alt={course.title}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-[#0f3069] to-[#1a4d8f] flex items-center justify-center">
                                    <course.icon className="h-32 w-32 text-white opacity-50" />
                                </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            <div className="absolute bottom-6 left-6 right-6">
                                <span className="inline-block px-3 py-1 bg-[#ff6575] text-white text-sm font-bold rounded-full mb-3">
                                    {course.category}
                                </span>
                                <h2 className="text-3xl font-bold text-white mb-2">{course.title}</h2>
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="p-6 md:p-8">
                            {/* Rating & Stats */}
                            <div className="flex flex-wrap items-center gap-4 mb-6 pb-6 border-b border-gray-200">
                                <div className="flex items-center gap-2">
                                    <StarRating rating={course.rating} size="medium" />
                                    <span className="text-lg font-bold text-gray-800">
                                        {course.rating}
                                    </span>
                                    <span className="text-gray-500">
                                        ({course.students || 0} students)
                                    </span>
                                </div>
                            </div>

                            {/* Course Info Grid */}
                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Clock className="h-5 w-5 text-[#0f3069]" />
                                        <span className="text-sm text-gray-600 font-semibold">Duration</span>
                                    </div>
                                    <p className="text-xl font-bold text-[#0f3069]">
                                        {course.durationValue} {course.durationType}
                                    </p>
                                </div>

                                <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-4 rounded-xl border border-pink-200">
                                    <div className="flex items-center gap-2 mb-2">
                                        <PlayCircle className="h-5 w-5 text-[#ff6575]" />
                                        <span className="text-sm text-gray-600 font-semibold">Lectures</span>
                                    </div>
                                    <p className="text-xl font-bold text-[#ff6575]">
                                        {course.lectures} Lectures
                                    </p>
                                </div>

                                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Award className="h-5 w-5 text-purple-600" />
                                        <span className="text-sm text-gray-600 font-semibold">Level</span>
                                    </div>
                                    <p className="text-xl font-bold text-purple-600">
                                        {course.level || "All Levels"}
                                    </p>
                                </div>

                                <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Users className="h-5 w-5 text-green-600" />
                                        <span className="text-sm text-gray-600 font-semibold">Enrolled</span>
                                    </div>
                                    <p className="text-xl font-bold text-green-600">
                                        {course.students || 0}
                                    </p>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="mb-8">
                                <h3 className="text-2xl font-bold text-[#0f3069] mb-4 flex items-center gap-2">
                                    <BookOpen className="h-6 w-6 text-[#ff6575]" />
                                    About This Course
                                </h3>
                                <p className="text-gray-700 leading-relaxed text-base whitespace-pre-wrap">
                                    {course.description}
                                </p>
                            </div>

                            {/* What You'll Learn */}
                            <div className="mb-8 bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl border border-gray-200">
                                <h3 className="text-xl font-bold text-[#0f3069] mb-4 flex items-center gap-2">
                                    <CheckCircle className="h-6 w-6 text-[#ff6575]" />
                                    What You'll Learn
                                </h3>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                                        <span className="text-gray-700">Comprehensive coverage of all exam topics</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                                        <span className="text-gray-700">Practice questions and mock tests</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                                        <span className="text-gray-700">Expert guidance and strategies</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                                        <span className="text-gray-700">Study materials and notes</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Course Features */}
                            {course.images && course.images.length > 0 && (
                                <div className="mb-8">
                                    <h3 className="text-xl font-bold text-[#0f3069] mb-4">Course Preview</h3>
                                    <div className="grid grid-cols-2 gap-3">
                                        {course.images.slice(0, 4).map((img, idx) => (
                                            <img
                                                key={idx}
                                                src={img}
                                                alt={`Preview ${idx + 1}`}
                                                className="w-full h-32 object-cover rounded-lg border-2 border-gray-200"
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Enrollment Button - Sticky on Mobile */}
                            <div className="sticky bottom-0 left-0 right-0 bg-white pt-4 pb-2 md:pb-0 border-t md:border-t-0 border-gray-200 -mx-6 px-6 md:mx-0 md:px-0 md:static">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full bg-gradient-to-r from-[#0f3069] to-[#1a4d8f] hover:from-[#ff6575] hover:to-[#ff8591] text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl text-lg"
                                >
                                    Enroll Now - Start Learning
                                </motion.button>
                                <p className="text-center text-gray-500 text-sm mt-3">
                                    Join {course.students || 0} other students
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

const Courses = () => {
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");
    const [courses, setCourses] = useState([]);
    const [displayedCourses, setDisplayedCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    // 🔥 Fetch Courses From Firebase
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "courses"));
                const courseList = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                    icon: iconsMap[doc.data().category] || BookOpen,
                }));
                setCourses(courseList);
                setDisplayedCourses(courseList);
            } catch (error) {
                console.error("Error fetching courses:", error);
            }
        };

        fetchCourses();
    }, []);

    // 🔍 Debounced Search + Category Filter
    useEffect(() => {
        const timer = setTimeout(() => {
            let filtered = courses;

            if (activeCategory !== "All") {
                filtered = filtered.filter(course => course.category === activeCategory);
            }

            if (searchTerm.trim() !== "") {
                filtered = filtered.filter(course =>
                    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    course.description.toLowerCase().includes(searchTerm.toLowerCase())
                );
            }

            setDisplayedCourses(filtered);
        }, 400);

        return () => clearTimeout(timer);
    }, [searchTerm, activeCategory, courses]);

    // Handle course click
    const handleCourseClick = (course) => {
        setSelectedCourse(course);
        setIsDrawerOpen(true);
    };

    const handleCloseDrawer = () => {
        setIsDrawerOpen(false);
        setTimeout(() => setSelectedCourse(null), 300);
    };

    // Prevent body scroll when drawer is open
    useEffect(() => {
        if (isDrawerOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isDrawerOpen]);

    return (
        <div className="flex flex-col w-full">
            {/* Enhanced Hero Section */}
            <section className="w-full relative bg-gradient-to-br from-[#0f3069] via-[#1a4d8f] to-[#0f3069] py-32 text-center mt-40 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-[#ff6575] rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
                </div>
                <div className="relative z-10">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-4"
                    >
                        Indian Govt Exams
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-gray-200 text-lg sm:text-xl mt-4 max-w-3xl mx-auto px-4"
                    >
                        Master your preparation with expert-curated courses designed for success
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="mt-8 flex gap-4 justify-center items-center text-white flex-wrap px-4"
                    >
                        <div className="flex items-center gap-2">
                            <Users className="h-5 w-5 text-[#ff6575]" />
                            <span className="font-semibold">10,000+ Students</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Award className="h-5 w-5 text-[#ff6575]" />
                            <span className="font-semibold">Expert Instructors</span>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Enhanced Filters + Search */}
            <div className="w-full flex flex-col items-center py-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
                <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center justify-between gap-6">

                    {/* Category Buttons */}
                    <div className="flex flex-wrap justify-center gap-3 w-full">
                        {examCategories.map((cat, index) => (
                            <motion.button
                                key={index}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setActiveCategory(cat.name)}
                                className={`flex items-center gap-2 px-5 py-2.5 rounded-full border-2 text-sm sm:text-base font-bold transition-all duration-300 shadow-md
                                    ${activeCategory === cat.name
                                        ? "bg-gradient-to-r from-[#ff6575] to-[#ff8591] text-white border-[#ff6575] shadow-lg shadow-[#ff6575]/50"
                                        : "bg-white text-gray-700 border-gray-300 hover:border-[#ff6575] hover:shadow-lg"
                                    }`}
                            >
                                <cat.icon className={`h-5 w-5 ${activeCategory === cat.name ? "text-white" : "text-[#ff6575]"}`} />
                                {cat.name}
                            </motion.button>
                        ))}
                    </div>

                    {/* Enhanced Search Bar */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="relative w-full max-w-xs mx-auto"
                    >
                        <input
                            type="text"
                            placeholder="Search courses..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-12 pr-4 py-3 rounded-full border-2 border-gray-300 focus:border-[#0f3069] focus:ring-4 focus:ring-[#0f3069]/20 outline-none text-sm sm:text-base w-full shadow-md transition-all duration-300"
                        />
                        <Search className="absolute top-1/2 left-4 transform -translate-y-1/2 h-5 w-5 text-[#ff6575]" />
                    </motion.div>
                </div>
            </div>

            {/* Enhanced Courses Grid */}
            <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
                        <AnimatePresence>
                            {displayedCourses.length > 0 ? (
                                displayedCourses.map((course, index) => (
                                    <motion.div
                                        key={course.id}
                                        initial={{ opacity: 0, y: 50 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 50 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        whileHover={{ y: -10, transition: { duration: 0.3 } }}
                                        onClick={() => handleCourseClick(course)}
                                        className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-t-4 border-[#ff6575] overflow-hidden group cursor-pointer"
                                    >
                                        {/* Thumbnail with Overlay */}
                                        <div className="relative h-48 overflow-hidden">
                                            {course.thumbnail ? (
                                                <img
                                                    src={course.thumbnail}
                                                    alt={course.title}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gradient-to-br from-[#0f3069] to-[#1a4d8f] flex items-center justify-center">
                                                    <course.icon className="h-20 w-20 text-white opacity-50" />
                                                </div>
                                            )}
                                            <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
                                                <span className="text-[#0f3069] font-bold text-sm">{course.category}</span>
                                            </div>
                                            {course.students > 0 && (
                                                <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-2">
                                                    <TrendingUp className="h-4 w-4 text-[#ff6575]" />
                                                    <span className="text-white font-semibold text-xs">{course.students} Students</span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="p-6">
                                            {/* Title with Icon */}
                                            <div className="flex items-start gap-3 mb-3">
                                                <div className="p-2 bg-gradient-to-br from-[#ff6575] to-[#ff8591] rounded-lg shadow-md">
                                                    <course.icon className="h-5 w-5 text-white" />
                                                </div>
                                                <h3 className="text-xl font-bold text-[#0f3069] leading-tight flex-1">
                                                    {course.title}
                                                </h3>
                                            </div>

                                            <p className="text-gray-600 mb-4 text-sm line-clamp-2">{course.description}</p>

                                            {/* Rating */}
                                            {course.rating && (
                                                <div className="flex items-center gap-2 mb-4">
                                                    <StarRating rating={course.rating} />
                                                    <span className="text-sm font-semibold text-gray-700">
                                                        {course.rating} ({course.students || 0})
                                                    </span>
                                                </div>
                                            )}

                                            {/* Course Info */}
                                            <div className="flex items-center justify-between mb-5 text-sm">
                                                <div className="flex items-center gap-1.5 text-gray-600">
                                                    <Clock className="h-4 w-4 text-[#ff6575]" />
                                                    <span className="font-semibold">
                                                        {course.durationValue} {course.durationType}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-1.5 text-gray-600">
                                                    <BookOpen className="h-4 w-4 text-[#ff6575]" />
                                                    <span className="font-semibold">{course.lectures} Lectures</span>
                                                </div>
                                            </div>

                                            {/* Level Badge */}
                                            {course.level && (
                                                <div className="mb-4">
                                                    <span className="inline-block px-3 py-1 bg-gradient-to-r from-blue-50 to-blue-100 text-[#0f3069] text-xs font-bold rounded-full border border-blue-200">
                                                        {course.level}
                                                    </span>
                                                </div>
                                            )}

                                            {/* View Details Button */}
                                            <motion.button
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                className="w-full bg-gradient-to-r from-[#0f3069] to-[#1a4d8f] hover:from-[#ff6575] hover:to-[#ff8591] text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                                            >
                                                View Details
                                            </motion.button>
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="col-span-full flex flex-col items-center justify-center py-20"
                                >
                                    <Search className="h-20 w-20 text-gray-300 mb-4" />
                                    <p className="text-center text-gray-500 text-xl font-semibold">
                                        No courses found.
                                    </p>
                                    <p className="text-center text-gray-400 text-sm mt-2">
                                        Try adjusting your filters or search terms
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* Course Details Drawer */}
            <CourseDrawer
                course={selectedCourse}
                isOpen={isDrawerOpen}
                onClose={handleCloseDrawer}
            />
        </div>
    );
};

export default Courses;