import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

// SAMPLE BLOGS
const blogsData = [
    {
        id: 1,
        title: "Understanding Civil Law",
        category: "Civil",
        tags: ["Court", "Law", "Documents"],
        image: "https://blog.bssei.in/wp-content/uploads/2025/05/Blog-Cover-and-Thumbnail-8-1.webp",
        content:
            "Civil law deals with disputes between individuals and organizations. It includes property law, contract law, family law, etc."
    },
    {
        id: 2,
        title: "Criminal Law Explained",
        category: "Criminal",
        tags: ["Crime", "Investigation"],
        image: "https://blog.bssei.in/wp-content/uploads/2025/05/Blog-Cover-and-Thumbnail-8-1.webp",
        content:
            "Criminal law focuses on acts that are offenses against the public authority, covering crimes, judgments, and punishments."
    },
    {
        id: 3,
        title: "Corporate Law Essentials",
        category: "Corporate",
        tags: ["Business", "Company", "Contracts"],
        image: "https://blog.bssei.in/wp-content/uploads/2025/05/Blog-Cover-and-Thumbnail-8-1.webp",
        content:
            "Corporate law deals with the formation and operations of corporations, contracts, mergers, and compliance."
    },
    {
        id: 4,
        title: "International Law Overview",
        category: "International",
        tags: ["UN", "Global", "Treaties"],
        image: "https://blog.bssei.in/wp-content/uploads/2025/05/Blog-Cover-and-Thumbnail-8-1.webp",
        content:
            "International law covers relations between nations, global treaties, human rights, and international dispute resolution."
    },
];

const categories = ["All", "Civil", "Criminal", "Corporate", "International"];
const allTags = ["Law", "Crime", "Court", "Documents", "Business", "Contracts", "Global", "Treaties"];

const BlogsPage = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedTag, setSelectedTag] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredBlogs, setFilteredBlogs] = useState(blogsData);
    const [delaySearch, setDelaySearch] = useState("");
    const [openBlog, setOpenBlog] = useState(null);

    // SEARCH DELAY (1.8 sec)
    useEffect(() => {
        const timer = setTimeout(() => {
            setSearchQuery(delaySearch);
        }, 1800);
        return () => clearTimeout(timer);
    }, [delaySearch]);

    // FILTERING
    useEffect(() => {
        let results = blogsData;

        if (selectedCategory !== "All") {
            results = results.filter((b) => b.category === selectedCategory);
        }

        if (selectedTag) {
            results = results.filter((b) => b.tags.includes(selectedTag));
        }

        if (searchQuery.trim() !== "") {
            results = results.filter((b) =>
                b.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredBlogs(results);
    }, [selectedCategory, selectedTag, searchQuery]);

    return (

        <>
            <div className="flex flex-col">
                {/* Hero Section */}
                < section className="w-full bg-[#0f3069] py-28 text-center mt-40 " >
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-100">Blogs</h2>
                    <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
                        Prepare for the most popular Indian Government exams with our structured courses.
                    </p>
                </ section>
                <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100 w-full justify-center">

                    <div className=" block lg:flex flex-row md: max-w-7xl px-4 ">
                        {/* LEFT PANEL - FILTERS */}
                        <div className="w-full lg:w-1/4 bg-white p-6 shadow-md mt-6 rounded-lg">
                            <h2 className="text-xl font-bold text-[#0f3069] mb-4">Filters</h2>

                            {/* Search */}
                            <input
                                type="text"
                                placeholder="Search blogs..."
                                className="w-full p-2 border rounded-md mb-6"
                                onChange={(e) => setDelaySearch(e.target.value)}
                            />

                            {/* Categories */}
                            <h3 className="font-semibold text-[#ff6575] mb-2">Categories</h3>
                            <div className="flex flex-col space-y-2 mb-6">
                                {categories.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => { setSelectedCategory(cat); setSelectedTag(null); }}
                                        className={`p-2 rounded-md text-left ${selectedCategory === cat ? "bg-[#ff6575] text-white" : "bg-gray-100"
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>

                            {/* Tags */}
                            <h3 className="font-semibold text-[#ff6575] mb-2">Tags</h3>
                            <div className="flex flex-wrap gap-2">
                                {allTags.map((tag) => (
                                    <span
                                        key={tag}
                                        onClick={() => setSelectedTag(tag)}
                                        className={`px-3 py-1 rounded-full text-sm cursor-pointer ${selectedTag === tag
                                            ? "bg-[#ff6575] text-white"
                                            : "bg-gray-200"
                                            }`}
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* BLOG LIST */}
                        <div className="flex-1 py-6 lg:p-6 md:py-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredBlogs.map((blog) => (
                                <motion.div
                                    key={blog.id}
                                    onClick={() => setOpenBlog(blog)}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer hover:shadow-2xl"
                                >
                                    <img src={blog.image} className="w-full h-40 object-cover" />
                                    <div className="p-4">
                                        <h3 className="text-lg font-bold text-[#0f3069]">{blog.title}</h3>
                                        <p className="text-gray-600 text-sm mt-2 line-clamp-2">{blog.content}</p>
                                    </div>
                                </motion.div>
                            ))}

                            {filteredBlogs.length === 0 && (
                                <p className="text-center col-span-full text-gray-500">No blogs found...</p>
                            )}
                        </div>

                    </div>
                    {/* DRAWER */}
                    <AnimatePresence>
                        {openBlog && (
                            <motion.div
                                initial={{ x: "100%" }}
                                animate={{ x: 0 }}
                                exit={{ x: "100%" }}
                                transition={{ duration: 0.4 }}
                                className="fixed top-0 right-0 h-full w-full sm:w-1/2 lg:w-1/1 bg-white shadow-2xl p-6 overflow-y-auto z-50"
                            >
                                <button
                                    onClick={() => setOpenBlog(null)}
                                    className="absolute top-4 right-4 text-gray-600"
                                >
                                    <X size={26} />
                                </button>

                                <img src={openBlog.image} className="w-full h-52 object-cover rounded-md mt-10" />

                                <h2 className="text-2xl font-bold mt-4 text-[#0f3069]">
                                    {openBlog.title}
                                </h2>

                                <p className="text-gray-700 mt-3">{openBlog.content}</p>

                                <div className="mt-4 space-x-2">
                                    {openBlog.tags.map((t) => (
                                        <span key={t} className="bg-[#ff6575] text-white px-3 py-1 rounded-full text-sm">
                                            #{t}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

        </>
    );
};

export default BlogsPage;
