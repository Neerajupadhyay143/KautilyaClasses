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
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { db, storage } from "../firebase/config.js"

export default function ManageCourses() {
    // local UI state
    const [courses, setCourses] = useState([]);
    const [isCollapseOpen, setIsCollapseOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);

    // previews & files
    const [thumbnailPreview, setThumbnailPreview] = useState(null);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [thumbnailFile, setThumbnailFile] = useState(null);
    const [imageFiles, setImageFiles] = useState([]);

    // form
    const empty = {
        id: "",
        title: "",
        description: "",
        rating: "",
        students: "",
        lectures: "",
        durationValue: "",
        durationType: "Hours",
        thumbnail: null, // will be object { url, path } from Firestore
        images: [], // array of { url, path }
    };
    const [courseData, setCourseData] = useState(empty);

    const coursesCol = collection(db, "courses");

    // ---------- Firestore helpers ----------
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // ---------- Storage helpers ----------
    // upload single file -> returns { url, path }
    async function uploadFile(file, storagePath) {
        const storageRef = ref(storage, storagePath);
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        return { url, path: storagePath };
    }

    // delete storage object by path
    async function deleteStoragePath(path) {
        if (!path) return;
        try {
            const objRef = ref(storage, path);
            await deleteObject(objRef);
        } catch (err) {
            // not fatal: could be missing or no permission
            console.warn("deleteStoragePath failed:", path, err.message);
        }
    }

    // ---------- Form handlers ----------
    const handleInput = (e) => {
        const { name, value } = e.target;
        setCourseData((s) => ({ ...s, [name]: value }));
    };

    const handleThumbChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setThumbnailFile(file);
        setThumbnailPreview(URL.createObjectURL(file));
    };

    const handleImagesChange = (e) => {
        const files = Array.from(e.target.files || []);
        if (!files.length) return;
        setImageFiles(files);
        setImagePreviews(files.map((f) => URL.createObjectURL(f)));
    };

    const resetForm = () => {
        setEditMode(false);
        setThumbnailPreview(null);
        setImagePreviews([]);
        setThumbnailFile(null);
        setImageFiles([]);
        setCourseData(empty);
        setIsCollapseOpen(false);
    };

    // ---------- Create Course ----------
    const handleAdd = async () => {
        if (!courseData.title) return alert("Title required!");

        try {
            // create a base doc to get ID
            const now = Date.now();
            const base = {
                title: courseData.title,
                description: courseData.description || "",
                rating: courseData.rating || 0,
                students: Number(courseData.students) || 0,
                lectures: Number(courseData.lectures) || 0,
                durationValue: courseData.durationValue || "",
                durationType: courseData.durationType || "Hours",
                thumbnail: null,
                images: [],
                createdAt: now,
                updatedAt: now,
            };
            const docRef = await addDoc(coursesCol, base);
            const courseId = docRef.id;

            // upload thumbnail if provided
            let thumbnailObj = null;
            if (thumbnailFile) {
                const tPath = `courses/${courseId}/thumbnail_${Date.now()}_${thumbnailFile.name}`;
                thumbnailObj = await uploadFile(thumbnailFile, tPath);
            }

            // upload images
            const imagesArr = [];
            for (const f of imageFiles) {
                const p = `courses/${courseId}/images/${Date.now()}_${f.name}`;
                const obj = await uploadFile(f, p);
                imagesArr.push(obj);
            }

            // update doc with URLs/paths
            await updateDoc(doc(db, "courses", courseId), {
                thumbnail: thumbnailObj,
                images: imagesArr,
                updatedAt: Date.now(),
            });

            alert("Course added");
            await fetchCourses();
            resetForm();
        } catch (err) {
            console.error("Add course err:", err);
            alert("Error adding course: " + err.message);
        }
        console.log("Thumbnail uploaded:", thumbnailObj);
        console.log("Images uploaded:", imagesArr);

    };

    // ---------- Update Course ----------
    const handleUpdate = async () => {
        if (!courseData.id) return alert("No course selected for update");

        try {
            const docRef = doc(db, "courses", courseData.id);

            // if thumbnailFile is set -> upload new, delete old
            let thumbnailObj = courseData.thumbnail || null;
            if (thumbnailFile) {
                // delete old if exists
                if (thumbnailObj?.path) await deleteStoragePath(thumbnailObj.path);
                const tPath = `courses/${courseData.id}/thumbnail_${Date.now()}_${thumbnailFile.name}`;
                thumbnailObj = await uploadFile(thumbnailFile, tPath);
            }

            // if new imageFiles provided -> upload them and append (you can change to replace)
            let imagesArr = courseData.images || []; // existing array [{url,path}]
            if (imageFiles.length) {
                // Option: delete existing images if you want replace behavior
                // for (const img of imagesArr) if (img.path) await deleteStoragePath(img.path);
                const uploaded = [];
                for (const f of imageFiles) {
                    const p = `courses/${courseData.id}/images/${Date.now()}_${f.name}`;
                    const obj = await uploadFile(f, p);
                    uploaded.push(obj);
                }
                imagesArr = [...imagesArr, ...uploaded];
            }

            // prepare payload (only fields we want to update)
            const payload = {
                title: courseData.title,
                description: courseData.description || "",
                rating: courseData.rating || 0,
                students: Number(courseData.students) || 0,
                lectures: Number(courseData.lectures) || 0,
                durationValue: courseData.durationValue || "",
                durationType: courseData.durationType || "Hours",
                thumbnail: thumbnailObj,
                images: imagesArr,
                updatedAt: Date.now(),
            };

            await updateDoc(docRef, payload);

            alert("Course updated");
            await fetchCourses();
            resetForm();
        } catch (err) {
            console.error("Update err:", err);
            alert("Error updating: " + err.message);
        }
        console.log("Thumbnail uploaded:", thumbnailObj);
        console.log("Images uploaded:", imagesArr);

    };

    // ---------- Delete Course ----------
    const handleDelete = async (c) => {
        if (!window.confirm("Delete this course permanently?")) return;
        try {
            // delete storage objects first (thumbnail + images)
            if (c.thumbnail?.path) await deleteStoragePath(c.thumbnail.path);
            if (Array.isArray(c.images)) {
                for (const img of c.images) {
                    if (img?.path) await deleteStoragePath(img.path);
                }
            }
            // delete doc
            await deleteDoc(doc(db, "courses", c.id));
            alert("Deleted");
            await fetchCourses();
        } catch (err) {
            console.error("Delete err:", err);
            alert("Error deleting: " + err.message);
        }
    };

    // ---------- Open edit in collapse ----------
    const openEdit = (c) => {
        setEditMode(true);
        setCourseData({
            id: c.id,
            title: c.title || "",
            description: c.description || "",
            rating: c.rating || 0,
            students: c.students || 0,
            lectures: c.lectures || 0,
            durationValue: c.durationValue || "",
            durationType: c.durationType || "Hours",
            thumbnail: c.thumbnail || null,
            images: c.images || [],
        });
        setThumbnailPreview(c.thumbnail?.url || null);
        setImagePreviews((c.images || []).map((im) => im.url));
        setIsCollapseOpen(true);
        // clear pending file selectors (we keep the existing storage objects in courseData.thumbnail/images)
        setThumbnailFile(null);
        setImageFiles([]);
    };

    return (
        <div className="p-6 ">
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-[#113471] mb-2">Manage Courses</h1>
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
                {editMode ? "Edit Courses" : "Add New Courses"}
            </button>

            {/* COLLAPSE BOX */}
            <AnimatePresence>
                {isCollapseOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35 }}
                        className="overflow-hidden bg-white rounded-xl border shadow-xl p-6 mt-6"
                    >
                        <div className="space-y-5">

                            <div>
                                <label className="block font-semibold text-gray-700 mb-2">
                                    Course Title *
                                </label>
                                <input
                                    name="title"
                                    placeholder="Title"
                                    value={courseData.title}
                                    onChange={handleInput}
                                    className="border-2 border-gray-300 focus:border-[#113471] p-3 rounded-lg w-full outline-none transition"
                                />
                            </div>



                            {/* Thumbnail input (hidden input with label) */}
                            <div>
                                <label className="block font-semibold text-gray-700 mb-2">
                                    Thumbnail Image
                                </label>
                                <div className="w-full h-48 bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center relative overflow-hidden hover:border-[#113471] transition group">
                                    {thumbnailPreview ? (
                                        <img src={thumbnailPreview} alt="thumb" className="w-full h-full object-cover" />
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
                                        onChange={handleThumbChange}
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block font-semibold text-gray-700 mb-2">
                                    Course Images
                                </label>
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handleImagesChange}
                                    className="border-2 border-gray-300 focus:border-[#113471] p-3 rounded-lg w-full outline-none transition"
                                />
                            </div>


                            <div className="grid grid-cols-3 gap-3 mb-4">
                                {imagePreviews.map((img, i) => (
                                    <img key={i} src={img} alt={`preview-${i}`} className="w-full h-20 object-cover rounded" />
                                ))}
                            </div>


                            <textarea
                                name="description"
                                placeholder="Description"
                                value={courseData.description}
                                onChange={handleInput}
                                className="border-2 border-gray-300 focus:border-[#113471] p-3 rounded-lg w-full outline-none transition"
                            />

                            <input
                                type="number"
                                name="rating"
                                placeholder="Rating (0 - 5)"
                                value={courseData.rating}
                                onChange={handleInput}
                                className="border-2 border-gray-300 focus:border-[#113471] p-3 rounded-lg w-full outline-none transition"
                            />

                            <input
                                type="number"
                                name="students"
                                placeholder="Students joined"
                                value={courseData.students}
                                onChange={handleInput}
                                className="border-2 border-gray-300 focus:border-[#113471] p-3 rounded-lg w-full outline-none transition"
                            />

                            <input
                                type="number"
                                name="lectures"
                                placeholder="Total Lectures"
                                value={courseData.lectures}
                                onChange={handleInput}
                                className="border-2 border-gray-300 focus:border-[#113471] p-3 rounded-lg w-full outline-none transition"
                            />

                            <div className="flex gap-3">
                                <input
                                    type="number"
                                    name="durationValue"
                                    placeholder="Value"
                                    value={courseData.durationValue}
                                    onChange={handleInput}
                                    className="border-2 border-gray-300 focus:border-[#113471] p-3 rounded-lg w-full outline-none transition"
                                />
                                <select
                                    name="durationType"
                                    value={courseData.durationType}
                                    onChange={handleInput}
                                    className="border-2 border-gray-300 focus:border-[#113471] p-3 rounded-lg w-full outline-none transition"
                                >
                                    <option>Hours</option>
                                    <option>Days</option>
                                    <option>Months</option>
                                    <option>Years</option>
                                </select>
                            </div>

                            <div className="flex justify-end gap-4 mt-5">
                                <button
                                    onClick={() => {
                                        resetForm();
                                    }}
                                    className="px-6 py-3 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-lg font-medium transition"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={editMode ? handleUpdate : handleAdd}
                                    className="px-6 py-3 bg-gradient-to-r from-[#113471] to-[#1a4a8f] text-white rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {editMode ? "Update Course" : "Add Course"}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* CARDS GRID */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {courses.map((course) => (
                    <motion.div
                        key={course.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white border rounded-xl shadow-lg overflow-hidden"
                    >
                        {/* Thumbnail (from storage url) */}
                        <img
                            src={course.thumbnail?.url || ""}
                            alt={course.title}
                            className="w-full h-40 object-cover"
                        />

                        <div className="p-4">
                            <h3 className="text-xl font-bold text-[#113471]">{course.title}</h3>
                            <p className="text-gray-600 text-sm mt-1">{course.description}</p>

                            <div className="flex justify-between mt-3 text-sm">
                                <span className="flex gap-1 text-yellow-500">
                                    <Star size={16} /> {course.rating || 0}
                                </span>
                                <span className="flex gap-1 text-blue-600">
                                    <Users size={16} /> {course.students || 0}
                                </span>
                                <span className="flex gap-1 text-green-600">
                                    <PlayCircle size={16} /> {course.lectures || 0}
                                </span>
                            </div>

                            <div className="flex items-center gap-2 text-sm text-gray-700 mt-2">
                                <Clock size={16} /> {course.durationValue} {course.durationType}
                            </div>

                            <div className="flex justify-between mt-4">
                                <button
                                    onClick={() => openEdit(course)}
                                    className="flex gap-1 text-blue-600 hover:text-blue-800"
                                >
                                    <Pencil size={18} /> Edit
                                </button>

                                <button
                                    onClick={() => handleDelete(course)}
                                    className="flex gap-1 text-red-600 hover:text-red-800"
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
