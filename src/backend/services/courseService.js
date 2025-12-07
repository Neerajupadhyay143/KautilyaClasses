import { db } from "../../firebase/config";
import {
    collection,
    addDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    doc,
} from "firebase/firestore";

// ADD
export const addCourse = async (data) => {
    await addDoc(collection(db, "courses"), data);
};

// GET ALL
export const getCourses = async () => {
    const snapshot = await getDocs(collection(db, "courses"));
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
};

// UPDATE
export const updateCourse = async (id, data) => {
    await updateDoc(doc(db, "courses", id), data);
};

// DELETE
export const deleteCourse = async (id) => {
    await deleteDoc(doc(db, "courses", id));
};
