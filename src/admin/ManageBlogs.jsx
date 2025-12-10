import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, Pencil, Trash2, ImagePlus, X, Calendar, Eye, AlertTriangle, Upload, BookOpen } from "lucide-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
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
import CloudinaryUpload from "../Components/CloudinaryUpload.jsx";

export default function ManageBlogs() {
    const [blogs, setBlogs] = useState([]);
    const [isCollapseOpen, setIsCollapseOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [viewDialogOpen, setViewDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [blogToDelete, setBlogToDelete] = useState(null);
    const [loading, setLoading] = useState(false);

    const [thumbnailUrl, setThumbnailUrl] = useState("");
    const [imageUrls, setImageUrls] = useState([]);
    const [showThumbnailUpload, setShowThumbnailUpload] = useState(false);
    const [showImagesUpload, setShowImagesUpload] = useState(false);

    // Snackbar state
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success",
    });

    const empty = {
        id: "",
        title: "",
        content: "",
        thumbnail: "",
        images: [],
    };

    const [blogData, setBlogData] = useState(empty);

    const blogsCol = collection(db, "blogs");

    // Snackbar handlers
    const showSnackbar = (message, severity = "success") => {
        setSnackbar({ open: true, message, severity });
        setTimeout(() => {
            setSnackbar({ ...snackbar, open: false });
        }, 4000);
    };

    // ---------- Firestore fetch ----------
    const fetchBlogs = async () => {
        try {
            const q = query(blogsCol, orderBy("createdAt", "desc"));
            const snap = await getDocs(q);
            const arr = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
            setBlogs(arr);
        } catch (err) {
            console.error("Fetch blogs err:", err);
            showSnackbar("Error fetching blogs: " + err.message, "error");
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    // ---------- Form handlers ----------
    const resetForm = () => {
        setBlogData(empty);
        setThumbnailUrl("");
        setImageUrls([]);
        setEditMode(false);
        setIsCollapseOpen(false);
        setShowThumbnailUpload(false);
        setShowImagesUpload(false);
    };

    const handleInput = (e) => {
        const { name, value } = e.target;
        setBlogData((s) => ({ ...s, [name]: value }));
    };

    const handleThumbnailUpload = (url) => {
        setThumbnailUrl(url);
        setBlogData((s) => ({ ...s, thumbnail: url }));
        setShowThumbnailUpload(false);
    };

    const handleImageUpload = (url) => {
        const newImages = [...imageUrls, url];
        setImageUrls(newImages);
        setBlogData((s) => ({ ...s, images: newImages }));
    };

    const removeImage = (index) => {
        const newImages = imageUrls.filter((_, i) => i !== index);
        setImageUrls(newImages);
        setBlogData((s) => ({ ...s, images: newImages }));
    };

    // ---------- Add / Update Blog ----------
    const handleAdd = async () => {
        if (!blogData.title) {
            showSnackbar("Title is required!", "warning");
            return;
        }

        setLoading(true);
        try {
            const now = Date.now();
            const payload = {
                title: blogData.title,
                content: blogData.content || "",
                thumbnail: thumbnailUrl || "",
                images: imageUrls || [],
                createdAt: now,
                updatedAt: now,
            };

            await addDoc(blogsCol, payload);
            await fetchBlogs();
            resetForm();
            showSnackbar("Blog added successfully! 🎉", "success");
        } catch (err) {
            console.error("Add blog err:", err);
            showSnackbar("Error adding blog: " + err.message, "error");
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async () => {
        if (!blogData.id) {
            showSnackbar("No blog selected for update", "warning");
            return;
        }

        setLoading(true);
        try {
            const docRef = doc(db, "blogs", blogData.id);

            const payload = {
                title: blogData.title,
                content: blogData.content || "",
                thumbnail: thumbnailUrl || blogData.thumbnail || "",
                images: imageUrls.length ? imageUrls : blogData.images || [],
                updatedAt: Date.now(),
            };

            await updateDoc(docRef, payload);
            await fetchBlogs();
            resetForm();
            showSnackbar("Blog updated successfully! ✨", "success");
        } catch (err) {
            console.error("Update blog err:", err);
            showSnackbar("Error updating blog: " + err.message, "error");
        } finally {
            setLoading(false);
        }
    };

    const openDeleteDialog = (b, e) => {
        e.stopPropagation();
        setBlogToDelete(b);
        setDeleteDialogOpen(true);
    };

    const closeDeleteDialog = () => {
        setDeleteDialogOpen(false);
        setBlogToDelete(null);
    };

    const handleDelete = async () => {
        if (!blogToDelete) return;

        setLoading(true);
        try {
            await deleteDoc(doc(db, "blogs", blogToDelete.id));
            showSnackbar("Blog deleted successfully!", "success");
            fetchBlogs();
            closeDeleteDialog();
        } catch (err) {
            console.error("Delete blog err:", err);
            showSnackbar("Error deleting blog: " + err.message, "error");
        } finally {
            setLoading(false);
        }
    };

    const openEdit = (b, e) => {
        e.stopPropagation();
        setEditMode(true);
        setBlogData({
            id: b.id,
            title: b.title || "",
            content: b.content || "",
            thumbnail: b.thumbnail || "",
            images: b.images || [],
        });
        setThumbnailUrl(b.thumbnail || "");
        setImageUrls(b.images || []);
        setIsCollapseOpen(true);
    };

    const openViewDialog = (b) => {
        setSelectedBlog(b);
        setViewDialogOpen(true);
    };

    const closeViewDialog = () => {
        setViewDialogOpen(false);
        setSelectedBlog(null);
    };

    const stripHtmlAndTruncate = (html, maxLength = 120) => {
        const tmp = document.createElement("div");
        tmp.innerHTML = html;
        const text = tmp.textContent || tmp.innerText || "";
        return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
    };

    const formatDate = (timestamp) => {
        if (!timestamp) return "N/A";
        const date = new Date(timestamp);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
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
                    Manage Blogs
                </h1>
                <p className="text-gray-600">Create, edit, and manage your blog posts</p>
            </motion.div>

            {/* Add/Edit Button */}
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
                {editMode ? "Edit Blog" : "Add New Blog"}
            </motion.button>

            {/* COLLAPSE FORM */}
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
                                        Blog Title *
                                    </label>
                                    <input
                                        name="title"
                                        placeholder="Enter blog title"
                                        value={blogData.title}
                                        onChange={handleInput}
                                        className="border-2 border-gray-300 focus:border-[#113471] focus:ring-4 focus:ring-[#113471]/20 p-3 rounded-xl w-full outline-none transition"
                                    />
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
                                                    setBlogData((s) => ({ ...s, thumbnail: "" }));
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
                                    <label className="block font-semibold text-gray-700 mb-2">
                                        Blog Content
                                    </label>
                                    <ReactQuill
                                        theme="snow"
                                        value={blogData.content}
                                        onChange={(val) => setBlogData((s) => ({ ...s, content: val }))}
                                        className="bg-white rounded-lg"
                                        style={{ minHeight: "250px" }}
                                    />
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
                                        className="px-6 py-3 bg-gradient-to-r from-[#113471] to-[#1a4a8f] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition disabled:opacity-50"
                                    >
                                        {editMode ? "Update Blog" : "Add Blog"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Loading Overlay */}
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
                            <div className="animate-spin h-16 w-16 border-4 border-[#113471] border-t-transparent rounded-full mb-4"></div>
                            <p className="text-xl font-bold text-gray-800">Processing...</p>
                            <p className="text-gray-600 mt-2">Please wait</p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* BLOG CARDS */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {blogs.map((b) => (
                    <motion.div
                        key={b.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ y: -5 }}
                        className="bg-white border-2 border-gray-200 rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden cursor-pointer transition-all"
                        onClick={() => openViewDialog(b)}
                    >
                        <div className="relative overflow-hidden h-56">
                            <img
                                src={b.thumbnail || "https://via.placeholder.com/400x300?text=No+Image"}
                                alt={b.title}
                                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                                <Eye size={32} className="text-white" />
                            </div>
                        </div>

                        <div className="p-5">
                            <h3 className="text-xl font-bold text-[#113471] mb-2 line-clamp-2 hover:text-[#ff6575] transition-colors">
                                {b.title}
                            </h3>

                            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                {stripHtmlAndTruncate(b.content)}
                            </p>

                            <div className="flex items-center text-gray-500 text-xs mb-4">
                                <Calendar size={14} className="mr-1" />
                                {formatDate(b.createdAt)}
                            </div>

                            <div className="flex justify-between items-center pt-4 border-t-2 border-gray-100">
                                <button
                                    onClick={(e) => openEdit(b, e)}
                                    className="flex items-center gap-1 text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition font-semibold"
                                >
                                    <Pencil size={16} /> Edit
                                </button>
                                <button
                                    onClick={(e) => openDeleteDialog(b, e)}
                                    className="flex items-center gap-1 text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg transition font-semibold"
                                >
                                    <Trash2 size={16} /> Delete
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* DELETE CONFIRMATION DIALOG */}
            <AnimatePresence>
                {deleteDialogOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={closeDeleteDialog}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8"
                        >
                            <div className="text-center">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                                    className="mx-auto w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6"
                                >
                                    <AlertTriangle size={40} className="text-red-600" />
                                </motion.div>

                                <h2 className="text-2xl font-bold text-gray-800 mb-3">
                                    Delete Blog?
                                </h2>
                                <p className="text-gray-600 mb-2">
                                    Are you sure you want to delete this blog?
                                </p>
                                {blogToDelete && (
                                    <p className="font-semibold text-[#113471] mb-6">
                                        "{blogToDelete.title}"
                                    </p>
                                )}
                                <p className="text-sm text-red-600 mb-6">
                                    This action cannot be undone.
                                </p>

                                <div className="flex gap-4 justify-center">
                                    <button
                                        onClick={closeDeleteDialog}
                                        className="px-6 py-3 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-lg font-medium transition"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleDelete}
                                        disabled={loading}
                                        className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition disabled:opacity-50"
                                    >
                                        {loading ? "Deleting..." : "Yes, Delete"}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* VIEW DIALOG */}
            <AnimatePresence>
                {viewDialogOpen && selectedBlog && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={closeViewDialog}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col"
                        >
                            <div className="bg-gradient-to-r from-[#113471] to-[#1a4a8f] text-white p-6 flex justify-between items-center">
                                <span className="text-2xl font-bold">Blog Details</span>
                                <button
                                    onClick={closeViewDialog}
                                    className="text-white hover:bg-white/20 p-2 rounded-full transition"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="p-6 overflow-y-auto">
                                <div className="space-y-5">
                                    <div>
                                        <h2 className="text-3xl font-bold text-[#113471] mb-3">
                                            {selectedBlog.title}
                                        </h2>
                                        <div className="flex items-center text-gray-500 text-sm mb-4">
                                            <Calendar size={16} className="mr-2" />
                                            Created: {formatDate(selectedBlog.createdAt)} | Updated:{" "}
                                            {formatDate(selectedBlog.updatedAt)}
                                        </div>
                                    </div>

                                    {selectedBlog.thumbnail && (
                                        <div className="rounded-xl overflow-hidden border-2 border-gray-200">
                                            <img
                                                src={selectedBlog.thumbnail}
                                                alt={selectedBlog.title}
                                                className="w-full h-80 object-cover"
                                            />
                                        </div>
                                    )}

                                    <div className="border-t pt-4">
                                        <h3 className="text-xl font-bold text-gray-800 mb-3">Content</h3>
                                        <div
                                            className="prose max-w-none text-gray-700 leading-relaxed"
                                            dangerouslySetInnerHTML={{ __html: selectedBlog.content }}
                                        />
                                    </div>

                                    {selectedBlog.images && selectedBlog.images.length > 0 && (
                                        <div className="border-t pt-4">
                                            <h3 className="text-xl font-bold text-gray-800 mb-3">
                                                Gallery ({selectedBlog.images.length} images)
                                            </h3>
                                            <div className="grid grid-cols-3 gap-4">
                                                {selectedBlog.images.map((img, i) => (
                                                    <img
                                                        key={i}
                                                        src={img}
                                                        alt={`Gallery ${i + 1}`}
                                                        className="w-full h-32 object-cover rounded-lg border-2 border-gray-200 hover:border-[#113471] transition cursor-pointer"
                                                        onClick={() => window.open(img, "_blank")}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* SNACKBAR */}
            <AnimatePresence>
                {snackbar.open && (
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50"
                    >
                        <div
                            className={`px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 ${snackbar.severity === "success"
                                    ? "bg-green-500 text-white"
                                    : snackbar.severity === "error"
                                        ? "bg-red-500 text-white"
                                        : snackbar.severity === "warning"
                                            ? "bg-yellow-500 text-white"
                                            : "bg-blue-500 text-white"
                                }`}
                        >
                            <span className="font-semibold">{snackbar.message}</span>
                            <button
                                onClick={() => setSnackbar({ ...snackbar, open: false })}
                                className="hover:bg-white/20 p-1 rounded-full transition"
                            >
                                <X size={18} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}