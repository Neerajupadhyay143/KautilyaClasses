import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Plus,
    Minus,
    Pencil,
    Trash2,
    ImagePlus,
    Star,
    Users,
    PlayCircle,
    Clock,
    Loader,
    X,
    Upload,
    BookOpen,
} from "lucide-react";
import {
    collection,
    addDoc,
    getDocs,
    doc,
    updateDoc,
    deleteDoc,
    query,
    orderBy,
} from "firebase/firestore";
import { db } from "../firebase/config.js";
import CloudinaryUpload from "../Components/CloudinaryUpload.jsx"

export default function ManageCourses() {
    const [courses, setCourses] = useState([]);
    const [isCollapseOpen, setIsCollapseOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(false);

    const [thumbnailUrl, setThumbnailUrl] = useState("");
    const [imageUrls, setImageUrls] = useState([]);
    const [showThumbnailUpload, setShowThumbnailUpload] = useState(false);
    const [showImagesUpload, setShowImagesUpload] = useState(false);

    const empty = {
        id: "",
        title: "",
        description: "",
        category: "",
        level: "",
        rating: "",
        students: "",
        lectures: "",
        durationValue: "",
        durationType: "Hours",
        thumbnail: "",
        images: [],
    };
    const [courseData, setCourseData] = useState(empty);

    const coursesCol = collection(db, "courses");

    async function fetchCourses() {
        try {
            const q = query(coursesCol, orderBy("createdAt", "desc"));
            const snap = await getDocs(q);
            const arr = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
            setCourses(arr);
        } catch (err) {
            console.error("Fetch courses err:", err);
            alert("Error fetching courses: " + err.message);
        }
    }

    useEffect(() => {
        fetchCourses();
    }, []);

    const handleInput = (e) => {
        const { name, value } = e.target;
        setCourseData((s) => ({ ...s, [name]: value }));
    };

    const handleThumbnailUpload = (url) => {
        setThumbnailUrl(url);
        setCourseData((s) => ({ ...s, thumbnail: url }));
        setShowThumbnailUpload(false);
    };

    const handleImageUpload = (url) => {
        const newImages = [...imageUrls, url];
        setImageUrls(newImages);
        setCourseData((s) => ({ ...s, images: newImages }));
    };

    const removeImage = (index) => {
        const newImages = imageUrls.filter((_, i) => i !== index);
        setImageUrls(newImages);
        setCourseData((s) => ({ ...s, images: newImages }));
    };

    const resetForm = () => {
        setEditMode(false);
        setThumbnailUrl("");
        setImageUrls([]);
        setCourseData(empty);
        setIsCollapseOpen(false);
        setShowThumbnailUpload(false);
        setShowImagesUpload(false);
    };

    const handleAdd = async () => {
        if (!courseData.title) return alert("Title required!");

        setLoading(true);
        try {
            const now = Date.now();
            const payload = {
                title: courseData.title,
                description: courseData.description || "",
                category: courseData.category || "",
                level: courseData.level || "",
                rating: courseData.rating || "0",
                students: Number(courseData.students) || 0,
                lectures: Number(courseData.lectures) || 0,
                durationValue: courseData.durationValue || "",
                durationType: courseData.durationType || "Hours",
                thumbnail: thumbnailUrl || "",
                images: imageUrls || [],
                createdAt: now,
                updatedAt: now,
            };

            await addDoc(coursesCol, payload);
            await fetchCourses();
            resetForm();
            alert("Course added successfully! 🎉");
        } catch (err) {
            console.error("Add course err:", err);
            alert("Error adding course: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async () => {
        if (!courseData.id) return alert("No course selected for update");

        setLoading(true);
        try {
            const docRef = doc(db, "courses", courseData.id);

            const payload = {
                title: courseData.title,
                description: courseData.description || "",
                category: courseData.category || "",
                level: courseData.level || "",
                rating: courseData.rating || "0",
                students: Number(courseData.students) || 0,
                lectures: Number(courseData.lectures) || 0,
                durationValue: courseData.durationValue || "",
                durationType: courseData.durationType || "Hours",
                thumbnail: thumbnailUrl || courseData.thumbnail || "",
                images: imageUrls.length ? imageUrls : courseData.images || [],
                updatedAt: Date.now(),
            };

            await updateDoc(docRef, payload);
            await fetchCourses();
            resetForm();
            alert("Course updated successfully! ✅");
        } catch (err) {
            console.error("Update err:", err);
            alert("Error updating: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (c) => {
        if (!window.confirm("Delete this course permanently?")) return;
        try {
            await deleteDoc(doc(db, "courses", c.id));
            alert("Deleted successfully!");
            await fetchCourses();
        } catch (err) {
            console.error("Delete err:", err);
            alert("Error deleting: " + err.message);
        }
    };

    const openEdit = (c) => {
        setEditMode(true);
        setCourseData({
            id: c.id,
            title: c.title || "",
            description: c.description || "",
            category: c.category || "",
            level: c.level || "",
            rating: c.rating || "0",
            students: c.students || 0,
            lectures: c.lectures || 0,
            durationValue: c.durationValue || "",
            durationType: c.durationType || "Hours",
            thumbnail: c.thumbnail || "",
            images: c.images || [],
        });
        setThumbnailUrl(c.thumbnail || "");
        setImageUrls(c.images || []);
        setIsCollapseOpen(true);
    };

    return (
        <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <h1 className="text-4xl font-bold text-[#113471] mb-2 flex items-center gap-3">
                    <BookOpen className="h-10 w-10 text-[#ff6575]" />
                    Manage Courses
                </h1>
                <p className="text-gray-600">Create, edit, and manage your course offerings</p>
            </motion.div>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                    if (isCollapseOpen && editMode) resetForm();
                    setIsCollapseOpen((s) => !s);
                    setEditMode(false);
                }}
                className="flex items-center gap-2 bg-gradient-to-r from-[#113471] to-[#1a4a8f] text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 mb-6"
            >
                {isCollapseOpen ? <Minus size={20} /> : <Plus size={20} />}
                {editMode ? "Edit Course" : "Add New Course"}
            </motion.button>

            <AnimatePresence>
                {isCollapseOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35 }}
                        className="overflow-hidden"
                    >
                        <div className="bg-white rounded-2xl border-2 border-gray-200 shadow-xl p-6 mb-6 max-h-[600px] overflow-y-auto">
                            <div className="space-y-5">
                                <div>
                                    <label className="block font-semibold text-gray-700 mb-2">
                                        Course Title *
                                    </label>
                                    <input
                                        name="title"
                                        placeholder="e.g., Complete UPSC Preparation Guide"
                                        value={courseData.title}
                                        onChange={handleInput}
                                        className="border-2 border-gray-300 focus:border-[#113471] focus:ring-4 focus:ring-[#113471]/20 p-3 rounded-xl w-full outline-none transition"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block font-semibold text-gray-700 mb-2">Category</label>
                                        <select
                                            name="category"
                                            value={courseData.category}
                                            onChange={handleInput}
                                            className="border-2 border-gray-300 focus:border-[#113471] focus:ring-4 focus:ring-[#113471]/20 p-3 rounded-xl w-full outline-none transition"
                                        >
                                            <option value="">Select Category</option>
                                            <option value="UPSC">UPSC</option>
                                            <option value="SSC">SSC</option>
                                            <option value="Banking">Banking</option>
                                            <option value="Railways">Railways</option>
                                            <option value="State Exams">State Exams</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block font-semibold text-gray-700 mb-2">Level</label>
                                        <select
                                            name="level"
                                            value={courseData.level}
                                            onChange={handleInput}
                                            className="border-2 border-gray-300 focus:border-[#113471] focus:ring-4 focus:ring-[#113471]/20 p-3 rounded-xl w-full outline-none transition"
                                        >
                                            <option value="">Select Level</option>
                                            <option value="Beginner">Beginner</option>
                                            <option value="Intermediate">Intermediate</option>
                                            <option value="Advanced">Advanced</option>
                                            <option value="All Levels">All Levels</option>
                                        </select>
                                    </div>
                                </div>

                                {/* THUMBNAIL UPLOAD */}
                                <div>
                                    <label className="block font-semibold text-gray-700 mb-2">
                                        <Upload className="inline h-5 w-5 mr-2" />
                                        Thumbnail Image
                                    </label>

                                    {thumbnailUrl ? (
                                        <div className="relative w-full h-48 rounded-xl overflow-hidden border-2 border-gray-200">
                                            <img src={thumbnailUrl} alt="thumbnail" className="w-full h-full object-cover" />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setThumbnailUrl("");
                                                    setCourseData((s) => ({ ...s, thumbnail: "" }));
                                                }}
                                                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
                                            >
                                                <X size={16} />
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            {!showThumbnailUpload ? (
                                                <button
                                                    type="button"
                                                    onClick={() => setShowThumbnailUpload(true)}
                                                    className="w-full h-48 bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-dashed border-blue-300 rounded-xl flex flex-col items-center justify-center hover:border-[#113471] transition cursor-pointer"
                                                >
                                                    <ImagePlus size={40} className="mb-2 text-[#113471]" />
                                                    <p className="font-medium text-gray-600">Click to upload thumbnail</p>
                                                    <p className="text-sm text-gray-400">Cloudinary Upload</p>
                                                </button>
                                            ) : (
                                                <div className="border-2 border-[#113471] rounded-xl p-4">
                                                    <CloudinaryUpload onUpload={handleThumbnailUpload} />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowThumbnailUpload(false)}
                                                        className="mt-3 text-red-600 hover:underline"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>

                                {/* ADDITIONAL IMAGES UPLOAD */}
                                <div>
                                    <label className="block font-semibold text-gray-700 mb-2">
                                        <ImagePlus className="inline h-5 w-5 mr-2" />
                                        Additional Images
                                    </label>

                                    {imageUrls.length > 0 && (
                                        <div className="grid grid-cols-4 gap-3 mb-4">
                                            {imageUrls.map((img, i) => (
                                                <div key={i} className="relative group">
                                                    <img src={img} alt={`img-${i}`} className="w-full h-24 object-cover rounded-lg border-2 border-gray-200" />
                                                    <button
                                                        type="button"
                                                        onClick={() => removeImage(i)}
                                                        className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                                                    >
                                                        <X size={14} />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {!showImagesUpload ? (
                                        <button
                                            type="button"
                                            onClick={() => setShowImagesUpload(true)}
                                            className="w-full py-3 bg-blue-50 border-2 border-dashed border-blue-300 rounded-xl text-[#113471] font-medium hover:bg-blue-100 transition"
                                        >
                                            + Add More Images
                                        </button>
                                    ) : (
                                        <div className="border-2 border-[#113471] rounded-xl p-4">
                                            <CloudinaryUpload onUpload={handleImageUpload} />
                                            <button
                                                type="button"
                                                onClick={() => setShowImagesUpload(false)}
                                                className="mt-3 text-red-600 hover:underline"
                                            >
                                                Done
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="block font-semibold text-gray-700 mb-2">Description</label>
                                    <textarea
                                        name="description"
                                        placeholder="Enter course description..."
                                        value={courseData.description}
                                        onChange={handleInput}
                                        rows="4"
                                        className="border-2 border-gray-300 focus:border-[#113471] focus:ring-4 focus:ring-[#113471]/20 p-3 rounded-xl w-full outline-none transition resize-none"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block font-semibold text-gray-700 mb-2">
                                            <Star className="inline h-4 w-4 mr-1" />
                                            Rating (0-5)
                                        </label>
                                        <input
                                            type="number"
                                            name="rating"
                                            placeholder="4.5"
                                            step="0.1"
                                            min="0"
                                            max="5"
                                            value={courseData.rating}
                                            onChange={handleInput}
                                            className="border-2 border-gray-300 focus:border-[#113471] focus:ring-4 focus:ring-[#113471]/20 p-3 rounded-xl w-full outline-none transition"
                                        />
                                    </div>

                                    <div>
                                        <label className="block font-semibold text-gray-700 mb-2">
                                            <Users className="inline h-4 w-4 mr-1" />
                                            Students
                                        </label>
                                        <input
                                            type="number"
                                            name="students"
                                            placeholder="1200"
                                            value={courseData.students}
                                            onChange={handleInput}
                                            className="border-2 border-gray-300 focus:border-[#113471] focus:ring-4 focus:ring-[#113471]/20 p-3 rounded-xl w-full outline-none transition"
                                        />
                                    </div>

                                    <div>
                                        <label className="block font-semibold text-gray-700 mb-2">
                                            <PlayCircle className="inline h-4 w-4 mr-1" />
                                            Lectures
                                        </label>
                                        <input
                                            type="number"
                                            name="lectures"
                                            placeholder="45"
                                            value={courseData.lectures}
                                            onChange={handleInput}
                                            className="border-2 border-gray-300 focus:border-[#113471] focus:ring-4 focus:ring-[#113471]/20 p-3 rounded-xl w-full outline-none transition"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block font-semibold text-gray-700 mb-2">
                                            <Clock className="inline h-4 w-4 mr-1" />
                                            Duration Value
                                        </label>
                                        <input
                                            type="number"
                                            name="durationValue"
                                            placeholder="100"
                                            value={courseData.durationValue}
                                            onChange={handleInput}
                                            className="border-2 border-gray-300 focus:border-[#113471] focus:ring-4 focus:ring-[#113471]/20 p-3 rounded-xl w-full outline-none transition"
                                        />
                                    </div>
                                    <div>
                                        <label className="block font-semibold text-gray-700 mb-2">Duration Type</label>
                                        <select
                                            name="durationType"
                                            value={courseData.durationType}
                                            onChange={handleInput}
                                            className="border-2 border-gray-300 focus:border-[#113471] focus:ring-4 focus:ring-[#113471]/20 p-3 rounded-xl w-full outline-none transition"
                                        >
                                            <option>Hours</option>
                                            <option>Days</option>
                                            <option>Weeks</option>
                                            <option>Months</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="flex justify-end gap-4 mt-6 pt-6 border-t-2 border-gray-200">
                                    <button
                                        onClick={resetForm}
                                        disabled={loading}
                                        className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl font-semibold transition disabled:opacity-50"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        onClick={editMode ? handleUpdate : handleAdd}
                                        disabled={loading}
                                        className="px-6 py-3 bg-gradient-to-r from-[#113471] to-[#1a4a8f] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition disabled:opacity-50 flex items-center gap-2"
                                    >
                                        {loading ? (
                                            <>
                                                <Loader className="animate-spin" size={20} />
                                                Processing...
                                            </>
                                        ) : (
                                            <>{editMode ? "Update Course" : "Add Course"}</>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {loading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center"
                    >
                        <motion.div
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                            className="bg-white p-8 rounded-2xl shadow-2xl flex flex-col items-center"
                        >
                            <Loader className="animate-spin h-16 w-16 text-[#113471] mb-4" />
                            <p className="text-xl font-bold text-gray-800">Processing...</p>
                            <p className="text-gray-600 mt-2">Please wait while we save your course</p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {courses.map((course) => (
                    <motion.div
                        key={course.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ y: -5 }}
                        className="bg-white border-2 border-gray-200 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all"
                    >
                        <div className="relative h-48">
                            {course.thumbnail ? (
                                <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-[#113471] to-[#1a4a8f] flex items-center justify-center">
                                    <BookOpen className="h-20 w-20 text-white opacity-50" />
                                </div>
                            )}
                            {course.category && (
                                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg">
                                    <span className="text-[#113471] font-bold text-sm">{course.category}</span>
                                </div>
                            )}
                        </div>

                        <div className="p-5">
                            <h3 className="text-xl font-bold text-[#113471] mb-2">{course.title}</h3>
                            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{course.description}</p>

                            {course.level && (
                                <span className="inline-block px-3 py-1 bg-blue-100 text-[#113471] text-xs font-bold rounded-full mb-3">
                                    {course.level}
                                </span>
                            )}

                            <div className="flex justify-between items-center mb-3 text-sm">
                                <span className="flex items-center gap-1 text-yellow-500">
                                    <Star size={16} className="fill-yellow-500" /> {course.rating || 0}
                                </span>
                                <span className="flex items-center gap-1 text-blue-600">
                                    <Users size={16} /> {course.students || 0}
                                </span>
                                <span className="flex items-center gap-1 text-green-600">
                                    <PlayCircle size={16} /> {course.lectures || 0}
                                </span>
                            </div>

                            <div className="flex items-center gap-2 text-sm text-gray-700 mb-4">
                                <Clock size={16} className="text-[#ff6575]" />
                                <span className="font-semibold">{course.durationValue} {course.durationType}</span>
                            </div>

                            <div className="flex justify-between gap-2 pt-4 border-t-2 border-gray-100">
                                <button
                                    onClick={() => openEdit(course)}
                                    className="flex-1 flex items-center justify-center gap-1 text-blue-600 hover:bg-blue-50 py-2 rounded-lg transition font-semibold"
                                >
                                    <Pencil size={18} /> Edit
                                </button>

                                <button
                                    onClick={() => handleDelete(course)}
                                    className="flex-1 flex items-center justify-center gap-1 text-red-600 hover:bg-red-50 py-2 rounded-lg transition font-semibold"
                                >
                                    <Trash2 size={18} /> Delete
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}