"use client";
import Spinner from "../components/Spinner";
import Link from 'next/link';
import {
  ClerkLoaded,
  ClerkLoading,
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  UserButton,
  auth,
  useUser,
} from "@clerk/nextjs";
import Image from "next/image";
import React from "react";
import { CiCircleCheck, CiHeart } from "react-icons/ci";
import { IoEllipsisVertical } from "react-icons/io5";
import './page.css';


export default function Page() {
  const { user } = useUser();

  return (
    <div className="min-h-screen bg-[#e8e6d7] py-6 flex flex-col gap-6 px-4 lg:px-16 md:px-10 sm:px-8">

      {/* Header Section with the image and clickable links */}
      <div className="flex items-center gap-6">
        {/* The Image */}
        <div className="rounded-xl w-1/4 h-23">
          <Image
            className="w-full h-full object-cover rounded-lg"
            src="/imag1.webp"
            alt="Carbo"
            width={876} 
            height={156}
          />
        </div>

        {/* Navigation Links beside the image */}
        <Link
            href="/calculator"
            className="text-[#444444] py-1 px-3 rounded-lg font-medium hover:bg-[#d4d3bb] transition duration-100"
          >
            Calculator
        </Link>
        <Link
            href="/news"
            className="text-[#444444] py-1 px-3 rounded-lg font-medium hover:bg-[#d4d3bb] transition duration-100"
          >
            News
          </Link>
          
          <Link
            href="/learn"
            className="text-[#444444] py-1 px-3 rounded-lg font-medium hover:bg-[#d4d3bb] transition duration-100"
          >
            Learn
          </Link>
        <div className="flex gap-4 items-center">
           <Link
            href="/chatbot"
            className="text-[#444444] py-1 px-3 rounded-lg font-medium hover:bg-[#d4d3bb] transition duration-100"
          >
            Chatbot
          </Link>
          <Link
            href="/dashboard"
            className="text-[#444444] py-1 px-3 rounded-lg font-medium hover:bg-[#d4d3bb] transition duration-100"
          >
            Dashboard
          </Link>
        </div>
      </div>

      {/* Section with Carbon Footprint Info */}
      <div className="bg-[#fdd7b0] p-6 rounded-lg shadow-md md:w-3/4 sm:w-3/5 w-full mx-auto mt-4">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 text-center">What's Your Carbon Footprint? 🌍</h2>
        <p className="text-sm md:text-lg text-gray-700 leading-snug">
          Your carbon footprint is the mark you leave on the planet—measuring the greenhouse gases from your daily activities, like commuting, cooking, or streaming your favorite shows.
        </p>
        <p className="text-sm md:text-lg text-gray-700 leading-snug mt-4">
          <strong>Why does it matter?</strong> Because small changes in your habits can lead to big wins for the environment! Tracking your carbon footprint helps you live smarter, cleaner, and more sustainably—making the planet happier one step at a time.
        </p>
        <p className="text-sm md:text-lg text-gray-700 leading-snug mt-4 text-center font-semibold">
          Let’s start your journey to greener living! 🌟
        </p>
      </div>

      {/* Other Sections */}
      <div className="flex items-center justify-center gap-6 lg:flex-row flex-col">
        <div className="rounded-xl lg:w-[65%] w-full h-72 bg-[#b5bf96] md:p-10 sm:p-8 p-6 flex gap-6">
          <div className="h-full sm:w-[100%] w-full rounded-xl flex flex-col justify-start p-4">
            <p className="text-4xl text-center heading font-bold mt-[-10px] font-sans">About Us</p>
            <p className="text-lg md:text-xl text-gray-600 mt-4 leading-snug font-times-new-roman">
              At Carbo, we simplify carbon footprint tracking to help individuals and organizations take meaningful steps toward sustainability. With actionable insights and personalized strategies, we empower you to understand your impact and make informed, eco-friendly choices.
            </p>
            {/* <div className="flex items-start justify-between"> */}
              {/* <div className="relative h-16 w-16 ">
                <Image
                  src="/avatar.webp"
                  alt="notfound"
                  fill
                  className="rounded-xl"
                />
              </div> */}
              {/* <div>
                <CiCircleCheck size={25} />
              </div> */}
            {/* </div> */}
             {/* <div> */}
            {/* <Link href="/reclaim" className="font-semibold">Scan QR</Link> */}
              {/* <h3 className="font-semibold">Local Lifestyle?</h3> */}
              {/* <span className="text-[#a4b651] font-semibold">Naturally</span> */}
            {/* </div>  */}
          </div>
          {/* <div className="bg-white h-full w-[40%] rounded-xl flex-col justify-between p-3 hidden sm:flex">
            <div className="flex items-start justify-end">
              <div>
                <CiHeart size={25} />
              </div>
            </div>
            <div className="">
              <h3 className="font-semibold">Love the ground</h3>
              <span className="text-[#a4b651] font-semibold">you walk</span>
            </div>
          </div> */}
        </div>
        <div className="relative flex items-center justify-end w-full h-16 px-6 bg-[#bcd58b]">
  {/* Profile Button */}
  <div className="relative">
    <ClerkLoading>
      <Spinner color="dark:text-white text-black" />
    </ClerkLoading>
    <ClerkLoaded>
      <SignedIn>
        <div className="cursor-pointer flex items-center gap-2" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
            {/* Replace with user's avatar */}
            <img
              className="w-full h-full rounded-full object-cover"
              src={user?.profileImageUrl || '/default-avatar.png'}
              alt="User Avatar"
            />
          </div>
          <span>{user?.fullName || 'User'}</span>
        </div>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
            <ul>
              <li>
                <a
                  href="/user-profile"
                  className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
                >
                  Profile
                </a>
              </li>
              <li>
                <SignOutButton>
                  <div className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
                    Logout
                  </div>
                </SignOutButton>
              </li>
            </ul>
          </div>
        )}
      </SignedIn>
      <SignedOut>
        <SignInButton afterSignInUrl="/" mode="modal">
          <div className="text-gray-700 hover:text-gray-900 cursor-pointer">
            SignIn / SignUp
          </div>
        </SignInButton>
      </SignedOut>
    </ClerkLoaded>
  </div>
</div>
</div>


      
      <section className="text-center bg-[#e0dfce] h-full w-full flex flex-col items-center justify-center font-['Roboto']">
  <div className="w-full max-w-screen-xl p-6 rounded-lg bg-[#d5d3bf]">

    {/* Hero Section */}
    <header className="mb-10">
      <p className="text-lg md:text-xl text-gray-600 mt-2 leading-relaxed font-bold">
        Empowering sustainable living with innovative carbon footprint tracking and actionable insights.
      </p>
    </header>

    {/* Motivation Section */}
    <div className="section-container mb-10">
      <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
        <div className="relative w-full md:w-1/2 h-48">
          <Image
            src="/mainLogo.webp"
            alt="Carbo Logo"
            fill
            className="object-contain"
          />
        </div>
        <div className="bg-[#fdd7b0] p-6 rounded-lg shadow-md w-full md:w-1/2">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">Why Motivation Matters 🌏</h2>
          <p className="text-sm md:text-lg text-gray-700 leading-snug">
            Carbo is a university-led initiative focused on measuring and mitigating carbon footprints through technology and innovation. Our mission is to empower communities toward sustainable change.
          </p>
        </div>
      </div>
    </div>

    {/* Carbon Footprint Calculation (Image on Right) */}
    <div className="section-container mb-10">
      <div className="flex flex-col md:flex-row-reverse items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
        <div className="relative w-full md:w-1/2 h-48">
          <div className="rounded-lg overflow-hidden h-full w-full">
            <Image
              src="/a2.webp"
              alt="Carbon Footprint Calculation"
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div className="bg-[#fdd7b0] p-6 rounded-lg shadow-md w-full md:w-1/2">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
            Understanding Your Carbon Footprint 🍃
          </h2>
          <p className="text-sm md:text-lg text-gray-700 leading-snug">
            From transportation choices to daily habits, monitor the key aspects of your carbon footprint. Carbo provides insights into your habits' environmental impact and offers strategies for improvement.
          </p>
        </div>
      </div>
    </div>

    {/* Monthly Emissions Tracking (Image on Left) */}
    <div className="section-container mb-10">
      <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-6">
        <div className="relative w-full md:w-1/2 h-48">
          <Image
            src="/a3.webp"
            alt="Monthly Emissions Graph"
            fill
            className="object-cover"
          />
        </div>
        <div className="bg-[#fdd7b0] p-6 rounded-lg shadow-md w-full md:w-1/2">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">Track Your Monthly Emissions 📊</h2>
          <p className="text-sm md:text-lg text-gray-700 leading-snug">
            Monitoring your monthly emissions has never been easier. With intuitive graphs and insights, visualize trends and make informed decisions to stay aligned with your sustainability goals.
          </p>
        </div>
      </div>
    </div>

    {/* Feedback Section (Image on Right) */}
    <div className="section-container mb-10">
      <div className="flex flex-col md:flex-row-reverse items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
        <div className="relative w-full md:w-1/2 h-48">
          <Image
            src="/a4.webp"
            alt="Feedback Section"
            fill
            className="object-cover"
          />
        </div>
        <div className="bg-[#fdd7b0] p-6 rounded-lg shadow-md w-full md:w-1/2">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">Share Your Thoughts 🗣️</h2>
          <p className="text-sm md:text-lg text-gray-700 leading-snug">
            Your feedback is vital! Share your experience with Carbo and how it has impacted your sustainability journey. Your input helps us evolve and improve our system for a greener future.
          </p>
        </div>
      </div>
    </div>

    {/* Real-Time Support Section (Image on Left) */}
    <div className="section-container mb-10">
      <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
        <div className="relative w-full md:w-1/2 h-48">
          <Image
            src="/a5.webp"
            alt="Real-time Chatbot"
            fill
            className="object-cover"
          />
        </div>
        <div className="bg-[#fdd7b0] p-6 rounded-lg shadow-md w-full md:w-1/2">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">Chat with Our Virtual Assistant 🤖</h2>
          <p className="text-sm md:text-lg text-gray-700 leading-snug">
            Ask questions about sustainability, carbon tracking, or navigating the app. Our real-time chatbot is here to make your journey easier, faster, and more informative.
          </p>
        </div>
      </div>
    </div>

    {/* Footer Section */}
    <footer className="py-8 bg-[#fdd7b0] text-gray-800 text-lg rounded-lg">
      <p className="leading-relaxed">
        At Carbo, we’re committed to supporting your journey toward sustainability.<br />
        Join us, share your insights, and be a part of positive environmental change—one footprint at a time.
      </p>
    </footer>

  </div>
</section>

    </div>
  );
}