import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Sparkles } from 'lucide-react';
import { motion } from "framer-motion";
import CenterLoader from '../Loader/CenterLoader';
import { Snackbar, Alert } from "@mui/material";

const ContactPage = () => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });

    const [loading, setLoading] = useState(false);

    // Snackbar State
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        type: "success",
    });

    const showSnackbar = (msg, type = "success") => {
        setSnackbar({
            open: true,
            message: msg,
            type: type
        });
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    // Form Change Handler
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Submit Handler
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        const mailtoLink = `mailto:kautilyavisionclasses@gmail.com?subject=${encodeURIComponent(
            formData.subject
        )}&body=${encodeURIComponent(
            `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\nMessage:\n${formData.message}`
        )}`;

        setTimeout(() => {
            window.location.href = mailtoLink;
            setLoading(false);
            showSnackbar("Your message has been sent successfully!", "success");

            // Reset form
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: '',
            });
        }, 2000);
    };

    // Contact Info Section
    const contactInfo = [
        {
            icon: MapPin,
            title: 'Visit Our Office',
            details: [
                '2nd Floor, Delhi Rd, near MDU Gate no. 2, opp. Agro Mall,',
                'Maharshi Dayanand University, Rohtak, Haryana',
            ],
        },
        {
            icon: Phone,
            title: 'Call Us',
            details: ['+91-9996732928'],
        },
        {
            icon: Mail,
            title: 'Email Us',
            details: ['kautilyavisionclasses@gmail.com'],
        },
        {
            icon: Clock,
            title: 'Business Hours',
            details: [
                'Mon-Fri: 9:00 AM - 5:00 PM',
                'Sat-Sun: Closed',
            ],
        },
    ];

    return (
        <>
            {loading && <CenterLoader />}

            {/* Snackbar */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={snackbar.type}
                    variant="filled"
                    sx={{ width: "100%" }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>

            <div className="flex flex-col bg-gray-50">

                {/* ==== HERO SECTION ==== */}
                <section className="w-full relative bg-gradient-to-br from-[#0f3069] via-[#1a4d8f] to-[#0f3069] py-32 text-center mt-40 overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-20 left-10 w-72 h-72 bg-[#ff6575] rounded-full blur-3xl"></div>
                        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
                    </div>
                    <div className="relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="flex items-center justify-center gap-3 mb-4"
                        >
                            <Sparkles className="h-10 w-10 text-[#ff6575]" />
                            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white">
                                Contact us
                            </h2>
                        </motion.div>
                    </div>
                </section>

                {/* Main Section */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">

                        {/* Contact Form */}
                        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
                                Send us a Message
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-6">

                                {/* Name + Email */}
                                <div className="grid sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f3069] text-sm sm:text-base outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f3069] text-sm sm:text-base outline-none"
                                        />
                                    </div>
                                </div>

                                {/* Phone + Subject */}
                                <div className="grid sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f3069] text-sm sm:text-base outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Subject *
                                        </label>
                                        <select
                                            name="subject"
                                            required
                                            value={formData.subject}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f3069] text-sm sm:text-base outline-none"
                                        >
                                            <option value="">Select a subject</option>
                                            <option value="clat">CLAT 2026-27</option>
                                            <option value="cuet">CUET (UG)</option>
                                            <option value="mh-cet">MH-CET Law</option>
                                            <option value="mdu">MDU BA-LLB (5 Years)</option>
                                            <option value="state-law">State Law Entrance Exams</option>
                                            <option value="admission">Admission Inquiry</option>
                                            <option value="demo-class">Demo Class Request</option>
                                            <option value="fee-structure">Fee Structure Inquiry</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Message */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Message *
                                    </label>
                                    <textarea
                                        name="message"
                                        required
                                        rows={6}
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f3069] text-sm sm:text-base outline-none"
                                        placeholder="Please describe your inquiry..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-[#ff6575] hover:bg-[#ff6575] text-white font-bold py-3 px-6 rounded-lg transition-colors text-sm sm:text-base"
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>

                        {/* Contact Information */}
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
                                <p className="text-base sm:text-lg text-gray-600 mb-8">
                                    Have questions about our courses? We're here to help!
                                </p>
                            </div>

                            <div className="space-y-6">
                                {contactInfo.map((info, index) => (
                                    <div key={index} className="bg-white rounded-lg shadow-md p-6">
                                        <div className="flex items-start space-x-4">
                                            <div className="bg-gray-100 p-3 rounded-lg flex-shrink-0">
                                                <info.icon className="h-6 w-6 text-[#ff6575]" />
                                            </div>
                                            <div>
                                                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                                                    {info.title}
                                                </h3>
                                                {info.details.map((detail, idx) => (
                                                    <p key={idx} className="text-sm sm:text-base font-semibold text-gray-600">
                                                        {detail}
                                                    </p>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Google Map */}
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Find Us</h3>
                                <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg">
                                    <iframe
                                        title="Kautilya Law Institute Map"
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.723236724683!2d76.5923130753425!3d28.89515649101806!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d131f7d189bff%3A0x22d65b6f7847bb9c!2sMaharshi%20Dayanand%20University%20Gate%20No%202!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                                        allowFullScreen
                                        loading="lazy"
                                        className="absolute top-0 left-0 w-full h-full"
                                    ></iframe>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </>
    );
};

export default ContactPage;
