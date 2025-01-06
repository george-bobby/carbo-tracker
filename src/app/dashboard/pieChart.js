import React from "react";
import { Pie } from "react-chartjs-2";

const PieChart = () => {
  const data = {
    labels: [
      "Transportation",
      "Energy Use",
      "Food Consumption",
      "Waste Management",
      "Water Usage",
      "Social Activities",
      "Shopping",
      "Building Maintenance",
    ],
    datasets: [
      {
        data: [15, 20, 10, 5, 8, 12, 18, 12], // Dummy data percentages
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(100, 100, 255, 0.6)",
          "rgba(200, 100, 100, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(100, 100, 255, 1)",
          "rgba(200, 100, 100, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: "Pie Chart of Environmental Impact",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}%`;
          },
        },
      },
    },
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div style={{ width: "80%", margin: "0 auto", height: "500px" }}>
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;
