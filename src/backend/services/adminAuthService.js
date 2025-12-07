import { auth } from "../../firebase/config";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

// LOGIN
export const adminLogin = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
};

// LOGOUT
export const adminLogout = async () => {
    await signOut(auth);
};
