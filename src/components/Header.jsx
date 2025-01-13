"use client";

import Spinner from "../components/Spinner";
import Link from "next/link";
import {
  ClerkLoaded,
  ClerkLoading,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import React from "react";

function Header() {
  return (
    <div className="sticky top-0 z-50 flex flex-wrap items-center justify-between bg-[#D7ECD9] px-5 py-4">
      {/* Left Section: Logo and Navigation Links */}
      <div className="flex flex-wrap items-center gap-4 w-full md:w-auto justify-between">
        {/* Header Image */}
        <Link href="/">
          <div className="rounded-xl h-14 w-auto">
            <img
              className="w-full h-full object-cover rounded-lg"
              src="/imag1.webp"
              alt="Carbo"
              width={876}
              height={156}
            />
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex gap-4 items-center">
          {["Dashboard", "Calculator", "News", "Carpool", "Shop", "Ecocenter", "Chatbot"].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              className="text-[#444444] py-1 px-3 rounded-lg font-medium hover:bg-[#d4d4c1] transition duration-100"
            >
              {item}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="block md:hidden w-full mt-4">
        <div className="flex flex-wrap gap-2 justify-center">
          {["Dashboard", "Calculator", "News", "Carpool", "Shop", "Ecocenter", "Chatbot"].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              className="text-[#444444] py-1 px-3 rounded-lg font-medium hover:bg-[#d4d4c1] transition duration-100"
            >
              {item}
            </Link>
          ))}
        </div>
      </div>

      {/* Profile Section */}
      <div className="relative flex items-center justify-end group mt-4 md:mt-0">
        <ClerkLoading>
          <Spinner color="black" />
        </ClerkLoading>

        <ClerkLoaded>
        <SignedIn>
        <div className="relative group">
          <div className="w-auto flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95">
            <UserButton
              afterSignOutUrl="/"
              style={{
                transform: "scale(2.5)",
                borderRadius: "50%",
                marginRight: "10px",
                overflow: "hidden",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }} // Styled for a modern and interactive look
            />
          </div>
        </div>
      </SignedIn>


          <SignedOut>
          <SignInButton mode="modal">
            <div className="relative w-auto rounded-lg flex items-center justify-center bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white py-2 px-6 font-medium cursor-pointer shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl active:scale-95">
              <span className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25V9m-3 0h12m-12 0a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h12a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25m-12 0V5.25M9 14.25h6"
                  />
                </svg>
                Sign In / Sign Up
              </span>
            </div>
          </SignInButton>
        </SignedOut>
        </ClerkLoaded>
      </div>
    </div>
  );
}

export default Header;
