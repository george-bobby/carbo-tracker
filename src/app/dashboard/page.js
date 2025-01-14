"use client";
import React from "react";
import { useUser } from "@clerk/nextjs";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import BarGraph from "./barGraph";
import PieChart from "./pieChart";
import EquivalenciesTable from "./eqvTable";

Chart.register(CategoryScale);
Chart.defaults.font.size = 20;

export default function UserProfile() {
  const { user } = useUser();

  return (
    <div
      className="relative bg-[#e8e6d7] min-h-screen"
      style={{
        backgroundImage: "url('/imaged1.jpg')", // Add your image path here
        backgroundSize: "contain",
        backgroundPosition: "center",
        filter: "brightness(100%)",
      }}
    >
      {/* Overlay to fade background */}
      <div className="absolute inset-0 bg-black opacity-30 z-0"></div>

      {/* Foreground content */}
      <div className="relative z-10">
        <h1 className="text-5xl font-bold py-10 text-white text-opacity-80 text-center">
          Hello {user?.firstName}, Tracking Since{" "}
          {user?.createdAt.toLocaleDateString()}
        </h1>

        {/* Main content */}
        <div className="p-4 flex flex-col space-y-8">
          {/* Row 1: Pie Chart and Equivalencies Table */}
          <div className="flex justify-center">
            <div className="flex justify-between items-center space-x-8 p-6 border border-gray-300 shadow-lg rounded-lg w-3/4 bg-white bg-opacity-80">
              <div className="w-1/2">
                <PieChart clerkId={user?.id} />
              </div>
              <div className="w-1/2">
                <EquivalenciesTable clerkId={user?.id} />
              </div>
            </div>
          </div>

          {/* Row 2: Bar Graph */}
          <div className="flex justify-center">
            <div className="p-6 border border-gray-100 shadow-lg rounded-lg w-3/4 bg-white bg-opacity-80">
              <BarGraph clerkId={user?.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
