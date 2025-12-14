import React from "react";
import { motion } from "framer-motion";
import { Shield, Lock, Database, Users, FileText, Mail, Phone, MapPin, CheckCircle, AlertCircle, Eye, UserX, Cookie, Globe, CreditCard } from "lucide-react";

const PrivacyPolicy = () => {
    const sections = [
        {
            id: "info-collect",
            title: "Information We Collect",
            icon: Database,
            color: "from-blue-500 to-blue-600",
            subsections: [
                {
                    title: "Personal Information",
                    icon: Users,
                    items: [
                        "Full Name",
                        "Email Address",
                        "Phone Number",
                        "Date of Birth",
                        "Address/City/State",
                        "Educational information",
                        "Login credentials"
                    ]
                },
                {
                    title: "Payment Information",
                    icon: CreditCard,
                    items: [
                        "Billing details",
                        "Transaction information"
                    ],
                    note: "We do not store your card/bank details. All payments are processed securely through third-party payment gateways."
                },
                {
                    title: "Usage Data",
                    icon: Eye,
                    items: [
                        "IP address",
                        "Device information",
                        "Browser type",
                        "Pages visited, time spent",
                        "Clickstream data"
                    ]
                },
                {
                    title: "Cookies and Tracking",
                    icon: Cookie,
                    items: [
                        "Improve website performance",
                        "Personalize experience",
                        "Store user preferences",
                        "Track analytics"
                    ]
                }
            ]
        },
        {
            id: "how-use",
            title: "How We Use Your Information",
            icon: CheckCircle,
            color: "from-green-500 to-green-600",
            items: [
                "Provide and improve our online/offline classes",
                "Manage student accounts",
                "Process payments and invoices",
                "Send study materials, updates, and notifications",
                "Offer customer support",
                "Improve app and website performance",
                "Conduct analytics and research",
                "Ensure safety and detect fraud"
            ]
        },
        {
            id: "sharing",
            title: "Sharing of Information",
            icon: Globe,
            color: "from-purple-500 to-purple-600",
            content: "We may share your information only in these situations:",
            items: [
                "With trusted service providers (payment gateways, SMS services, analytics tools)",
                "To comply with legal obligations (court orders, government requests)",
                "For business operations (faculties, academic partners)"
            ],
            note: "We never sell or trade your personal information."
        },
        {
            id: "security",
            title: "Data Security",
            icon: Lock,
            color: "from-red-500 to-red-600",
            content: "We use industry-standard safeguards to protect your information from:",
            items: [
                "Unauthorized access",
                "Disclosure",
                "Alteration",
                "Destruction"
            ],
            note: "However, no online transmission is 100% secure, and users accept this inherent risk."
        },
        {
            id: "rights",
            title: "Your Rights",
            icon: UserX,
            color: "from-orange-500 to-orange-600",
            content: "Depending on your location, you may have the right to:",
            items: [
                "Access your data",
                "Correct/update personal details",
                "Request deletion of data",
                "Withdraw consent",
                "Disable cookies"
            ],
            note: "To exercise these rights, contact us at: info@kautilyalawinstitute.com"
        },
        {
            id: "children",
            title: "Children's Privacy",
            icon: Users,
            color: "from-pink-500 to-pink-600",
            content: "Our services are intended for students preparing for competitive exams. We do not knowingly collect data from children under 13 years."
        },
        {
            id: "third-party",
            title: "Third-Party Links",
            icon: Globe,
            color: "from-indigo-500 to-indigo-600",
            content: "Our website/app may contain links to third-party websites. We are not responsible for their privacy practices."
        },
        {
            id: "changes",
            title: "Changes to This Policy",
            icon: FileText,
            color: "from-teal-500 to-teal-600",
            content: "We may update this Privacy Policy periodically. The revised version will be posted with an updated date."
        }
    ];

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
                            <Shield className="h-20 w-20 text-white" />
                        </div>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-4"
                    >
                        Privacy Policy
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-gray-200 text-lg sm:text-xl mt-4 max-w-3xl mx-auto px-4"
                    >
                        Your privacy matters to us. Learn how we protect your data.
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
                    className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl border-2 border-blue-200 shadow-lg mb-12"
                >
                    <p className="text-gray-700 text-lg leading-relaxed">
                        <strong className="text-[#0f3069]">Kautilya Law Institute</strong> is committed to protecting your personal information and ensuring transparency in how we collect, use, and safeguard your data. This Privacy Policy applies to all users of our website, mobile application, online/offline classes, and related services.
                    </p>
                </motion.div>

                {/* Policy Sections */}
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
                                    <p className="text-gray-700 text-lg mb-6">{section.content}</p>
                                )}

                                {/* Subsections (for Information We Collect) */}
                                {section.subsections && (
                                    <div className="space-y-6">
                                        {section.subsections.map((subsection, subIndex) => (
                                            <div key={subIndex} className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl border border-gray-200">
                                                <div className="flex items-center gap-3 mb-4">
                                                    <subsection.icon className="h-6 w-6 text-[#ff6575]" />
                                                    <h3 className="text-xl font-bold text-[#0f3069]">{subsection.title}</h3>
                                                </div>
                                                <ul className="space-y-3">
                                                    {subsection.items.map((item, itemIndex) => (
                                                        <li key={itemIndex} className="flex items-start gap-3">
                                                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                                                            <span className="text-gray-700">{item}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                                {subsection.note && (
                                                    <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
                                                        <p className="text-sm text-gray-700 italic flex items-start gap-2">
                                                            <AlertCircle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                                                            {subsection.note}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Regular Items List */}
                                {section.items && !section.subsections && (
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
                                {section.note && !section.subsections && (
                                    <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded">
                                        <p className="text-sm text-gray-700 font-semibold flex items-start gap-2">
                                            <AlertCircle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
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
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="mt-12 bg-gradient-to-br from-[#0f3069] to-[#1a4d8f] rounded-2xl shadow-2xl overflow-hidden"
                >
                    <div className="p-8 sm:p-10">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                                <Mail className="h-8 w-8 text-white" />
                            </div>
                            <h2 className="text-3xl font-bold text-white">Contact Us</h2>
                        </div>
                        <p className="text-white/90 text-lg mb-8">
                            For questions or concerns regarding your privacy:
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
            </div>
        </div>
    );
};

export default PrivacyPolicy;