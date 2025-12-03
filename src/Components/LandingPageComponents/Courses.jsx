import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Gavel, Globe, Building, Scale, Search } from "lucide-react";

const coursesData = [
    {
        title: "UPSC Civil Services",
        category: "UPSC",
        description: "Complete preparation for UPSC Civil Services exam.",
        duration: "6 Months",
        level: "Advanced",
        icon: BookOpen,
        image: "https://resize.indiatvnews.com/en/resize/newbucket/1200_-/2021/06/upsc-1623314080.jpg"
    },
    {
        title: "SSC CGL",
        category: "SSC",
        description: "All-in-one SSC CGL exam preparation.",
        duration: "4 Months",
        level: "Intermediate",
        icon: Gavel,
        image: "https://images.unsplash.com/photo-1581090700227-1e37b190418e"
    },
    {
        title: "Bank PO",
        category: "Banking",
        description: "Bank PO exam preparation including aptitude, reasoning & English.",
        duration: "3 Months",
        level: "Beginner",
        icon: Building,
        image: "https://images.unsplash.com/photo-1554224154-22dec7ec8818"
    },
    {
        title: "Railways RRB",
        category: "Railways",
        description: "Preparation for Railways RRB exams.",
        duration: "3 Months",
        level: "Beginner to Intermediate",
        icon: Scale,
        image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66"
    },
    {
        title: "State PCS",
        category: "State Exams",
        description: "State Public Service Commission exam preparation.",
        duration: "5 Months",
        level: "Intermediate",
        icon: Globe,
        image: "https://images.unsplash.com/photo-1521791136064-7986c2920216"
    },
    {
        title: "SSC CHSL",
        category: "SSC",
        description: "SSC CHSL exam full preparation.",
        duration: "3 Months",
        level: "Beginner",
        icon: Gavel,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlG41qYaQQER1YBJFkIBaNQnyqeqswvPpppg&s"
    },
];

const examCategories = [
    { name: "All", icon: BookOpen },
    { name: "UPSC", icon: BookOpen },
    { name: "SSC", icon: Gavel },
    { name: "Banking", icon: Building },
    { name: "Railways", icon: Scale },
    { name: "State Exams", icon: Globe },
];

const Courses = () => {
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");
    const [displayedCourses, setDisplayedCourses] = useState(coursesData);

    // Debounced search
    useEffect(() => {
        const timer = setTimeout(() => {
            let filtered = coursesData;

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
        }, 500);

        return () => clearTimeout(timer);
    }, [searchTerm, activeCategory]);

    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <section className="w-full bg-[#0f3069] py-28 text-center mt-40">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-100">Indian Govt Exams</h2>
                <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
                    Prepare for the most popular Indian Government exams with our structured courses.
                </p>
            </section>

            {/* Filters + Search */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-8 px-4 sm:px-6 lg:px-8 bg-gray-50 flex-wrap">

                {/* Categories */}
                <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
                    {examCategories.map((cat, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveCategory(cat.name)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm sm:text-base font-semibold transition-colors ${activeCategory === cat.name
                                    ? "bg-[#ff6575] text-white border-[#ff6575]"
                                    : "bg-white text-gray-700 border-gray-300 hover:bg-[#ff6575] hover:text-white"
                                }`}
                        >
                            <cat.icon className="h-5 w-5 text-[#ff6575]" />
                            {cat.name}
                        </button>
                    ))}
                </div>

                {/* Search */}
                <div className="relative w-full sm:w-auto">
                    <input
                        type="text"
                        placeholder="Search courses..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-[#0f3069] focus:border-transparent text-sm sm:text-base outline-none w-full sm:w-64"
                    />
                    <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
            </div>

            {/* Courses Grid */}
            <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence>
                        {displayedCourses.length > 0 ? (
                            displayedCourses.map((course) => (
                                <motion.div
                                    key={course.title}
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 50 }}
                                    transition={{ duration: 0.5 }}
                                    className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow border-t-4 border-[#ff6575]"
                                >
                                    {/* Image */}
                                    <img
                                        src={course.image}
                                        alt={course.title}
                                        className="w-full h-40 object-cover rounded-t-lg"
                                    />

                                    <div className="p-6">
                                        <div className="flex items-center gap-3 mb-4">
                                            <course.icon className="h-6 w-6 text-[#ff6575]" />
                                            <h3 className="text-xl font-bold text-[#0f3069]">
                                                {course.title}
                                            </h3>
                                        </div>

                                        <p className="text-gray-700 mb-4">{course.description}</p>

                                        <div className="flex justify-between items-center text-sm sm:text-base text-gray-600 font-semibold mb-4">
                                            <span>{course.duration}</span>
                                            <span>{course.level}</span>
                                        </div>

                                        <button className="w-full bg-[#0f3069] hover:bg-[#ff6575] text-white font-bold py-2 px-4 rounded-full transition-colors text-sm sm:text-base">
                                            Enroll Now
                                        </button>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center col-span-full text-gray-500 text-lg font-semibold"
                            >
                                No courses found.
                            </motion.p>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default Courses;
