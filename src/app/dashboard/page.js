"use client";
import React, { useEffect, useState } from "react";
import "./index.css";
import UserStats from "./userStats.js";
import { useUser } from "@clerk/nextjs";
export default function UserProfile() {
  const { user } = useUser();

  return (
    <div className="bg-[#e8e6d7] text-white">
      <div>
        <h1 className="text-5xl font-bold py-10 text-[#526527] text-center">
          Hello {user?.firstName}, Tracking Since{" "}
          {user?.createdAt.toLocaleDateString()}
        </h1>
        <div>
          <UserStats />
        </div>
      </div>
    </div>
  );
}
