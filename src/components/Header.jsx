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
import Image from "next/image";
import React from "react";

function Header() {
    return (
        <div className="flex items-center justify-between gap-6">
            {/* Header Image */}
            <div className="flex items-center gap-4">
                <div className="rounded-xl w-1/4 h-23">
                    <img
                        className="w-full h-full object-cover rounded-lg"
                        src="/imag1.webp" // Ensure this image exists in the public folder
                        alt="Carbo"
                        width={876}
                        height={156}
                    />
                </div>

                {/* Navigation Links */}
                <div className="flex flex-wrap gap-4 items-center">
                    <Link
                        href="/dashboard" // Corrected to href
                        className="text-[#444444] py-1 px-3 rounded-lg font-medium hover:bg-[#d4d3bb] transition duration-100"
                    >
                        Dashboard
                    </Link>
                    <Link
                        href="/calculator" // Corrected to href
                        className="text-[#444444] py-1 px-3 rounded-lg font-medium hover:bg-[#d4d3bb] transition duration-100"
                    >
                        Calculator
                    </Link>
                    <Link
                        href="/news" // Corrected to href
                        className="text-[#444444] py-1 px-3 rounded-lg font-medium hover:bg-[#d4d3bb] transition duration-100"
                    >
                        News
                    </Link>
                    <Link
                        href="/learn" // Corrected to href
                        className="text-[#444444] py-1 px-3 rounded-lg font-medium hover:bg-[#d4d3bb] transition duration-100"
                    >
                        Learn
                    </Link>
                    <Link
                        href="/chatbot" // Corrected to href
                        className="text-[#444444] py-1 px-3 rounded-lg font-medium hover:bg-[#d4d3bb] transition duration-100"
                    >
                        Chatbot
                    </Link>
                </div>
            </div>

            {/* Profile Section */}
            <div className="relative flex items-center justify-end group">
                <ClerkLoading>
                    <Spinner color="black" />
                </ClerkLoading>

                <ClerkLoaded>
                    <SignedIn>
                        <div className="relative group">
                            {/* Profile Picture Button */}
                            <UserButton afterSignOutUrl="/" />
                        </div>
                    </SignedIn>

                    <SignedOut>
                        <SignInButton mode="modal">
                            <div className="w-auto bg-[#60a5fa] rounded-lg flex items-center border-1 border-[#444444] justify-center text-medium text-[#526527] py-0.5 px-5 font-medium cursor-pointer hover:bg-[#d4d3bb]">
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
