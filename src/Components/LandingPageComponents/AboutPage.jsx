import React, { useEffect, useState } from "react";
import { CheckCircle, Star, Video, BookOpen, Users, Play, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
export default function AboutPage() {

    const Motion = ({ children, className, delay = 0, duration = 0.5, type = 'fadeUp' }) => {
        const [isVisible, setIsVisible] = useState(false);
        const ref = React.useRef(null);

        useEffect(() => {
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                    }
                },
                { threshold: 0.1 }
            );

            if (ref.current) {
                observer.observe(ref.current);
            }

            return () => {
                if (ref.current) {
                    observer.unobserve(ref.current);
                }
            };
        }, []);

        const animations = {
            fadeUp: {
                initial: { opacity: 0, transform: 'translateY(30px)' },
                animate: { opacity: 1, transform: 'translateY(0)' }
            },
            fadeIn: { initial: { opacity: 0 }, animate: { opacity: 1 } },
            slideLeft: { initial: { opacity: 0, transform: 'translateX(-30px)' }, animate: { opacity: 1, transform: 'translateX(0)' } },
            slideRight: { initial: { opacity: 0, transform: 'translateX(30px)' }, animate: { opacity: 1, transform: 'translateX(0)' } },
            scale: { initial: { opacity: 0, transform: 'scale(0.9)' }, animate: { opacity: 1, transform: 'scale(1)' } }
        };

        const style = {
            ...animations[type].initial,
            ...(isVisible ? animations[type].animate : {}),
            transition: `all ${duration}s ease-out ${delay}s`
        };

        return (
            <div ref={ref} className={className} style={style}>
                {children}
            </div>
        );
    };

    return (
        <div className="flex flex-col">

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
                            About Us
                        </h2>
                    </motion.div>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-gray-200 text-lg sm:text-xl mt-4 max-w-3xl mx-auto px-4"
                    >
                        Helping learners unlock their potential through simple insights, practical tips, and meaningful guidance.
                    </motion.p>
                </div>
            </section>

            {/* ==== WHO WE ARE ==== */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-10 items-center">

                    {/* Left */}
                    <Motion>
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-[#0f3069] mb-6">
                                Who We Are
                            </h2>

                            <p className="text-gray-700 mb-6 text-lg">
                                Founded in 2015, Kautilya Law Institute has built a strong reputation
                                as one of Rohtak’s most trusted centres for law entrance exam preparation.
                                With over <b>10+ years of legacy</b>, we have guided thousands of aspirants
                                toward success in Judiciary, Attorney exams, CLAT, and CUET(UG).
                            </p>

                            <p className="text-gray-700 text-lg">
                                Our mission is simple — to provide <b>quality education, personalised guidance,
                                    and exam-focused preparation</b> to every student who walks through our doors.
                            </p>
                        </div>
                    </Motion>

                    {/* Right Image */}
                    <Motion>
                        <img
                            src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&h=600&fit=crop"
                            className="rounded-2xl shadow-2xl"
                        />
                    </Motion>

                </div>
            </section>

            {/* ==== OUR JOURNEY ==== */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">

                    {/* LEFT IMAGE */}
                    <img
                        src="https://cdn-ileddnh.nitrocdn.com/VvbjSmbBaOfsPQgrBYsFRMPGazgXpDxh/assets/images/optimized/rev-b329085/kautilyavisionclasses.com/wp-content/uploads/2025/05/img_9-1.png"
                        className="rounded-xl"
                    />

                    {/* RIGHT TEXT */}
                    <div>
                        <span className="text-[#ff6575] font-semibold uppercase tracking-wide">
                            Our Journey
                        </span>

                        <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6">
                            How We Became a Trusted Name in Law Entrance Coaching
                        </h2>

                        <p className="text-gray-700 leading-relaxed mb-6">
                            What began as a small batch of motivated learners has now grown
                            into one of the most trusted law coaching institutes in Haryana.
                            Through consistent results, experienced faculty, and a student-first approach,
                            we have shaped thousands of careers.
                        </p>

                        <p className="text-gray-700">
                            Today, we continue to guide Judiciary, CLAT, CUET(UG) & Law Officer aspirants
                            with the same dedication and passion.
                        </p>
                    </div>

                </div>
            </section>

            {/* ==== OUR FACULTY ==== */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">

                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Faculty</h2>
                        <p className="text-gray-700 mb-6">
                            At Kautilya Law Institute, our core strength lies in our dedicated team
                            of highly qualified and experienced mentors. Each faculty member brings:
                        </p>

                        <ul className="space-y-3">
                            {[
                                "Deep subject knowledge",
                                "Real exam insights",
                                "Years of teaching experience",
                                "Focus on concept clarity",
                                "Exam-oriented problem-solving"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3">
                                    <CheckCircle className="h-5 w-5 text-[#0f3069]" />
                                    <span className="text-gray-700 font-medium">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <img
                        src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                        className="rounded-xl w-80 mx-auto"
                    />
                </div>
            </section>

            {/* ==== WHAT WE OFFER ==== */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4">

                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                        What We Offer
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

                        {[
                            {
                                title: "Comprehensive Classroom Programs",
                                desc: "Concept-building sessions with structured lesson plans."
                            },
                            {
                                title: "High-Quality Class Notes",
                                desc: "Easy-to-understand notes prepared by subject experts."
                            },
                            {
                                title: "Regular Mock Tests (Online + Offline)",
                                desc: "Simulating real exam patterns with detailed analysis."
                            },
                            {
                                title: "Digital Learning & Animated Content",
                                desc: "Modern visual tools that simplify tough concepts."
                            },
                            {
                                title: "Targeted Revision Classes",
                                desc: "Focused sessions to strengthen weak areas."
                            },
                            {
                                title: "Crash Courses",
                                desc: "High-intensity revision programs for last-minute success."
                            },
                            {
                                title: "24/7 Doubt Support",
                                desc: "Because every doubt matters."
                            }
                        ].map((item, i) => (
                            <div key={i} className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-lg transition">
                                <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
                                <p className="text-gray-600">{item.desc}</p>
                            </div>
                        ))}

                    </div>

                </div>
            </section>

            {/* ==== TEACHING APPROACH ==== */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">

                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Teaching Approach</h2>

                        <p className="text-gray-700 mb-6">
                            We combine traditional classroom excellence with modern digital tools:
                        </p>

                        <ul className="space-y-3">
                            {[
                                "Concept clarity",
                                "Regular practice",
                                "Analytical problem-solving",
                                "Performance tracking",
                                "Discipline & consistency",
                                "Individual attention"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3">
                                    <CheckCircle className="h-5 w-5 text-[#0f3069]" />
                                    <span className="text-gray-700 font-medium">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <img
                        src="https://cdn-icons-png.flaticon.com/512/201/201623.png"
                        className="rounded-xl w-72 mx-auto"
                    />
                </div>
            </section>

            {/* ==== ACHIEVEMENTS ==== */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4">

                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
                        Our Achievements
                    </h2>

                    <p className="text-center text-gray-700 max-w-3xl mx-auto mb-12">
                        Over the years, our students have cleared:
                    </p>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

                        {[
                            "Judiciary Exams",
                            "Attorney & Law Officer Exams",
                            "CLAT Undergraduate",
                            "CUET(UG) – Law & Humanities",
                            "Multiple University Entrance Tests"
                        ].map((item, i) => (
                            <div key={i} className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-lg transition text-center">
                                <h4 className="text-xl font-semibold">{item}</h4>
                            </div>
                        ))}

                    </div>

                </div>
            </section>

            {/* ==== FINAL CTA ==== */}
            <section className="py-20 bg-gray-50 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Your Journey Starts Here
                </h2>

                <p className="text-gray-700 max-w-3xl mx-auto mb-8 text-lg">
                    With structured classes, practice tools, expert mentors, mock tests,
                    revision notes, and crash courses—Kautilya Law Institute provides
                    everything you need to prepare for CLAT & CUET(UG).
                </p>

                <a
                    href="/contact"
                    className="bg-[#ff6575] text-white px-8 py-4 rounded-lg shadow hover:bg-[#ff5065] transition text-lg"
                >
                    Join Kautilya Law Institute
                </a>
            </section>

        </div>
    );
}
