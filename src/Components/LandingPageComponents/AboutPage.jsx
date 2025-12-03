import React, { useEffect, useState } from "react";
import { CheckCircle, Star, Video, BookOpen, Users, Play } from "lucide-react";

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
            fadeIn: {
                initial: { opacity: 0 },
                animate: { opacity: 1 }
            },
            slideLeft: {
                initial: { opacity: 0, transform: 'translateX(-30px)' },
                animate: { opacity: 1, transform: 'translateX(0)' }
            },
            slideRight: {
                initial: { opacity: 0, transform: 'translateX(30px)' },
                animate: { opacity: 1, transform: 'translateX(0)' }
            },
            scale: {
                initial: { opacity: 0, transform: 'scale(0.9)' },
                animate: { opacity: 1, transform: 'scale(1)' }
            }
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
            <section className="w-full bg-[#0f3069] py-28 text-center mt-40">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">About</h1>
                <p className="text-gray-200">
                    <span className="text-[#ff6575] font-semibold">Home</span> / About
                </p>
            </section>


            {/* ==== FIRST ABOUT SECTION ==== */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-10 items-center">

                    {/* Left */}
                    <Motion>
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-[#0f3069] mb-6">
                                Turning Your Career Dreams into Reality
                            </h2>
                            <p className="text-gray-600 mb-6 text-lg">
                                At Kautilya Law Institute, we believe that every student
                                deserves a fair chance to study at a dream university.
                                Our CUET coaching program is designed with clarity,
                                consistency and confidence-building in mind.
                            </p>

                            <div className="space-y-4">
                                {[
                                    {
                                        title: "Comprehensive Coverage:",
                                        text: "Language, Domain Subjects, and General Test — all under one roof",
                                    },
                                    {
                                        title: "Performance Tracking:",
                                        text: "Regular reports & personalized feedback",
                                    },
                                    {
                                        title: "Student-Centric Support:",
                                        text: "Unlimited doubt-solving sessions",
                                    },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <CheckCircle className="h-6 w-6 text-[#ff6575]" />
                                        <p className="text-gray-700">
                                            <span className="font-semibold">{item.title}</span> {item.text}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Motion>

                    {/* Right Image */}
                    <Motion>
                        <div className="relative">
                            <img
                                src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&h=600&fit=crop"
                                className="rounded-2xl shadow-2xl"
                            />

                            <div className="absolute -top-6 -right-6 bg-[#ff6575] p-4 rounded-xl shadow-xl">
                                <div className="flex gap-1 mb-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="h-4 w-4 text-white fill-white" />
                                    ))}
                                </div>
                                <p className="text-white font-semibold text-sm">
                                    90% Satisfaction
                                </p>
                            </div>
                        </div>
                    </Motion>

                </div>
            </section>


            {/* ==== IMAGE + FEATURES SECTION ==== */}
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
                            10 years Glory of success
                        </span>

                        <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6">
                            Some reasons why Start Your Online Learning with Us
                        </h2>

                        <div className="space-y-5">
                            {[
                                {
                                    icon: <Video className="h-10 w-10 text-[#ff6575]" />,
                                    title: "Expert Faculty & Live Doubt Sessions",
                                    desc: "Learn from experienced teachers with real-time support.",
                                },
                                {
                                    icon: <BookOpen className="h-10 w-10 text-[#ff6575]" />,
                                    title: "Recorded Lectures & Study Materials",
                                    desc: "Revisit lessons anytime with high-quality resources.",
                                },
                                {
                                    icon: <Users className="h-10 w-10 text-[#ff6575]" />,
                                    title: "Regular Tests & Performance Analysis",
                                    desc: "Stay exam-ready with weekly mock tests.",
                                },
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4 items-start">
                                    <div className="text-3xl">{item.icon}</div>
                                    <div>
                                        <h4 className="text-xl font-semibold">{item.title}</h4>
                                        <p className="text-gray-600">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </section>


            {/* ==== ABOUT US SECTION (GOVT EXAMS) ==== */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">

                    {/* LEFT TEXT */}
                    <div>
                        <span className="text-[#ff6575] font-semibold uppercase">Start Today</span>
                        <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6">About Us</h2>

                        <p className="text-gray-700 leading-relaxed mb-6">
                            At Kautilya Vision Classes, we provide comprehensive preparation
                            for SSC, Railways, CET, Defence & Delhi Police exams. Whether you
                            aim for CGL, CPO, Delhi Police, Railway Exams, or AFCAT—our expert
                            faculty guides you every step.
                        </p>

                        <ul className="space-y-3">
                            {[
                                "Quantitative Aptitude",
                                "Reasoning Ability",
                                "General Science",
                                "General Knowledge",
                                "English Language",
                                "Computer Applications",
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3">
                                    <CheckCircle className="h-5 w-5 text-[#0f3069]" />
                                    <span className="text-gray-700 font-medium">{item}</span>
                                </li>
                            ))}
                        </ul>

                        <a
                            href="/contact"
                            className="mt-6 inline-block bg-[#ff6575] text-white px-6 py-3 rounded-lg shadow hover:bg-[#ff5065] transition"
                        >
                            Join Now
                        </a>
                    </div>

                    {/* RIGHT IMAGE */}
                    <img
                        src="https://cdn-ileddnh.nitrocdn.com/VvbjSmbBaOfsPQgrBYsFRMPGazgXpDxh/assets/images/optimized/rev-b329085/kautilyavisionclasses.com/wp-content/uploads/2025/05/banner_img-1.png"
                        className="rounded-xl"
                    />
                </div>
            </section>


            {/* ==== STEPS SECTION ==== */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4">

                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                        4 Steps to Start Your Journey with Us
                    </h2>

                    <div className="grid md:grid-cols-2 gap-8">

                        {/* Steps */}
                        <div className="space-y-6">
                            {[
                                {
                                    num: "01",
                                    title: "Connect with Us",
                                    desc: "Visit our center or contact online.",
                                },
                                {
                                    num: "02",
                                    title: "Choose Your Course",
                                    desc: "Select the course that matches your goals.",
                                },
                                {
                                    num: "03",
                                    title: "Enroll & Get Started",
                                    desc: "Complete admission and attend orientation.",
                                },
                                {
                                    num: "04",
                                    title: "Start Your Journey",
                                    desc: "Begin learning with expert guidance.",
                                },
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-4">
                                    <div className="text-3xl font-bold text-[#ff6575]">{item.num}</div>
                                    <div>
                                        <h4 className="text-xl font-semibold">{item.title}</h4>
                                        <p className="text-gray-600">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Video */}
                        <div>
                            <div
                                className="rounded-xl overflow-hidden shadow-xl 
        h-56 sm:h-64 md:h-72 lg:h-80 
        bg-cover bg-center flex items-center justify-center"
                                style={{
                                    backgroundImage:
                                        'url("https://cdn-ileddnh.nitrocdn.com/VvbjSmbBaOfsPQgrBYsFRMPGazgXpDxh/assets/images/optimized/rev-b329085/kautilyavisionclasses.com/wp-content/uploads/2025/08/Kautilya-vision-classes.jpg")',
                                    backgroundSize: "cover",
                                }}
                            >
                                <a
                                    href="https://www.youtube.com/watch?v=GUnnEkENCAc"
                                    target="_blank"
                                    className="bg-white p-4 rounded-full shadow-lg hover:scale-110 transition"
                                >
                                    <Play className="h-8 w-8 text-[#ff6575]" />
                                </a>
                            </div>
                        </div>


                    </div>
                </div>
            </section>

        </div>
    );
}
