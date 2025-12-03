import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const mailtoLink = `mailto:kautilyavisionclasses@gmail.com?subject=${encodeURIComponent(
            formData.subject
        )}&body=${encodeURIComponent(
            `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\nMessage:\n${formData.message}`
        )}`;

        window.location.href = mailtoLink;
    };

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
        <div className="flex flex-col bg-gray-50">
        
            {/* ==== HERO SECTION ==== */}
            <section className="w-full bg-[#0f3069] py-28 text-center mt-40">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">Contact</h1>
                <p className="text-gray-200">
                    <span className="text-[#ff6575] font-semibold">Home</span> / Contact
                </p>
            </section>


            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Contact Form */}
                    <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
                            Send us a Message
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid sm:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f3069] focus:border-transparent text-sm sm:text-base outline-none"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f3069] focus:border-transparent text-sm sm:text-base outline-none"
                                    />
                                </div>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f3069] focus:border-transparent text-sm sm:text-base outline-none"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                                        Subject *
                                    </label>
                                    <select
                                        id="subject"
                                        name="subject"
                                        required
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f3069] focus:border-transparent text-sm sm:text-base outline-none"
                                    >
                                        <option value="">Select a subject</option>
                                        <option value="product-inquiry">Product Inquiry</option>
                                        <option value="support">Customer Support</option>
                                        <option value="installation">Installation Help</option>
                                        <option value="warranty">Warranty Claim</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                    Message *
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    required
                                    rows={6}
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f3069] focus:border-transparent text-sm sm:text-base outline-none"
                                    placeholder="Please describe your inquiry or how we can help you..."
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
                                Have questions about our products or need help choosing the right bathroom
                                essentials for your space? Our team is here to help!
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

                        {/* Embedded Google Map */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Find Us</h3>
                            <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg">
                                <iframe
                                    title="Kautilya Law Institute Map"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.723236724683!2d76.5923130753425!3d28.89515649101806!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d131f7d189bff%3A0x22d65b6f7847bb9c!2sMaharshi%20Dayanand%20University%20Gate%20No%202!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="absolute top-0 left-0 w-full h-full"
                                ></iframe>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
