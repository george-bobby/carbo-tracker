import React, { useState } from "react";
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

  const options = {
    plugins: {
      title: {
        display: true,
        text: "Yearly Statistics Overview",
      },
    },
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 2,
  };

  return (
    <div style={{ width: "80%", margin: "0 auto", height: "500px" }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarGraph;
