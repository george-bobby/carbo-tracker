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
import './page.css'
export default function Page() {

  const { user } = useUser();
  return (
    <div className="min-h-screen bg-[#e8e6d7] py-6 flex flex-col gap-6 px-4 lg:px-16 md:px-10 sm:px-8">
      <div className="flex items-center justify-center gap-6">
        <div className="rounded-xl md:w-3/4 sm:w-3/5 w-full h-72  flex flex-col items-center justify-center text-white text-[7vw] md:text-[2.6vw] sm:text-[4vw]">
          <img className="w-full h-full object-cover origin-center" src={'./imag1.webp'}/>
        </div>
        <div className="rounded-xl md:w-1/4 w-2/5 sm:block hidden h-72 relative p-4">
          <Image
            src={"/logo.webp"}
            fill
            alt="notfound"
            className="object-cover w-full h-auto opacity-100 rounded-md bg-blend-multiply"

          />
        </div>
      </div>
      <div className="flex items-center justify-center gap-6 lg:flex-row flex-col">
  <div className="rounded-xl lg:w-[65%] w-full h-72 bg-[#b5bf96] md:p-10 sm:p-8 p-6 flex gap-6">
    <div className="h-full sm:w-[100%] w-full rounded-xl flex flex-col justify-start p-4">
      {/* Heading with increased visual spacing and improved font */}
      <p className="text-4xl text-center heading font-semibold mt-[-10px] font-sans">About Us</p>
      {/* Description with increased spacing */}
      <p className="text-lg md:text-xl text-gray-600 mt-4 leading-snug font-sans">
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
        <div className="rounded-xl lg:w-[45%] w-full sm:w-5/6 h-72 flex flex-col items-center justify-center gap-6">
          <div className="flex items-center gap-6 h-full w-full">
            {/* <div className=" w-[40%] h-44 rounded-xl sm:block hidden ">
              <img className="w-4/5 ml-3 h-4/5" src={'./logo.png'}/>
              <h3 className="w-full text-xl text-center text-green-700">GreenMeter</h3>
            </div> */}

            <div className=" h-full w-full flex flex-col gap-4 justify-between">
              <div className="rounded-xl bg-[#bcd58b] h-full w-full flex items-center p-2 gap-3">
                <div className="w-10 h-10 flex items-center justify-center">
                  <ClerkLoading>
                    <Spinner color="dark:text-white text-black" />
                  </ClerkLoading>
                  <ClerkLoaded>
                    <SignedIn>
                      <UserButton afterSignOutUrl="/" />
                    </SignedIn>
                  </ClerkLoaded>
                </div>
                <div className="flex flex-col w-full">
                  <span>
                    <SignedIn>{user?.fullName}</SignedIn>
                    <SignedOut>Guest User</SignedOut>
                  </span>
                  <span className="text-xs flex items-center justify-center rounded cursor-pointer w-fit text-neutral-600">
                    <ClerkLoaded>
                      <SignedIn>
                        since: {user?.createdAt.toLocaleDateString()}
                      </SignedIn>
                    </ClerkLoaded>
                  </span>
                </div>
                <div className="">
                  <IoEllipsisVertical />
                </div>
              </div>
              <div className="h-full w-full bg-[#bcd58b] rounded-xl flex items-center justify-evenly">
                <span className="text-xs bg-white rounded-lg p-1 px-2">
                <Link href="/user-profile">User Profile</Link>
                </span>
                <span className="text-xs bg-white rounded-lg p-1 px-2">
                <Link href="/feedback">Feedback</Link>
                </span>
                <span className="text-xs bg-white rounded-lg p-1 px-2">
                <Link href="/faq">FAQ</Link>
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-6 h-full w-full">
            {/* <div className="bg-[#e0dfce] w-[40%] h-full rounded-xl p-10 relative sm:block hidden">
              <Image
                src={"/avatar.webp"}
                alt="not found"
                fill
                className="rounded-xl object-cover"
              />
            </div> */}
            <div className=" h-full w-full flex flex-col gap-4 justify-between">
              <div className="h-full w-full flex items-center justify-center bg-[#e0dfce]">
                <ClerkLoading>
                  <Spinner color="black" />
                </ClerkLoading>
                <ClerkLoaded>
                  <SignedIn>
                    <SignOutButton>
                      <div className="h-full w-full bg-[#bcd58b] rounded-xl flex items-center justify-center text-xl text-[#444444] px-4 font-medium hover:bg-[#d4d3bb] cursor-pointer">
                        <span className="sr-only">LogOut</span>
                        <span>Logout</span>
                      </div>
                    </SignOutButton>
                  </SignedIn>
                  <SignedOut>
                    <SignInButton afterSignInUrl="/" mode="modal">
                      <div className="h-full w-full bg-[#e0dfce] rounded-xl flex items-center justify-center text-xl text-[#526527] px-4 font-medium hover:bg-[#d4d3bb] cursor-pointer">
                        SignIn / SignUp
                      </div>
                    </SignInButton>
                  </SignedOut>
                </ClerkLoaded>
              </div>
              <div className="h-full w-full bg-[#e8e6d7] rounded-xl p-4">
                <div className="bg-[#bcd58b] h-full w-full rounded-lg flex items-center justify-evenly text-sm p-1 text-center">
                <Link href="/dashboard" className="w-full flex items-center justify-center rounded-lg cursor-pointer">Dashboard</Link>
                  <Link className="w-full flex items-center justify-center rounded-lg cursor-pointer" href='/chatbot'>
                    Chatbot
                  </Link>
                  <Link href="/reclaim" className="w-full flex items-center justify-center rounded-lg cursor-pointer">Scan QR</Link>
                
                </div>
              </div>
            </div>
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