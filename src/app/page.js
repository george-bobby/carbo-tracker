"use client";

import Spinner from "../components/Spinner";
import Link from "next/link";
import Header from "../components/Header";
import Footer from './components/Footer.jsx'; 
import {
  ClerkLoaded,
  ClerkLoading,
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Image from "next/image";
import React from "react";
import "./page.css";

export default function Page() {
  const { user } = useUser();

  return (
    <>
      <div className="min-h-screen bg-[#e8e6d7] py-6 flex flex-col gap-6 px-4 lg:px-16 md:px-10 sm:px-8">
        {/* Header Section */}
        <div>
            <Header />
</div>

        {/* Main Content Section */}
        <div className="bg-[#fdd7b0] p-6 rounded-lg shadow-md md:w-3/4 sm:w-3/5 w-full mx-auto mt-4">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 text-center">
            What's Your Carbon Footprint? 🌍
          </h2>
          <p className="text-sm md:text-lg text-gray-700 leading-snug">
            Your carbon footprint is the mark you leave on the planet—measuring
            the greenhouse gases from your daily activities, like commuting,
            cooking, or streaming your favorite shows.
          </p>
          <p className="text-sm md:text-lg text-gray-700 leading-snug mt-4">
            <strong>Why does it matter?</strong> Because small changes in your
            habits can lead to big wins for the environment! Tracking your carbon
            footprint helps you live smarter, cleaner, and more sustainably—making
            the planet happier one step at a time.
          </p>
          <p className="text-sm md:text-lg text-gray-700 leading-snug mt-4 text-center font-semibold">
            Let’s start your journey to greener living! 🌟
          </p>
        </div>

{/* About Us Section */}
<div className="rounded-xl w-full h-72 bg-[#b5bf96] md:p-10 sm:p-8 p-6 flex flex-col">
  <h3 className="text-4xl text-center font-bold mb-4">About Us</h3>
  <p className="text-lg md:text-xl text-gray-600 leading-snug">
    At Carbo, we simplify carbon footprint tracking to help individuals and organizations take meaningful steps toward sustainability. With actionable insights and personalized strategies, we empower you to understand your impact and make informed, eco-friendly choices. Together, we can create a greener, more sustainable future for generations to come. Our commitment to innovation and community engagement drives us to continuously improve and inspire positive change.
  </p>
</div>



        {/* Hero and Section Content */}
        <section className="text-center bg-[#e0dfce] w-full flex flex-col items-center justify-center font-['Roboto']">
          <div className="w-full max-w-screen-xl p-6 rounded-lg bg-[#d5d3bf]">
            {/* Motivation */}
            <header className="mb-10">
              <p className="text-lg md:text-xl text-gray-600 mt-2 leading-relaxed font-bold">
                Empowering sustainable living with innovative carbon footprint
                tracking and actionable insights.
              </p>
            </header>

            {/* Detailed Sections */}
            {[
              {
                title: "Understanding Your Carbon Footprint 🍃",
                image: "/a2.webp",
                text: "From transportation choices to daily habits, monitor the key aspects of your carbon footprint. Carbo provides insights into your habits' environmental impact and offers strategies for improvement.",
              },
              {
                title: "Track Your Monthly Emissions 📊",
                image: "/a3.webp",
                text: "Monitoring your monthly emissions has never been easier. With intuitive graphs and insights, visualize trends and make informed decisions to stay aligned with your sustainability goals.",
              },
              {
                title: "Share Your Thoughts 🗣️",
                image: "/a4.webp",
                text: "Your feedback is vital! Share your experience with Carbo and how it has impacted your sustainability journey. Your input helps us evolve and improve our system for a greener future.",
              },
              {
                title: "Chat with Our Virtual Assistant 🤖",
                image: "/a5.webp",
                text: "Ask questions about sustainability, carbon tracking, or navigating the app. Our real-time chatbot is here to make your journey easier, faster, and more informative.",
              },
            ].map((section, index) => (
              <div
                key={index}
                className={`section-container mb-10 flex flex-col ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } items-center justify-between space-y-4 md:space-y-0 md:space-x-4`}
              >
                <div className="relative w-full md:w-1/2 h-48">
                  <Image
                    src={section.image}
                    alt={section.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="bg-[#fdd7b0] p-6 rounded-lg shadow-md w-full md:w-1/2">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
                    {section.title}
                  </h2>
                  <p className="text-sm md:text-lg text-gray-700 leading-snug">
                    {section.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <Footer />         
      </div>
    </>
  );
}
