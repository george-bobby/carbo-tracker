"use client";
import React from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaFax, FaEnvelope, FaGlobe } from 'react-icons/fa';

export default function Footer() {
    // Function to scroll to the top of the page
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth', // Smooth scroll effect
        });
    };

    return (
        <footer className="bg-[#082444] py-10">
            <div className="container mx-auto px-6 md:px-12 pl-12 text-gray-300">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Contact Details */}
                    <div>
                        <h2 className="text-white font-bold text-lg">CHRIST</h2>
                        <p className="text-sm">(Deemed to be University)</p>
                        <div className="mt-4 space-y-4">
                            <div className="flex items-center gap-4">
                                <FaMapMarkerAlt className="text-l flex-shrink-1" />
                                <p>
                                Hosur Main Road, Bhavani Nagar, S.G. Palya, <br />
                                    Bengaluru - 560029, Karnataka, India
                                </p>
                            </div>
                            <div className="flex items-start gap-4">
                                <FaPhoneAlt className="text-l flex-shrink-0" />
                                <div>
                                    <p>+91 804012 9100</p>
                                    <p>+91 804012 9600</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <FaFax className="text-l" />
                                <p>Fax : 40129000</p>
                            </div>
                            <div className="flex items-start gap-4">
                                <FaEnvelope className="text-l flex-shrink-0" />
                                <a
                                    href="mailto:mail@christuniversity.in"
                                    className="hover:text-blue-500 transition"
                                    style={{ color: 'inherit' }}
                                >
                                    mail@christuniversity.in
                                </a>
                            </div>

                            <div className="flex items-start gap-4">
                                <FaGlobe className="text-l" />
                                <a
                                    href="http://www.christuniversity.in"
                                    className="hover:text-sky-400 transition"
                                >
                                    www.christuniversity.in
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Vision and Mission */}
                    <div>
                        <h3 className="text-white font-serif text-l font-semibold mb-4">Vision</h3>
                        <p className="font-serif text-l leading-relaxed text-gray-300">
                            EXCELLENCE AND SERVICE
                        </p>
                        <h3 className="text-white font-serif text-l font-semibold mt-6 mb-4">Mission</h3>
                        <p className="font-serif text-l leading-relaxed text-gray-300">
                            CHRIST (Deemed to be University) is a nurturing ground for an individual's
                            holistic development to make an effective contribution to society in a dynamic
                            environment.
                        </p>
                    </div>

                    {/* About Us */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                        <img src="ccalogo.webp" alt="CCA Logo" className="mb-4 w-48 h-48 object-contain mx-auto" />
                        <h3 className="text-white font-serif text-l font-semibold mb-4">About Us</h3>
                        <p className="font-serif text-l leading-relaxed text-gray-300 max-w-md">
                        Christites for Climate Action (CCA) is a student-led initiative at CHRIST (Deemed to be University). Focused on promoting sustainability and raising awareness about climate change, CCA inspires eco-friendly practices and aligns with global efforts like the United Nations Sustainable Development Goals, particularly Goal 13.
                    </p>

                    </div>
                    </div>

                {/* Footer Bottom */}
                <div className="mt-10 border-t border-gray-500 pt-6 text-center text-sm">
                    <p>Copyright © CHRIST (Deemed to be University) 2024 | Privacy Policy</p>
                </div>
            </div>

            {/* Scroll to Top Button */}
            <button
                onClick={scrollToTop}
                className="fixed bottom-6 right-6 bg-transparent border-2 border-white text-white p-4 rounded-lg shadow-lg hover:bg-white hover:text-blue-600 transition"
                style={{
                    fontSize: '28px', // Increased size for a thicker arrow
                    zIndex: '1000',
                    width: '60px', // Set width to make it square
                    height: '60px', // Set height to match width for a square shape
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center', // Ensure the text is centered
                    transform: 'translateY(4px)', // Move the arrow slightly down inside the button
                }}
            >
                ↑
            </button>
        </footer>
    );
}
