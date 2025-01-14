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
import React, { useEffect } from "react";
import { gsap } from "gsap";
import "./page.css";

const TechFestSection = () => {
  useEffect(() => {
    // GSAP Animation
    const calculateButton = document.querySelector("a[href='/calculator']");

    if (calculateButton) {
      // On hover
      calculateButton.addEventListener("mouseenter", () => {
        gsap.to(calculateButton, {
          backgroundColor: "#2ECC71",
          color: "#000000",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
          borderColor: "#013220",
          duration: 0.3,
        });
      });

      // On mouse leave
      calculateButton.addEventListener("mouseleave", () => {
        gsap.to(calculateButton, {
          backgroundColor: "transparent",
          color: "#004D40",
          boxShadow: "none",
          borderColor: "#D7ECD9",
          duration: 0.3,
        });
      });
    }

    // Cleanup the event listeners when the component unmounts
    return () => {
      if (calculateButton) {
        calculateButton.removeEventListener("mouseenter", () => {});
        calculateButton.removeEventListener("mouseleave", () => {});
      }
    };
  }, []); // Runs once on component mount

  return (
    <section>
      <div className="bg-[#A5D6A7] text-white py-20 transition-all ease-in-out duration-300 hover:bg-[#81C784] relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-full bg-[#A5D6A7] opacity-50 group-hover:opacity-0 transition-all duration-500"></div>

        <div className="container mx-auto flex flex-col md:flex-row items-center my-12 md:my-24">
          <div className="flex flex-col w-full lg:w-1/3 justify-center items-start p-8 hover:scale-105 transition-transform duration-300">
            <h1 className="text-4xl md:text-6xl p-2 text-[#376d08] tracking-wide font-bold transform transition-all duration-500 hover:text-[#004D40]">
              Carbo
            </h1>
            <h2 className="text-2xl md:text-xl text-[#376d08] leading-relaxed md:leading-snug mb-2 font-semibold transform transition-all duration-500 hover:text-[#2ECC71]">
              MEASURE. REDUCE. SUSTAIN.
            </h2>
            <p className="text-lg text-[#013220] md:text-xl mb-4 opacity-90 hover:opacity-100 transition-opacity duration-300">
              Measure your carbon footprint, reduce your impact, and build a
              greener future with Carbo.
            </p>
            <a
              href="/calculator"
              className="text-xl bg-transparent hover:bg-[#2ECC71] text-[#004D40] hover:text-white rounded-lg shadow-lg hover:shadow-xl py-2 px-6 border-2 border-[#D7ECD9] hover:border-[#013220] transform transition-all duration-300 hover:scale-105"
            >
              Calculate
            </a>
          </div>

          <div className="p-8 mt-12 mb-6 md:mb-0 md:mt-0 ml-0 md:ml-12 lg:w-2/3 flex justify-end">
            <div className="h-48 flex flex-wrap content-center hover:scale-105 transition-transform duration-300">
              <div>
                <img
                  className="mt-28 hidden xl:block transform transition-all duration-500 hover:rotate-12 animate__animated animate__fadeInUp"
                  src="https://user-images.githubusercontent.com/54521023/116969935-c13d5b00-acd4-11eb-82b1-5ad2ff10fb76.png"
                  alt="TechFest Illustration 1"
                />
              </div>
              <div>
                <img
                  className="inline-block mt-24 md:mt-0 p-8 md:p-0 transform transition-all duration-500 hover:scale-105 animate__animated animate__fadeInUp animate__delay-1s"
                  src="https://user-images.githubusercontent.com/54521023/116969931-bedb0100-acd4-11eb-99a9-ff5e0ee9f31f.png"
                  alt="TechFest Illustration 2"
                />
              </div>
            </div>
          </div>
        </div>

        <a
          href="/dashboard"
          className="absolute bottom-8 right-8 bg-[#2ECC71] text-[#004D40] text-lg px-6 py-3 rounded-full shadow-xl transform transition-all duration-300 hover:scale-110 hover:bg-[#1A7C53] hover:text-white"
        >
          Get Started
        </a>
      </div>
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
