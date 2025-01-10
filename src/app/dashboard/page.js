"use client";
import React, { useEffect, useState } from "react";
import "./index.css";
import { useUser } from "@clerk/nextjs";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import BarGraph from "./barGraph";
import PieChart from "./pieChart";
import TreeValue from "./treeValue";

Chart.register(CategoryScale);
Chart.defaults.font.size = 20;
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
          <div className="p-4">
            <div className="flex justify-center mb-8">
              <div className="flex justify-between items-center space-x-8 p-6 border border-gray-300 shadow-lg rounded-lg w-3/4">
                <div className="w-1/2">
                  <PieChart clerkId={user?.id} />
                </div>
                <div className="w-1/2">
                  <TreeValue />
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="p-6 border border-gray-300 shadow-lg rounded-lg w-3/4">
                <BarGraph />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
