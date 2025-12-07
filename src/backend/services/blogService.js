import { db } from "../../firebase/config";
import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    updateDoc,
    doc,
} from "firebase/firestore";

export const addBlog = async (data) => {
    await addDoc(collection(db, "blogs"), data);
};

export const getBlogs = async () => {
    const snap = await getDocs(collection(db, "blogs"));
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};

export const updateBlog = async (id, data) => {
    await updateDoc(doc(db, "blogs", id), data);
};

export const deleteBlog = async (id) => {
    await deleteDoc(doc(db, "blogs", id));
};
