"use client";

import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Image from "next/image";
import React, { useEffect } from "react";
import { gsap } from "gsap";
import "./page.css";
import Link from "next/link";

const TechFestSection = () => {
  useEffect(() => {
    const calculateButton = document.querySelector("a[href='/calculator']");

    const handleMouseEnter = () => {
      gsap.to(calculateButton, {
        backgroundColor: "#2ECC71",
        color: "#000000",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
        borderColor: "#013220",
        duration: 0.3,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(calculateButton, {
        backgroundColor: "transparent",
        color: "#004D40",
        boxShadow: "none",
        borderColor: "#D7ECD9",
        duration: 0.3,
      });
    };

    if (calculateButton) {
      calculateButton.addEventListener("mouseenter", handleMouseEnter);
      calculateButton.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (calculateButton) {
        calculateButton.removeEventListener("mouseenter", handleMouseEnter);
        calculateButton.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <section className="mx-8 mt-8">
      <div
        id="hero-section"
        className="pt-20 pb-40 rounded-2xl max-w-7xl m-auto"
      >
        <div
          id="hero-content"
          className="max-w-md m-auto text-center font-sans"
        >
          <h1 className="font-bold text-shadow text-5xl text-white">
            MEASURE. REDUCE. SUSTAIN.
          </h1>
          <p className="font-semibold text-shadow text-purple-200 mt-5 font-sans text-xl">
            Measure your carbon footprint, reduce your impact, and build a
            greener future with Carbo.
          </p>
          <Link href="/calculator">
            <button className="flex m-auto mt-10 items-center justify-between overflow-hidden w-48 shadow-xl hover:shadow-2xl transition transform hover:-translate-y-1 ease padding rounded-full m-3 text-green-700 font-bold bg-gradient-to-r from-green-300 to-green-200">
              <span className="pl-8">Calculate Now</span>
              <span className="px-3 py-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </span>
            </button>
          </Link>
        </div>
      </div>
      {/* <img
        className="m-auto relative -top-40"
        src="./forest-about-main.jpg"
        alt="3D Computer Graphics Graphic Design"
      /> */}
    </section>
  );
};

export default function Page() {
  const { user } = useUser();

  return (
    <>
      <div className="min-h-screen bg-[#A5D6A7] py-6 flex flex-col gap-6 px-4 sm:px-6 md:px-10 lg:px-16">
        {/* TechFest Section */}
        <TechFestSection />

        {/* FAQ Section */}
        <section className="bg-[#AED581] py-8 px-6 sm:px-8 md:px-12 rounded-xl shadow-xl">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl text-center font-bold mb-8">
            Frequently Asked Questions
          </h3>
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
              {
                question:
                  "How often should I check my carbon emissions on Carbo?",
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
                question:
                  "How can I provide feedback or report issues with Carbo?",
                answer:
                  "We welcome your feedback and suggestions for improving Carbo. You can provide feedback through our website's feedback section or contact our support team directly via email. Additionally, if you encounter any technical issues or have concerns about your data, please don't hesitate to reach out to us.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out"
              >
                <h4 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
                  {item.question}
                </h4>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
