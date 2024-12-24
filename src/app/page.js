"use client";

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
      <div className="min-h-screen bg-[#e8e6d7] py-6 flex flex-col gap-6 px-4 sm:px-6 md:px-10 lg:px-16">

        {/* Main Content Section */}
        <section className="bg-[#fdd7b0] p-6 rounded-lg shadow-md w-full md:w-3/4 lg:w-2/3 mx-auto mt-4">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 text-center">
            What's Your Carbon Footprint? 🌍
          </h2>
          <p className="text-sm md:text-lg text-gray-700 leading-relaxed">
            Your carbon footprint is the mark you leave on the planet—measuring the greenhouse gases from your daily activities, like commuting, cooking, or streaming your favorite shows.
          </p>
          <p className="text-sm md:text-lg text-gray-700 leading-relaxed mt-4">
            <strong>Why does it matter?</strong> Because small changes in your habits can lead to big wins for the environment! Tracking your carbon footprint helps you live smarter, cleaner, and more sustainably—making the planet happier one step at a time.
          </p>
          <p className="text-sm md:text-lg text-gray-700 leading-relaxed mt-4 text-center font-semibold">
            Let’s start your journey to greener living! 🌟
          </p>
        </section>

        {/* About Us Section */}
        <section className="rounded-xl w-full bg-[#b5bf96] p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col">
          <h3 className="text-3xl sm:text-4xl text-center font-bold mb-4">About Us</h3>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed">
            At Carbo, we simplify carbon footprint tracking to help individuals and organizations take meaningful steps toward sustainability. With actionable insights and personalized strategies, we empower you to understand your impact and make informed, eco-friendly choices. Together, we can create a greener, more sustainable future for generations to come. Our commitment to innovation and community engagement drives us to continuously improve and inspire positive change.
          </p>
        </section>

        {/* FAQ Section */}
        <section className="bg-[#fdd7b0] py-8 px-6 sm:px-8 md:px-12 rounded-xl shadow-lg">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl text-center font-bold mb-8">Frequently Asked Questions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                question: "What is a carbon footprint?",
                answer: "A carbon footprint is the total amount of greenhouse gases, primarily carbon dioxide, released into the atmosphere as a result of human activities such as transportation, energy consumption, and industrial processes. It's a measure of the impact our actions have on the environment in terms of climate change."
              },
              {
                question: "Why should I track my carbon footprint?",
                answer: "Tracking your carbon footprint allows you to understand the environmental impact of your daily activities. By monitoring your emissions, you can identify areas where you can make changes to reduce your carbon footprint and contribute to a healthier planet."
              },
              {
                question: "How does Carbo calculate my carbon footprint?",
                answer: "Carbo calculates your carbon footprint based on various factors such as travel distance, vehicle type, energy consumption, and lifestyle choices. By inputting data related to these activities, our platform uses established emission factors to estimate your carbon emissions."
              },
              {
                question: "What can I do to reduce my carbon footprint?",
                answer: "There are many actions you can take to reduce your carbon footprint, including using public transportation, driving fuel-efficient vehicles, conserving energy at home, recycling, reducing meat consumption, and supporting sustainable products and practices."
              }
            ].map((item, index) => (
              <div key={index} className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out">
                <h4 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">{item.question}</h4>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Continued FAQ Section */}
        <section className="bg-[#e0dfce] py-8 px-6 sm:px-8 md:px-12 rounded-xl shadow-lg mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                question: "How often should I check my carbon emissions on Carbo?",
                answer: "It's a good idea to check your carbon emissions regularly, especially if you're actively trying to reduce your footprint. Monitoring your emissions on a monthly basis can help you track your progress over time and identify areas for improvement."
              },
              {
                question: "Is Carbo available on mobile devices?",
                answer: "Yes, Carbo is accessible on both desktop and mobile devices. You can conveniently track your carbon footprint and access helpful resources on the go through our mobile-friendly website."
              },
              {
                question: "Is my data safe and secure with Carbo?",
                answer: "Yes, we take data privacy and security seriously. Your personal information and carbon footprint data are encrypted and stored securely on our servers. We do not share your data with third parties without your consent."
              },
              {
                question: "How can I provide feedback or report issues with Carbo?",
                answer: "We welcome your feedback and suggestions for improving Carbo. You can provide feedback through our website's feedback section or contact our support team directly via email. Additionally, if you encounter any technical issues or have concerns about your data, please don't hesitate to reach out to us."
              }
            ].map((item, index) => (
              <div key={index} className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out">
                <h4 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">{item.question}</h4>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
