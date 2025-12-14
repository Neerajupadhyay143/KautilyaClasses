import React from "react";
import { motion } from "framer-motion";
import { FileText, BookOpen, UserCheck, CreditCard, Copyright, UserX, ShieldAlert, RefreshCw, Users, Gavel, Mail, Phone, MapPin, CheckCircle, AlertTriangle, XCircle } from "lucide-react";

const TermsAndConditions = () => {
    const sections = [
        {
            id: "services",
            title: "Services Offered",
            icon: BookOpen,
            color: "from-blue-500 to-blue-600",
            content: "We provide:",
            items: [
                "CLAT Preparation (Online & Offline)",
                "CUET (UG) Coaching",
                "ADA Exam Preparation",
                "Study materials, mock tests, and mentorship programs"
            ],
            note: "The content is for educational purposes only.",
            noteType: "info"
        },
        {
            id: "responsibilities",
            title: "User Responsibilities",
            icon: UserCheck,
            color: "from-green-500 to-green-600",
            content: "By using our services, you agree to:",
            items: [
                "Provide accurate information",
                "Maintain confidentiality of your login details",
                "Not misuse or share study materials illegally",
                "Not record, distribute, or reproduce our content without permission",
                "Use our services legally and ethically"
            ]
        },
        {
            id: "payments",
            title: "Enrollment & Payments",
            icon: CreditCard,
            color: "from-purple-500 to-purple-600",
            items: [
                "Enrollment in courses is confirmed only after successful payment.",
                "All fees are non-refundable, except in special cases decided by management.",
                "Fees may change at any time without prior notice."
            ],
            noteType: "warning"
        },
        {
            id: "intellectual",
            title: "Intellectual Property Rights",
            icon: Copyright,
            color: "from-red-500 to-red-600",
            content: "All content provided by Kautilya Law Institute—including:",
            items: [
                "Lectures",
                "Videos",
                "PDFs",
                "Notes",
                "Mock tests",
                "Website/app content"
            ],
            note: "…are the intellectual property of Kautilya Law Institute. Copying, sharing, or distributing them without written permission is strictly prohibited.",
            noteType: "danger"
        },
        {
            id: "termination",
            title: "User Account Termination",
            icon: UserX,
            color: "from-orange-500 to-orange-600",
            content: "We reserve the right to suspend or terminate accounts if:",
            items: [
                "Any harmful, illegal, or abusive activity is detected",
                "Study material piracy or content sharing occurs",
                "Terms are violated"
            ],
            noteType: "danger"
        },
        {
            id: "liability",
            title: "Limitation of Liability",
            icon: ShieldAlert,
            color: "from-pink-500 to-pink-600",
            content: "We are not responsible for:",
            items: [
                "Technical issues, server downtime, or data loss",
                "Inaccuracies in third-party information",
                "Any losses or damages resulting from the use of our content"
            ],
            note: "Our liability is limited to the maximum extent permitted by law.",
            noteType: "warning"
        },
        {
            id: "refund",
            title: "Refund & Cancellation Policy",
            icon: RefreshCw,
            color: "from-indigo-500 to-indigo-600",
            items: [
                "Fees once paid are not refundable.",
                "Course shifting/upgrade is allowed only at management's discretion.",
                "No refund for lack of usage, dissatisfaction, or personal issues."
            ],
            noteType: "danger"
        },
        {
            id: "attendance",
            title: "Attendance & Class Rules (Offline & Online)",
            icon: Users,
            color: "from-teal-500 to-teal-600",
            content: "Students must:",
            items: [
                "Attend classes regularly",
                "Maintain discipline",
                "Not disturb other learners",
                "Not record or leak classes"
            ],
            note: "We may remove any student violating these rules.",
            noteType: "warning"
        },
        {
            id: "governing",
            title: "Governing Law",
            icon: Gavel,
            color: "from-cyan-500 to-cyan-600",
            content: "These Terms & Conditions are governed by Indian law. Any disputes will be handled in courts under the jurisdiction of Rohtak, Haryana."
        }
    ];

    const getNoteIcon = (type) => {
        switch (type) {
            case "danger": return XCircle;
            case "warning": return AlertTriangle;
            case "info": return CheckCircle;
            default: return CheckCircle;
        }
    };

    const getNoteColor = (type) => {
        switch (type) {
            case "danger": return "bg-red-50 border-red-500 text-red-700";
            case "warning": return "bg-yellow-50 border-yellow-500 text-yellow-700";
            case "info": return "bg-blue-50 border-blue-500 text-blue-700";
            default: return "bg-blue-50 border-blue-500 text-blue-700";
        }
    };

    const getNoteIconColor = (type) => {
        switch (type) {
            case "danger": return "text-red-500";
            case "warning": return "text-yellow-500";
            case "info": return "text-blue-500";
            default: return "text-blue-500";
        }
    };

    return (
        <div className="flex flex-col w-full">
            {/* Hero Section */}
            <section className="w-full relative bg-gradient-to-br from-[#0f3069] via-[#1a4d8f] to-[#0f3069] py-32 text-center mt-40 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-[#ff6575] rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
                </div>
                <div className="relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        className="flex justify-center mb-6"
                    >
                        <div className="p-6 bg-white/10 backdrop-blur-lg rounded-full">
                            <FileText className="h-20 w-20 text-white" />
                        </div>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-4"
                    >
                        Terms & Conditions
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-gray-200 text-lg sm:text-xl mt-4 max-w-3xl mx-auto px-4"
                    >
                        Please read these terms carefully before using our services
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="text-white/80 text-sm mt-4"
                    >
                        Last Updated: 12 December 2025
                    </motion.p>
                </div>
            </section>

            {/* Introduction */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-2xl border-2 border-orange-200 shadow-lg mb-12"
                >
                    <div className="flex items-start gap-4">
                        <AlertTriangle className="h-8 w-8 text-orange-500 flex-shrink-0 mt-1" />
                        <div>
                            <h3 className="text-xl font-bold text-[#0f3069] mb-3">Important Notice</h3>
                            <p className="text-gray-700 text-lg leading-relaxed">
                                By accessing or using <strong className="text-[#0f3069]">Kautilya Law Institute's</strong> website, mobile app, online classes, or offline services, you agree to the following Terms & Conditions. <strong>If you do not agree, please discontinue using our services.</strong>
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Terms Sections */}
                <div className="space-y-8">
                    {sections.map((section, index) => (
                        <motion.div
                            key={section.id}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white rounded-2xl shadow-xl border-t-4 border-[#ff6575] overflow-hidden"
                        >
                            {/* Section Header */}
                            <div className={`bg-gradient-to-r ${section.color} p-6`}>
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                                        <section.icon className="h-8 w-8 text-white" />
                                    </div>
                                    <h2 className="text-2xl sm:text-3xl font-bold text-white">
                                        {index + 1}. {section.title}
                                    </h2>
                                </div>
                            </div>

                            {/* Section Content */}
                            <div className="p-6 sm:p-8">
                                {section.content && (
                                    <p className="text-gray-700 text-lg mb-6 font-medium">{section.content}</p>
                                )}

                                {/* Items List */}
                                {section.items && (
                                    <ul className="space-y-3">
                                        {section.items.map((item, itemIndex) => (
                                            <li key={itemIndex} className="flex items-start gap-3">
                                                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                                                <span className="text-gray-700 text-base">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                {/* Note */}
                                {section.note && (
                                    <div className={`mt-6 p-4 border-l-4 rounded ${getNoteColor(section.noteType)}`}>
                                        <p className="text-sm font-semibold flex items-start gap-2">
                                            {React.createElement(getNoteIcon(section.noteType), {
                                                className: `h-5 w-5 ${getNoteIconColor(section.noteType)} flex-shrink-0 mt-0.5`
                                            })}
                                            {section.note}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Contact Section */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.9 }}
                    className="mt-12 bg-gradient-to-br from-[#0f3069] to-[#1a4d8f] rounded-2xl shadow-2xl overflow-hidden"
                >
                    <div className="p-8 sm:p-10">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                                <Mail className="h-8 w-8 text-white" />
                            </div>
                            <h2 className="text-3xl font-bold text-white">Contact Information</h2>
                        </div>
                        <p className="text-white/90 text-lg mb-8">
                            For legal or support queries:
                        </p>
                        <div className="grid sm:grid-cols-2 gap-6">
                            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
                                <div className="flex items-start gap-3">
                                    <Mail className="h-6 w-6 text-[#ff6575] flex-shrink-0 mt-1" />
                                    <div>
                                        <p className="text-white/70 text-sm mb-1">Email</p>
                                        <a href="mailto:info@kautilyalawinstitute.com" className="text-white font-semibold hover:text-[#ff6575] transition-colors">
                                            info@kautilyalawinstitute.com
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
                                <div className="flex items-start gap-3">
                                    <Phone className="h-6 w-6 text-[#ff6575] flex-shrink-0 mt-1" />
                                    <div>
                                        <p className="text-white/70 text-sm mb-1">Phone</p>
                                        <a href="tel:9996732928" className="text-white font-semibold hover:text-[#ff6575] transition-colors">
                                            9996732928
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
                            <div className="flex items-start gap-3">
                                <MapPin className="h-6 w-6 text-[#ff6575] flex-shrink-0 mt-1" />
                                <div>
                                    <p className="text-white/70 text-sm mb-1">Address</p>
                                    <p className="text-white font-semibold leading-relaxed">
                                        Kautilya Law Institute, 2nd Floor, Delhi Road, Opposite to Agro Mall, Near MDU University Exit Gate No. 2, Rohtak, Haryana
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Final Agreement Notice */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.0 }}
                    className="mt-8 bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl border-2 border-green-200 shadow-lg"
                >
                    <div className="flex items-start gap-4">
                        <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                        <p className="text-gray-700 text-base leading-relaxed">
                            By continuing to use Kautilya Law Institute's services, you acknowledge that you have read, understood, and agree to be bound by these Terms & Conditions.
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default TermsAndConditions;