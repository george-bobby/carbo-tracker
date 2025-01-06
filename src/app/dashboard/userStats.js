import React from "react";
import "./index.css";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import BarGraph from "./barGraph";
import PieChart from "./pieChart";
import TreeValue from "./treeValue";

Chart.register(CategoryScale);
Chart.defaults.font.size = 20;

export default function UserStats() {
  return (
    <div className="p-4">
      <div className="flex justify-center mb-8">
        <div className="flex justify-between items-center space-x-8 p-6 border border-gray-300 shadow-lg rounded-lg w-3/4">
          <div className="w-1/2">
            <PieChart />
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
  );
}
