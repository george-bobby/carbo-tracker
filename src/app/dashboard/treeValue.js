import React, { useState, useEffect } from "react";
import { FaTree } from "react-icons/fa";

const TreeValue = ({ clerkId }) => {
  const [treeValue, setTreeValue] = useState(null);

  const fetchTreeValue = async () => {
    try {
      const fetchedData = await fetch("/api/piechart").then((res) =>
        res.json()
      );

      // Find the data for the given clerkId
      const userData = fetchedData.find((item) => item.clerkId === clerkId);

      if (userData) {
        setTreeValue(userData.treeValue);
      } else {
        console.error("No data found for the given clerkId");
      }
    } catch (error) {
      console.error("Error fetching tree value data:", error);
    }
  };

  useEffect(() => {
    if (clerkId) fetchTreeValue();
  }, [clerkId]);

  if (treeValue === null) {
    return <p>Loading...</p>; // Show loading indicator while fetching data
  }

  const treeIcons = Math.min(Math.ceil(treeValue / 20), 5); // 1 icon per 20 trees, max 5 icons
  const displayIcons = treeValue > 100 ? treeIcons + 1 : treeIcons; // For more than 100 trees, show 6 icons

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="flex space-x-2">
        {Array.from({ length: displayIcons }).map((_, index) => (
          <FaTree key={index} className="text-green-500 text-2xl" />
        ))}
      </div>
      <div className="flex justify-center items-center w-48 h-24 border-2 border-green-500 rounded-lg bg-green-50 p-4">
        <p className="text-lg text-green-700">{treeValue} Trees to Plant</p>
      </div>
    </div>
  );
};

export default TreeValue;
