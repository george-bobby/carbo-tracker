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
    <div className="sticky top-0 z-50 flex flex-wrap items-center justify-between bg-[#8ac655] px-5 py-4">
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
              <UserButton afterSignOutUrl="/" style={{ transform: "scale(1.4)" }} />
            </div>
          </SignedIn>

          <SignedOut>
            <SignInButton mode="modal">
              <div className="w-auto bg-[#b5bf96] rounded-lg flex items-center border-1 border-[#444444] justify-center text-medium text-[#526527] py-0.5 px-5 font-medium cursor-pointer hover:bg-[#d4d4c1]">
                Sign In / Sign Up
              </div>
            </SignInButton>
          </SignedOut>
        </ClerkLoaded>
      </div>
    </div>
  );
}

export default Header;
