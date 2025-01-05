import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";

const Dashboard = () => {
  const [monthlyData, setMonthlyData] = useState([]);
  const [labels, setLabels] = useState([]);
  const [values, setValues] = useState([]);
  const [error, setError] = useState(null);

  // Fetch data from the backend
  useEffect(() => {
    const fetchMonthlyData = async () => {
      try {
        // Replace with your API endpoint
        const response = await axios.get("/api/carbonFootprint/monthly", {
          headers: {
            "Content-Type": "application/json",
            "clerk-id": localStorage.getItem("clerkId"), // Assuming Clerk ID is stored in local storage
          },
        });

        const { data } = response;
        setMonthlyData(data);

        // Extract labels and values for the chart
        const chartLabels = Object.keys(data); // e.g., ['January', 'February', ...]
        const chartValues = Object.values(data); // e.g., [120, 150, ...]

        setLabels(chartLabels);
        setValues(chartValues);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch monthly data. Please try again later.");
      }
    };

    fetchMonthlyData();
  }, []);

  return (
    <div style={{ width: "80%", margin: "0 auto" }}>
      <h2 style={{ textAlign: "center", margin: "20px 0" }}>
        Monthly Carbon Emissions
      </h2>
      {error ? (
        <p style={{ color: "red", textAlign: "center" }}>{error}</p>
      ) : (
        <Bar
          data={{
            labels: labels,
            datasets: [
              {
                label: "Carbon Emissions (kg CO₂)",
                data: values,
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          }}
          height={400}
        />
      )}
    </div>
  );
};

export default Dashboard;
