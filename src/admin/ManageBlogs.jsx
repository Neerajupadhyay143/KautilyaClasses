import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, Pencil, Trash2, ImagePlus, X, Calendar, Eye, AlertTriangle } from "lucide-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    Snackbar,
    Alert,
} from "@mui/material";
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
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { db, storage } from "../firebase/config.js";
import CenterLoader from "../Components/Loader/CenterLoader.jsx";

export default function ManageBlogs() {
    const [blogs, setBlogs] = useState([]);
    const [isCollapseOpen, setIsCollapseOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [viewDialogOpen, setViewDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [blogToDelete, setBlogToDelete] = useState(null);
    const [loading, setLoading] = useState(false);

    // Snackbar state
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success", // success, error, warning, info
    });

    const empty = {
        id: "",
        title: "",
        content: "",
        thumbnail: null,
        images: [],
    };

    const [blogData, setBlogData] = useState(empty);
    const [thumbnailFile, setThumbnailFile] = useState(null);
    const [thumbnailPreview, setThumbnailPreview] = useState(null);
    const [imageFiles, setImageFiles] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);

    const blogsCol = collection(db, "blogs");

    // Snackbar handlers
    const showSnackbar = (message, severity = "success") => {
        setSnackbar({ open: true, message, severity });
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
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

    // ---------- Storage helpers ----------
    const uploadFile = async (file, path) => {
        const storageRef = ref(storage, path);
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        return { url, path };
    };

    const deleteStoragePath = async (path) => {
        if (!path) return;
        try {
            const objRef = ref(storage, path);
            await deleteObject(objRef);
        } catch (err) {
            console.warn("deleteStoragePath failed:", path, err.message);
        }
    };

    // ---------- Form handlers ----------
    const resetForm = () => {
        setBlogData(empty);
        setThumbnailFile(null);
        setThumbnailPreview(null);
        setImageFiles([]);
        setImagePreviews([]);
        setEditMode(false);
        setIsCollapseOpen(false);
    };

    const handleInput = (e) => {
        const { name, value } = e.target;
        setBlogData((s) => ({ ...s, [name]: value }));
    };

    const handleThumbnailChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setThumbnailFile(file);
        setThumbnailPreview(URL.createObjectURL(file));
    };

    const handleImagesChange = (e) => {
        const files = Array.from(e.target.files || []);
        if (!files.length) return;

        const newFiles = [...imageFiles, ...files];
        const newPreviews = [...imagePreviews, ...files.map((f) => URL.createObjectURL(f))];

        setImageFiles(newFiles);
        setImagePreviews(newPreviews);
    };

    const removeNewImage = (index) => {
        const newFiles = imageFiles.filter((_, i) => i !== index);
        const newPreviews = imagePreviews.filter((_, i) => i !== index);
        setImageFiles(newFiles);
        setImagePreviews(newPreviews);
    };

    const removeExistingImage = async (index) => {
        const imageToRemove = blogData.images[index];
        if (imageToRemove?.path) {
            await deleteStoragePath(imageToRemove.path);
        }
        const updatedImages = blogData.images.filter((_, i) => i !== index);
        setBlogData((s) => ({ ...s, images: updatedImages }));
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
            const base = {
                title: blogData.title,
                content: blogData.content || "",
                thumbnail: null,
                images: [],
                createdAt: now,
                updatedAt: now,
            };
            const docRef = await addDoc(blogsCol, base);

            let thumbnailObj = null;
            if (thumbnailFile) {
                const tPath = `blogs/${docRef.id}/thumbnail_${Date.now()}_${thumbnailFile.name}`;
                thumbnailObj = await uploadFile(thumbnailFile, tPath);
            }

            const imagesArr = [];
            for (const f of imageFiles) {
                const p = `blogs/${docRef.id}/images/${Date.now()}_${f.name}`;
                const obj = await uploadFile(f, p);
                imagesArr.push(obj);
            }

            await updateDoc(doc(db, "blogs", docRef.id), {
                thumbnail: thumbnailObj,
                images: imagesArr,
                updatedAt: Date.now(),
            });

            showSnackbar("Blog added successfully! 🎉", "success");
            fetchBlogs();
            resetForm();
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

            let thumbnailObj = blogData.thumbnail || null;
            if (thumbnailFile) {
                if (thumbnailObj?.path) await deleteStoragePath(thumbnailObj.path);
                const tPath = `blogs/${blogData.id}/thumbnail_${Date.now()}_${thumbnailFile.name}`;
                thumbnailObj = await uploadFile(thumbnailFile, tPath);
            }

            let imagesArr = blogData.images || [];
            if (imageFiles.length) {
                const uploaded = [];
                for (const f of imageFiles) {
                    const p = `blogs/${blogData.id}/images/${Date.now()}_${f.name}`;
                    const obj = await uploadFile(f, p);
                    uploaded.push(obj);
                }
                imagesArr = [...imagesArr, ...uploaded];
            }

            await updateDoc(docRef, {
                ...blogData,
                thumbnail: thumbnailObj,
                images: imagesArr,
                updatedAt: Date.now(),
            });

            showSnackbar("Blog updated successfully! ✨", "success");
            fetchBlogs();
            resetForm();
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
            if (blogToDelete.thumbnail?.path) await deleteStoragePath(blogToDelete.thumbnail.path);
            if (Array.isArray(blogToDelete.images)) {
                for (const img of blogToDelete.images) {
                    if (img?.path) await deleteStoragePath(img.path);
                }
            }
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
            thumbnail: b.thumbnail || null,
            images: b.images || [],
        });
        setThumbnailPreview(b.thumbnail?.url || null);
        setImagePreviews([]);
        setThumbnailFile(null);
        setImageFiles([]);
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
        <div className="p-6 max-w-7xl mx-auto">
            {/* Loading Overlay */}
            {loading && <CenterLoader />}

            <div className="mb-8">
                <h1 className="text-4xl font-bold text-[#113471] mb-2">Manage Blogs</h1>
                <p className="text-gray-600">Create, edit, and manage your blog posts</p>
            </div>

            {/* Add/Edit Button */}
            <button
                onClick={() => {
                    if (isCollapseOpen && editMode) resetForm();
                    setIsCollapseOpen((s) => !s);
                    setEditMode(false);
                }}
                className="flex items-center gap-2 bg-gradient-to-r from-[#113471] to-[#1a4a8f] text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
                {isCollapseOpen ? <Minus size={20} /> : <Plus size={20} />}
                {editMode ? "Edit Blog" : "Add New Blog"}
            </button>

            {/* COLLAPSE FORM */}
            <AnimatePresence>
                {isCollapseOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35 }}
                        className="overflow-hidden bg-white rounded-2xl border-2 border-gray-200 shadow-xl p-6 mt-6"
                    >
                        <h2 className="text-2xl font-bold text-[#113471] mb-6">
                            {editMode ? "Edit Blog" : "Create New Blog"}
                        </h2>

                        <div className="space-y-5">
                            <div>
                               
                                <input
                                    name="title"
                                    placeholder="Enter blog title"
                                    value={blogData.title}
                                    onChange={handleInput}
                                    className="border-2 border-gray-300 focus:border-[#113471] p-3 rounded-lg w-full outline-none transition"
                                />
                            </div>

                            <div>
                                <label className="block font-semibold text-gray-700 mb-2">
                                    Thumbnail Image
                                </label>
                                <div className="w-full h-48 bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center relative overflow-hidden hover:border-[#113471] transition group">
                                    {thumbnailPreview ? (
                                        <>
                                            <img
                                                src={thumbnailPreview}
                                                alt="thumb"
                                                className="w-full h-full object-cover"
                                            />
                                            <button
                                                onClick={() => {
                                                    setThumbnailFile(null);
                                                    setThumbnailPreview(null);
                                                }}
                                                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
                                            >
                                                <X size={16} />
                                            </button>
                                        </>
                                    ) : (
                                        <div className="text-gray-500 flex flex-col items-center">
                                            <ImagePlus size={40} className="mb-2" />
                                            <p className="font-medium">Click to upload thumbnail</p>
                                            <p className="text-sm text-gray-400">PNG, JPG up to 10MB</p>
                                        </div>
                                    )}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleThumbnailChange}
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block font-semibold text-gray-700 mb-2">
                                    Additional Images
                                </label>
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handleImagesChange}
                                    className="border-2 border-gray-300 focus:border-[#113471] p-3 w-full rounded-lg outline-none transition file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#113471] file:text-white hover:file:bg-[#0d2a59] file:cursor-pointer"
                                />

                                {editMode && blogData.images && blogData.images.length > 0 && (
                                    <div className="mt-4">
                                        <p className="text-sm font-semibold text-gray-600 mb-2">Existing Images:</p>
                                        <div className="grid grid-cols-4 gap-3">
                                            {blogData.images.map((img, i) => (
                                                <div key={i} className="relative group">
                                                    <img
                                                        src={img.url}
                                                        alt={`existing-${i}`}
                                                        className="w-full h-24 object-cover rounded-lg border-2 border-gray-200"
                                                    />
                                                    <button
                                                        onClick={() => removeExistingImage(i)}
                                                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition hover:bg-red-600"
                                                    >
                                                        <X size={14} />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {imagePreviews.length > 0 && (
                                    <div className="mt-4">
                                        <p className="text-sm font-semibold text-gray-600 mb-2">
                                            New Images to Upload:
                                        </p>
                                        <div className="grid grid-cols-4 gap-3">
                                            {imagePreviews.map((img, i) => (
                                                <div key={i} className="relative group">
                                                    <img
                                                        src={img}
                                                        alt={`preview-${i}`}
                                                        className="w-full h-24 object-cover rounded-lg border-2 border-blue-300"
                                                    />
                                                    <button
                                                        onClick={() => removeNewImage(i)}
                                                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition hover:bg-red-600"
                                                    >
                                                        <X size={14} />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
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

                            <div className="flex justify-end gap-4 pt-4">
                                <button
                                    onClick={resetForm}
                                    className="px-6 py-3 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-lg font-medium transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={editMode ? handleUpdate : handleAdd}
                                    disabled={loading}
                                    className="px-6 py-3 bg-gradient-to-r from-[#113471] to-[#1a4a8f] text-white rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {editMode ? "Update Blog" : "Add Blog"}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* BLOG CARDS */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {blogs.map((b) => (
                    <motion.div
                        key={b.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white border-2 border-gray-200 rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden cursor-pointer transform hover:scale-[1.02] transition-all duration-300 group"
                        onClick={() => openViewDialog(b)}
                    >
                        <div className="relative overflow-hidden h-56">
                            <img
                                src={b.thumbnail?.url || "https://via.placeholder.com/400x300?text=No+Image"}
                                alt={b.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                                <Eye size={32} className="text-white" />
                            </div>
                        </div>

                        <div className="p-5">
                            <h3 className="text-xl font-bold text-[#113471] mb-2 line-clamp-2 group-hover:text-[#ff6575] transition-colors">
                                {b.title}
                            </h3>

                            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                {stripHtmlAndTruncate(b.content)}
                            </p>

                            <div className="flex items-center text-gray-500 text-xs mb-4">
                                <Calendar size={14} className="mr-1" />
                                {formatDate(b.createdAt)}
                            </div>

                            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                                <button
                                    onClick={(e) => openEdit(b, e)}
                                    className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium transition"
                                >
                                    <Pencil size={16} /> Edit
                                </button>
                                <button
                                    onClick={(e) => openDeleteDialog(b, e)}
                                    className="flex items-center gap-1 text-red-600 hover:text-red-800 font-medium transition"
                                >
                                    <Trash2 size={16} /> Delete
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* DELETE CONFIRMATION DIALOG */}
            <Dialog
                open={deleteDialogOpen}
                onClose={closeDeleteDialog}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    style: {
                        borderRadius: "16px",
                    },
                }}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <DialogContent className="p-8 text-center">
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
                            This action cannot be undone. All images and content will be permanently deleted.
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
                                className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? "Deleting..." : "Yes, Delete"}
                            </button>
                        </div>
                    </DialogContent>
                </motion.div>
            </Dialog>

            {/* VIEW DIALOG */}
            <Dialog
                open={viewDialogOpen}
                onClose={closeViewDialog}
                maxWidth="md"
                fullWidth
                PaperProps={{
                    style: {
                        borderRadius: "16px",
                        maxHeight: "90vh",
                    },
                }}
            >
                <DialogTitle className="bg-gradient-to-r from-[#113471] to-[#1a4a8f] text-white">
                    <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold">Blog Details</span>
                        <IconButton onClick={closeViewDialog} sx={{ color: "white" }}>
                            <X />
                        </IconButton>
                    </div>
                </DialogTitle>

                <DialogContent className="p-6 mt-4">
                    {selectedBlog && (
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

                            {selectedBlog.thumbnail?.url && (
                                <div className="rounded-xl overflow-hidden border-2 border-gray-200">
                                    <img
                                        src={selectedBlog.thumbnail.url}
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
                                                src={img.url}
                                                alt={`Gallery ${i + 1}`}
                                                className="w-full h-32 object-cover rounded-lg border-2 border-gray-200 hover:border-[#113471] transition cursor-pointer"
                                                onClick={() => window.open(img.url, "_blank")}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            {/* SNACKBAR */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={snackbar.severity}
                    variant="filled"
                    sx={{ width: "100%" }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </div>
    );
}