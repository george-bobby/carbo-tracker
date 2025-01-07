import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";

const BarGraph = ({ clerkId }) => {
  const [chartData, setChartData] = useState([]);
  const [viewType, setViewType] = useState("monthly"); // Default view is monthly
  const [barData, setBarData] = useState({});
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    // Fetch emissions data from the backend
    const fetchEmissions = async () => {
      try {
        const response = await axios.get(`/api/routes/footprint`, {
          headers: {
            "clerk-id": clerkId,
          },
        });
        const data = response.data;
        setChartData(data);
        updateBarData(viewType, data); // Initialize chart with default view
      } catch (error) {
        console.error("Error fetching emissions data:", error);
      }
    };

    fetchEmissions();
  }, [clerkId, viewType]);

  const updateBarData = (view, data) => {
    const emissions = view === "monthly" ? data.monthlyEmissions : data.yearlyEmissions;

    setBarData({
      labels: emissions.map((item) => item.category),
      datasets: [
        {
          label: `${view.charAt(0).toUpperCase() + view.slice(1)} Emissions (kg CO2)`,
          data: emissions.map((item) => item.value),
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    });
  };

  const handleViewChange = (newView) => {
    setViewType(newView);
    updateBarData(newView, chartData);
    setDropdownOpen(false);
  };

  return (
    <div className="dashboard">
      <h2 className="text-2xl font-bold mb-4">Hello, User</h2>
      <div className="bar-chart-section">
        <div className="relative inline-block">
          <button
            onClick={() => setDropdownOpen(!isDropdownOpen)}
            className="bg-green-500 text-white px-4 py-2 rounded-md shadow-md focus:outline-none hover:bg-green-600"
          >
            View: {viewType.charAt(0).toUpperCase() + viewType.slice(1)}
          </button>
          {isDropdownOpen && (
            <ul className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
              <li
                onClick={() => handleViewChange("monthly")}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                Monthly
              </li>
              <li
                onClick={() => handleViewChange("yearly")}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                Yearly
              </li>
            </ul>
          )}
        </div>
        <div className="mt-6">
          <Bar
            data={barData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default BarGraph;
