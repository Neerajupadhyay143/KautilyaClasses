import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/config";
import { doc, setDoc } from "firebase/firestore";
import {
    onAuthStateChanged,
    signOut,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);  // 🔥 refresh par false

    const googleProvider = new GoogleAuthProvider();

    const playStoreLink =
        "https://play.google.com/store/apps/details?id=com.kautilyalaw.android";

    // 🔹 Redirect only if first time login
    const redirectToAppFirstTime = () => {
        const firstLogin = localStorage.getItem("firstLoginDone");

        if (!firstLogin) {
            localStorage.setItem("firstLoginDone", "true");

            setLoading(true); // loader on
            setTimeout(() => {
                window.location.href = playStoreLink;
            }, 2000);
        }
    };

    function getInitials(fullName) {
        if (!fullName) return "";

        const parts = fullName.trim().split(" ");

        const firstLetter = parts[0]?.charAt(0).toUpperCase() || "";
        const lastLetter = parts[parts.length - 1]?.charAt(0).toUpperCase() || "";

        return firstLetter + lastLetter;
    }


    // 🔹 GOOGLE LOGIN
    const loginWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);

            redirectToAppFirstTime();
            return { success: true };

        } catch (err) {
            return { success: false, error: err.message };
        }
    };

    // 🔹 EMAIL LOGIN
    const loginWithEmail = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);

            redirectToAppFirstTime();
            return { success: true };

        } catch (err) {
            return { success: false, error: err.message };
        }
    };

    // 🔹 REGISTER USER
    const registerUser = async (fullName, email, password) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // 🔹 Create initials  
            const initials = getInitials(fullName);

            // 🔹 Store in Firestore
            await setDoc(doc(db, "users", user.uid), {
                fullName,
                email,
                initials,
                createdAt: new Date(),
            });

            redirectToAppFirstTime();
            return { success: true };

        } catch (err) {
            return { success: false, error: err.message };
        }
    };

    // 🔹 LOGOUT
    const logout = async () => {
        await signOut(auth);
        localStorage.removeItem("firstLoginDone");
    };

    // 🔹 AUTH LISTENING
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);  // 🔥 FIX → Refresh par loader band
        });

        return () => unsub();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                loginWithGoogle,
                loginWithEmail,
                registerUser,
                logout,
                setLoading
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
