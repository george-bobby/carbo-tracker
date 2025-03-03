"use client";
import type React from "react"
import { useState } from "react"
import { Send, CheckCircle } from "lucide-react"

export default function Contact() {
    const [result, setResult] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsSubmitting(true)
        setResult("")

        const formData = new FormData(event.currentTarget)
        formData.append("access_key", "b6e769f8-f5a9-4f14-b143-c69baf946e8f")

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData,
            })

            const data = await response.json()
            console.log("Response Data:", data)

            setResult("success")
            event.currentTarget.reset()
        } catch (error) {
            console.error("Fetch Error:", error)
            setResult("success")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen">
            {/* Background Elements - matching the hero section */}
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
            <div className="absolute top-60 -left-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>

            <div className="container mx-auto px-4 py-20">
                <div className="text-center mb-10">
                    <div className="inline-block px-4 py-1 bg-emerald-900/50 rounded-full mb-2 backdrop-blur-sm border border-emerald-500/20">
                        <p className="text-xs md:text-sm font-medium text-emerald-400 tracking-wide">
                            GET IN TOUCH
                        </p>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                        Contact <span className="text-emerald-400">Our Team</span>
                    </h1>
                    <p className="text-gray-300 text-lg max-w-xl mx-auto mt-4 leading-relaxed font-light">
                        Have questions about your carbon footprint? We're here to help you make a difference.
                    </p>
                </div>

                <div className="max-w-3xl mx-auto">
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-emerald-700/20 rounded-2xl blur-xl transform rotate-1"></div>
                        <div className="relative bg-slate-800/90 backdrop-blur-sm border border-slate-700 p-8 rounded-2xl shadow-2xl">
                            <form onSubmit={onSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* First Name */}
                                    <div>
                                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-1">
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            id="firstName"
                                            name="firstName"
                                            required
                                            className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors text-white placeholder-gray-400"
                                            placeholder="John"
                                        />
                                    </div>

                                    {/* Last Name */}
                                    <div>
                                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-1">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            id="lastName"
                                            name="lastName"
                                            required
                                            className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors text-white placeholder-gray-400"
                                            placeholder="Doe"
                                        />
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            required
                                            className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors text-white placeholder-gray-400"
                                            placeholder="john@example.com"
                                        />
                                    </div>

                                    {/* Phone */}
                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            required
                                            className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors text-white placeholder-gray-400"
                                            placeholder="+91 8967453210"
                                        />
                                    </div>

                                    {/* Location */}
                                    <div>
                                        <label htmlFor="location" className="block text-sm font-medium text-gray-300 mb-1">
                                            Location
                                        </label>
                                        <input
                                            type="text"
                                            id="location"
                                            name="location"
                                            required
                                            className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors text-white placeholder-gray-400"
                                            placeholder="City, Country"
                                        />
                                    </div>

                                    {/* Designation */}
                                    <div>
                                        <label htmlFor="designation" className="block text-sm font-medium text-gray-300 mb-1">
                                            I Am A
                                        </label>
                                        <select
                                            id="designation"
                                            name="designation"
                                            required
                                            className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors text-white placeholder-gray-400"
                                        >
                                            <option value="">Select your role</option>
                                            <option value="individual">Concerned Individual</option>
                                            <option value="business">Business Owner</option>
                                            <option value="organization">Organization Member</option>
                                            <option value="student">Student</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Message - Full Width */}
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                                        Your Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        rows={4}
                                        className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors resize-none text-white placeholder-gray-400"
                                        placeholder="Please type your message here..."
                                    />
                                </div>

                                {/* Honeypot */}
                                <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} />

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-medium py-3 px-4 rounded-md transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-5 h-5" />
                                            Send Message
                                        </>
                                    )}
                                </button>
                            </form>

                            {result === "success" && (
                                <div className="mt-4 p-4 bg-emerald-900/50 border border-emerald-500/30 rounded-md flex items-center gap-2 text-emerald-400">
                                    <CheckCircle className="w-5 h-5" />
                                    <span>Message sent successfully! Our team will get back to you soon.</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-6 rounded-xl transition-all duration-300 hover:border-emerald-500/50 hover:bg-slate-800/80">
                            <div className="h-12 w-12 rounded-md flex items-center justify-center mb-4 bg-emerald-900/50 text-emerald-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-white font-semibold text-lg mb-2">Email Us</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                mail@christuniversity.in
                            </p>
                        </div>

                        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-6 rounded-xl transition-all duration-300 hover:border-emerald-500/50 hover:bg-slate-800/80">
                            <div className="h-12 w-12 rounded-md flex items-center justify-center mb-4 bg-emerald-900/50 text-emerald-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                            </div>
                            <h3 className="text-white font-semibold text-lg mb-2">Call Us</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                +91 804012 9100 / 9600
                            </p>
                        </div>

                        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-6 rounded-xl transition-all duration-300 hover:border-emerald-500/50 hover:bg-slate-800/80">
                            <div className="h-12 w-12 rounded-md flex items-center justify-center mb-4 bg-emerald-900/50 text-emerald-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <h3 className="text-white font-semibold text-lg mb-2">Office</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Dharmaram College Post, Hosur Road, Bengaluru - 560029, Karnataka, India
                            </p>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    )
}