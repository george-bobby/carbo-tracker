import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

const BarGraph = () => {
  const [dataArray, setDataArray] = useState([
    10, 30, 410, 43, 11, 0, 52, 12, 34, 80, 20, 100,
  ]);
  const data = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Monthly Statistics",
        data: dataArray,
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      {/* <h2>Bar Graph</h2> */}
      <Bar
        data={data}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Carbon Emission this month",
            },
          },
          // maintainAspectRatio: false,
          width: 500,
          height: 3000,
          responsive: true,
        }}
      />
    </div>
  );
};

export default BarGraph;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Bar } from "react-chartjs-2";

// const BarGraph = ({ clerkId }) => {
//   const [chartData, setChartData] = useState([]);
//   const [viewType, setViewType] = useState("monthly"); // Default view is monthly
//   const [barData, setBarData] = useState({
//     labels: [],
//     datasets: [],
//   });
//   const [isDropdownOpen, setDropdownOpen] = useState(false);

//   useEffect(() => {
//     const fetchEmissions = async () => {
//       try {
//         const response = await axios.get(`/api/routes/footprint`, {
//           headers: {
//             "clerk-id": clerkId,
//           },
//         });
//         console.log("API Response:", response.data);

//         if (
//           !response.data?.monthlyEmissions ||
//           !response.data?.yearlyEmissions
//         ) {
//           console.error("Unexpected API response:", response.data);
//           return;
//         }

//         const data = response.data;
//         setChartData(data);
//         updateBarData(viewType, data); // Initialize chart with default view
//       } catch (error) {
//         console.error("Error fetching emissions data:", error);
//       }
//     };

//     fetchEmissions();
//   }, [clerkId, viewType]);

//   const updateBarData = (view, data) => {
//     if (!data?.monthlyEmissions || !data?.yearlyEmissions) {
//       console.error("Invalid data structure:", data);
//       return;
//     }

//     const emissions =
//       view === "monthly" ? data.monthlyEmissions : data.yearlyEmissions;

//     setBarData({
//       labels: emissions.map((item) => item.category),
//       datasets: [
//         {
//           label: `${
//             view.charAt(0).toUpperCase() + view.slice(1)
//           } Emissions (kg CO2)`,
//           data: emissions.map((item) => item.value),
//           backgroundColor: "rgba(75, 192, 192, 0.6)",
//           borderColor: "rgba(75, 192, 192, 1)",
//           borderWidth: 1,
//         },
//       ],
//     });
//   };

//   const handleViewChange = (newView) => {
//     setViewType(newView);
//     updateBarData(newView, chartData);
//     setDropdownOpen(false);
//   };

//   return (
//     <div className="dashboard">
//       <h2 className="text-2xl font-bold mb-4">Hello, User</h2>
//       <div className="bar-chart-section">
//         <div className="relative inline-block">
//           <button
//             onClick={() => setDropdownOpen(!isDropdownOpen)}
//             className="bg-green-500 text-white px-4 py-2 rounded-md shadow-md focus:outline-none hover:bg-green-600"
//           >
//             View: {viewType.charAt(0).toUpperCase() + viewType.slice(1)}
//           </button>
//           {isDropdownOpen && (
//             <ul className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
//               <li
//                 onClick={() => handleViewChange("monthly")}
//                 className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-black" // Ensures dark text
//               >
//                 Monthly
//               </li>
//               <li
//                 onClick={() => handleViewChange("yearly")}
//                 className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-black" // Ensures dark text
//               >
//                 Yearly
//               </li>
//             </ul>
//           )}
//         </div>
//         <div className="mt-6">
//           {console.log("Bar Chart Data:", barData)}
//           {barData.labels.length > 0 && barData.datasets.length > 0 ? (
//             <Bar
//               data={barData}
//               options={{
//                 responsive: true,
//                 plugins: {
//                   legend: {
//                     position: "top",
//                   },
//                 },
//               }}
//             />
//           ) : (
//             <p>Loading chart data...</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BarGraph;
