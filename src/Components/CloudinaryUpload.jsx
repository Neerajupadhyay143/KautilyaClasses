import { useState } from "react";

export default function CloudinaryUpload({ onUpload }) {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState("");

    const CLOUD_NAME = "dxfdkv18c";   // <-- yaha apna cloud name daalo
    const UPLOAD_PRESET = "Kautilya_Law_Institute"; // <-- yaha apna upload preset daalo

    const handleUpload = async () => {
        if (!image) return alert("Please select an image!");

        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", UPLOAD_PRESET);

        const res = await fetch(
            `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
            {
                method: "POST",
                body: formData,
            }
        );

        const data = await res.json();
        console.log("Cloudinary Response:", data);

        onUpload(data.secure_url); // <-- Return URL to parent
        alert("Image Uploaded!");
    };

    return (
        <div className="p-4 border rounded-xl bg-gray-50">
            <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                    setImage(e.target.files[0]);
                    setPreview(URL.createObjectURL(e.target.files[0]));
                }}
            />

            {preview && (
                <img
                    src={preview}
                    alt="preview"
                    className="h-32 w-auto mt-3 rounded-xl shadow"
                />
            )}

            <button
                onClick={handleUpload}
                className="mt-3 px-4 py-2 bg-purple-600 text-white rounded-lg"
            >
                Upload Image
            </button>
        </div>
    );
}
