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
        <div className="flex items-center justify-between bg-[#e8e6d7] px-7 py-4">
            {/* Left Section: Logo and Navigation Links */}
            <div className="flex items-center gap-4"> {/* Reduced gap for less space between logo and nav links */}
                {/* Header Image */}
                <Link href="/">
                    <div className="rounded-xl h-20 w-auto -ml-4"> {/* Negative margin to move the logo left */}
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
                <div className="flex gap-4 items-center">
                    <Link
                        href="/dashboard"
                        className="text-[#444444] py-1 px-3 rounded-lg font-medium hover:bg-[#e8e6d7] transition duration-100 bg-[#e8e6d7]"
                    >
                        Dashboard
                    </Link>
                    <Link
                        href="/calculator"
                        className="text-[#444444] py-1 px-3 rounded-lg font-medium hover:bg-[#e8e6d7] transition duration-100 bg-[#e8e6d7]"
                    >
                        Calculator
                    </Link>
                    <Link
                        href="/news"
                        className="text-[#444444] py-1 px-3 rounded-lg font-medium hover:bg-[#e8e6d7] transition duration-100 bg-[#e8e6d7]"
                    >
                        News
                    </Link>
                    <Link
                        href="/learn"
                        className="text-[#444444] py-1 px-3 rounded-lg font-medium hover:bg-[#e8e6d7] transition duration-100 bg-[#e8e6d7]"
                    >
                        Learn
                    </Link>
                    <Link
                        href="/chatbot"
                        className="text-[#444444] py-1 px-3 rounded-lg font-medium hover:bg-[#e8e6d7] transition duration-100 bg-[#e8e6d7]"
                    >
                        Chatbot
                    </Link>
                </div>
            </div>

            {/* Profile Section */}
            <div className="relative flex items-center justify-end group bg-[#e8e6d7] pr-8">
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
                            <div className="w-auto bg-[#b5bf96] rounded-lg flex items-center border-1 border-[#444444] justify-center text-medium text-[#526527] py-0.5 px-5 font-medium cursor-pointer hover:bg-[#e8e6d7]">
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
