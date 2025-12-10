import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, Calendar, Tag, BookOpen, Clock, Filter, Sparkles } from "lucide-react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";

const BlogsPage = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedTag, setSelectedTag] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [delaySearch, setDelaySearch] = useState("");
    const [blogs, setBlogs] = useState([]);
    const [filteredBlogs, setFilteredBlogs] = useState([]);
    const [openBlog, setOpenBlog] = useState(null);
    const [categories, setCategories] = useState(["All"]);
    const [allTags, setAllTags] = useState([]);
    const [showFilters, setShowFilters] = useState(false);

    // 🔥 Fetch Blogs From Firebase
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "blogs"));
                const blogList = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setBlogs(blogList);
                setFilteredBlogs(blogList);

                // Extract unique categories
                const uniqueCategories = ["All", ...new Set(blogList.map(blog => blog.category).filter(Boolean))];
                setCategories(uniqueCategories);

                // Extract unique tags
                const tagsSet = new Set();
                blogList.forEach(blog => {
                    if (blog.tags && Array.isArray(blog.tags)) {
                        blog.tags.forEach(tag => tagsSet.add(tag));
                    }
                });
                setAllTags([...tagsSet]);
            } catch (error) {
                console.error("Error fetching blogs:", error);
            }
        };

        fetchBlogs();
    }, []);

    // SEARCH DELAY (500ms)
    useEffect(() => {
        const timer = setTimeout(() => {
            setSearchQuery(delaySearch);
        }, 500);
        return () => clearTimeout(timer);
    }, [delaySearch]);

    // FILTERING
    useEffect(() => {
        let results = blogs;

        if (selectedCategory !== "All") {
            results = results.filter((b) => b.category === selectedCategory);
        }

        if (selectedTag) {
            results = results.filter((b) => b.tags && b.tags.includes(selectedTag));
        }

        if (searchQuery.trim() !== "") {
            results = results.filter((b) =>
                b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (b.content && b.content.toLowerCase().includes(searchQuery.toLowerCase()))
            );
        }

        setFilteredBlogs(results);
    }, [selectedCategory, selectedTag, searchQuery, blogs]);

    // Format date
    const formatDate = (timestamp) => {
        if (!timestamp) return "Recently";
        const date = new Date(timestamp);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    // Strip HTML tags for preview
    const stripHtml = (html) => {
        if (!html) return "";
        const tmp = document.createElement("DIV");
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || "";
    };

    // Prevent body scroll when drawer is open
    useEffect(() => {
        if (openBlog) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [openBlog]);

    return (
        <div className="flex flex-col w-full">
            {/* Enhanced Hero Section */}
            <section className="w-full relative bg-gradient-to-br from-[#0f3069] via-[#1a4d8f] to-[#0f3069] py-32 text-center mt-40 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-[#ff6575] rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
                </div>
                <div className="relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex items-center justify-center gap-3 mb-4"
                    >
                        <Sparkles className="h-10 w-10 text-[#ff6575]" />
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white">
                            Our Blogs
                        </h2>
                    </motion.div>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-gray-200 text-lg sm:text-xl mt-4 max-w-3xl mx-auto px-4"
                    >
                        Insights, tips, and knowledge to accelerate your learning journey
                    </motion.p>
                </div>
            </section>

            <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-b from-gray-50 to-white w-full">
                <div className="w-full max-w-7xl mx-auto px-4 lg:px-6 flex flex-col lg:flex-row gap-6 py-8">

                    {/* Mobile Filter Toggle */}
                    <div className="lg:hidden mb-4">
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#ff6575] to-[#ff8591] text-white font-bold py-3 px-6 rounded-xl shadow-lg"
                        >
                            <Filter className="h-5 w-5" />
                            {showFilters ? "Hide Filters" : "Show Filters"}
                        </button>
                    </div>

                    {/* LEFT PANEL - FILTERS */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-80 lg:sticky lg:top-24 lg:self-start`}
                    >
                        <div className="bg-white p-6 shadow-xl rounded-2xl border-t-4 border-[#ff6575]">
                            <div className="flex items-center gap-2 mb-6">
                                <Filter className="h-6 w-6 text-[#ff6575]" />
                                <h2 className="text-2xl font-bold text-[#0f3069]">Filters</h2>
                            </div>

                            {/* Search */}
                            <div className="relative mb-6">
                                <input
                                    type="text"
                                    placeholder="Search blogs..."
                                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[#0f3069] focus:ring-4 focus:ring-[#0f3069]/20 outline-none transition-all"
                                    onChange={(e) => setDelaySearch(e.target.value)}
                                />
                                <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            </div>

                            {/* Categories */}
                            <div className="mb-6">
                                <h3 className="font-bold text-[#0f3069] mb-3 flex items-center gap-2">
                                    <BookOpen className="h-5 w-5 text-[#ff6575]" />
                                    Categories
                                </h3>
                                <div className="flex flex-col space-y-2">
                                    {categories.map((cat) => (
                                        <motion.button
                                            key={cat}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => {
                                                setSelectedCategory(cat);
                                                setSelectedTag(null);
                                            }}
                                            className={`p-3 rounded-xl text-left font-semibold transition-all ${selectedCategory === cat
                                                    ? "bg-gradient-to-r from-[#ff6575] to-[#ff8591] text-white shadow-lg"
                                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                                }`}
                                        >
                                            {cat}
                                        </motion.button>
                                    ))}
                                </div>
                            </div>

                            {/* Tags */}
                            {allTags.length > 0 && (
                                <div>
                                    <h3 className="font-bold text-[#0f3069] mb-3 flex items-center gap-2">
                                        <Tag className="h-5 w-5 text-[#ff6575]" />
                                        Tags
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {allTags.map((tag) => (
                                            <motion.span
                                                key={tag}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => setSelectedTag(tag)}
                                                className={`px-3 py-1.5 rounded-full text-sm cursor-pointer font-semibold transition-all ${selectedTag === tag
                                                        ? "bg-gradient-to-r from-[#ff6575] to-[#ff8591] text-white shadow-md"
                                                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                                    }`}
                                            >
                                                #{tag}
                                            </motion.span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>

                    {/* BLOG LIST */}
                    <div className="flex-1">
                        <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                            <AnimatePresence>
                                {filteredBlogs.map((blog, index) => (
                                    <motion.div
                                        key={blog.id}
                                        initial={{ opacity: 0, y: 50 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 50 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        whileHover={{ y: -10, transition: { duration: 0.3 } }}
                                        onClick={() => setOpenBlog(blog)}
                                        className="bg-white shadow-xl rounded-2xl overflow-hidden cursor-pointer hover:shadow-2xl transition-all border-t-4 border-[#ff6575] group"
                                    >
                                        {/* Thumbnail */}
                                        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-[#0f3069] to-[#1a4d8f]">
                                            {blog.thumbnail ? (
                                                <img
                                                    src={blog.thumbnail}
                                                    alt={blog.title}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                />
                                            ) : blog.images && blog.images.length > 0 ? (
                                                <img
                                                    src={blog.images[0]}
                                                    alt={blog.title}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <BookOpen className="h-20 w-20 text-white opacity-50" />
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                                            {blog.category && (
                                                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
                                                    <span className="text-[#0f3069] font-bold text-sm">{blog.category}</span>
                                                </div>
                                            )}

                                            <div className="absolute bottom-3 left-3 flex items-center gap-2 text-white">
                                                <Calendar className="h-4 w-4" />
                                                <span className="text-sm font-semibold">{formatDate(blog.createdAt)}</span>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-5">
                                            <h3 className="text-xl font-bold text-[#0f3069] mb-3 line-clamp-2 leading-tight">
                                                {blog.title}
                                            </h3>
                                            <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                                                {stripHtml(blog.content)}
                                            </p>

                                            {/* Tags */}
                                            {blog.tags && blog.tags.length > 0 && (
                                                <div className="flex flex-wrap gap-2 mb-4">
                                                    {blog.tags.slice(0, 3).map((tag) => (
                                                        <span
                                                            key={tag}
                                                            className="px-2 py-1 bg-gradient-to-r from-pink-100 to-pink-200 text-[#ff6575] text-xs font-semibold rounded-full"
                                                        >
                                                            #{tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}

                                            {/* Read More Button */}
                                            <motion.button
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                className="w-full bg-gradient-to-r from-[#0f3069] to-[#1a4d8f] hover:from-[#ff6575] hover:to-[#ff8591] text-white font-bold py-2.5 px-4 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                                            >
                                                <BookOpen className="h-4 w-4" />
                                                Read More
                                            </motion.button>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>

                            {filteredBlogs.length === 0 && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="col-span-full flex flex-col items-center justify-center py-20"
                                >
                                    <Search className="h-20 w-20 text-gray-300 mb-4" />
                                    <p className="text-center text-gray-500 text-xl font-semibold">
                                        No blogs found.
                                    </p>
                                    <p className="text-center text-gray-400 text-sm mt-2">
                                        Try adjusting your filters or search terms
                                    </p>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* ENHANCED DRAWER */}
            <AnimatePresence>
                {openBlog && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setOpenBlog(null)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                        />

                        {/* Drawer */}
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 h-full w-full md:w-[600px] lg:w-[700px] bg-white shadow-2xl overflow-y-auto z-50"
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setOpenBlog(null)}
                                className="absolute top-4 right-4 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors z-10"
                            >
                                <X className="h-6 w-6 text-gray-700" />
                            </button>

                            {/* Hero Image */}
                            <div className="relative h-80 overflow-hidden">
                                {openBlog.thumbnail ? (
                                    <img
                                        src={openBlog.thumbnail}
                                        alt={openBlog.title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : openBlog.images && openBlog.images.length > 0 ? (
                                    <img
                                        src={openBlog.images[0]}
                                        alt={openBlog.title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-[#0f3069] to-[#1a4d8f] flex items-center justify-center">
                                        <BookOpen className="h-32 w-32 text-white opacity-50" />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

                                {openBlog.category && (
                                    <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                                        <span className="text-[#0f3069] font-bold">{openBlog.category}</span>
                                    </div>
                                )}

                                <div className="absolute bottom-6 left-6 right-6">
                                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">
                                        {openBlog.title}
                                    </h2>
                                    <div className="flex items-center gap-2 text-white">
                                        <Calendar className="h-5 w-5" />
                                        <span className="text-lg font-semibold">{formatDate(openBlog.createdAt)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 md:p-8">
                                {/* Tags */}
                                {openBlog.tags && openBlog.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mb-6 pb-6 border-b border-gray-200">
                                        {openBlog.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-4 py-2 bg-gradient-to-r from-[#ff6575] to-[#ff8591] text-white font-semibold rounded-full text-sm shadow-md"
                                            >
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                {/* Blog Content */}
                                <div
                                    className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                                    dangerouslySetInnerHTML={{ __html: openBlog.content }}
                                />

                                {/* Additional Images */}
                                {openBlog.images && openBlog.images.length > 1 && (
                                    <div className="mt-8">
                                        <h3 className="text-2xl font-bold text-[#0f3069] mb-4 flex items-center gap-2">
                                            <BookOpen className="h-6 w-6 text-[#ff6575]" />
                                            More Images
                                        </h3>
                                        <div className="grid grid-cols-2 gap-4">
                                            {openBlog.images.slice(1).map((img, idx) => (
                                                <img
                                                    key={idx}
                                                    src={img}
                                                    alt={`Blog image ${idx + 2}`}
                                                    className="w-full h-48 object-cover rounded-xl border-2 border-gray-200 shadow-md hover:shadow-xl transition-shadow"
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default BlogsPage;