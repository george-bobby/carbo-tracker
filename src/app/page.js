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

const TechFestSection = () => {
  return (
    <section>
      <div className="bg-[#d8f0ab] text-white py-20">
        <div className="container mx-auto flex flex-col md:flex-row items-center my-12 md:my-24">
          {/* Left Content */}
          <div className="flex flex-col w-full lg:w-1/3 justify-center items-start p-8">
            <h1 className="text-3xl md:text-5xl p-2 text-[#376d08] tracking-loose">Carbo</h1>
            <h2 className="text-xl md:text-sm text-[#376d08] leading-relaxed md:leading-snug mb-2">
              MEASURE. REDUCE. SUSTAIN.
            </h2>
            <p className="text-sm md:text-base text-gray-50 mb-4">
              Explore your favourite events and register now to showcase your talent and win exciting prizes.
            </p>
            <a
              href="#"
              className="bg-transparent hover:bg-yellow-300 text-yellow-300 hover:text-black rounded shadow hover:shadow-lg py-2 px-4 border border-yellow-300 hover:border-transparent"
            >
              Explore Now
            </a>
          </div>

          {/* Right Content */}
          <div className="p-8 mt-12 mb-6 md:mb-0 md:mt-0 ml-0 md:ml-12 lg:w-2/3 justify-center">
            <div className="h-48 flex flex-wrap content-center">
              <div>
                <img
                  className="inline-block mt-28 hidden xl:block"
                  src="https://user-images.githubusercontent.com/54521023/116969935-c13d5b00-acd4-11eb-82b1-5ad2ff10fb76.png"
                  alt="TechFest Illustration 1"
                />
              </div>
              <div>
                <img
                  className="inline-block mt-24 md:mt-0 p-8 md:p-0"
                  src="https://user-images.githubusercontent.com/54521023/116969931-bedb0100-acd4-11eb-99a9-ff5e0ee9f31f.png"
                  alt="TechFest Illustration 2"
                />
              </div>
              <div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
  );
};

export default function Page() {
  const { user } = useUser();

  return (
    <>
      <div className="min-h-screen bg-[#d8f0ab] py-6 flex flex-col gap-6 px-4 sm:px-6 md:px-10 lg:px-16">
        {/* TechFest Section */}
        <TechFestSection />

        {/* FAQ Section */}
        <section className="bg-[#fdd7b0] py-8 px-6 sm:px-8 md:px-12 rounded-xl shadow-lg">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl text-center font-bold mb-8">Frequently Asked Questions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                question: "What is a carbon footprint?",
                answer:
                  "A carbon footprint is the total amount of greenhouse gases, primarily carbon dioxide, released into the atmosphere as a result of human activities such as transportation, energy consumption, and industrial processes. It's a measure of the impact our actions have on the environment in terms of climate change.",
              },
              {
                question: "Why should I track my carbon footprint?",
                answer:
                  "Tracking your carbon footprint allows you to understand the environmental impact of your daily activities. By monitoring your emissions, you can identify areas where you can make changes to reduce your carbon footprint and contribute to a healthier planet.",
              },
              {
                question: "How does Carbo calculate my carbon footprint?",
                answer:
                  "Carbo calculates your carbon footprint based on various factors such as travel distance, vehicle type, energy consumption, and lifestyle choices. By inputting data related to these activities, our platform uses established emission factors to estimate your carbon emissions.",
              },
              {
                question: "What can I do to reduce my carbon footprint?",
                answer:
                  "There are many actions you can take to reduce your carbon footprint, including using public transportation, driving fuel-efficient vehicles, conserving energy at home, recycling, reducing meat consumption, and supporting sustainable products and practices.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out"
              >
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
                answer:
                  "It's a good idea to check your carbon emissions regularly, especially if you're actively trying to reduce your footprint. Monitoring your emissions on a monthly basis can help you track your progress over time and identify areas for improvement.",
              },
              {
                question: "Is Carbo available on mobile devices?",
                answer:
                  "Yes, Carbo is accessible on both desktop and mobile devices. You can conveniently track your carbon footprint and access helpful resources on the go through our mobile-friendly website.",
              },
              {
                question: "Is my data safe and secure with Carbo?",
                answer:
                  "Yes, we take data privacy and security seriously. Your personal information and carbon footprint data are encrypted and stored securely on our servers. We do not share your data with third parties without your consent.",
              },
              {
                question: "How can I provide feedback or report issues with Carbo?",
                answer:
                  "We welcome your feedback and suggestions for improving Carbo. You can provide feedback through our website's feedback section or contact our support team directly via email. Additionally, if you encounter any technical issues or have concerns about your data, please don't hesitate to reach out to us.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out"
              >
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
