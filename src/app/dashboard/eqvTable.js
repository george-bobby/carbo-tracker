import React, { useState, useEffect } from "react";
import { FaTree, FaMobileAlt, FaCar, FaGasPump } from "react-icons/fa";

const EquivalenciesTable = ({ clerkId }) => {
  const [equivalencies, setEquivalencies] = useState(null);

  const fetchEquivalencies = async () => {
    try {
      const fetchedData = await fetch("/api/overall").then((res) => res.json());
      const userData = fetchedData.find((item) => item.clerkId === clerkId);

      if (userData && userData.equivalencies) {
        setEquivalencies(userData.equivalencies);
      } else {
        console.error("No data found for the given clerkId or equivalencies");
      }
    } catch (error) {
      console.error("Error fetching equivalencies data:", error);
    }
  };

  useEffect(() => {
    if (clerkId) fetchEquivalencies();
  }, [clerkId]);

  if (!equivalencies) {
    return <p>Loading...</p>; // Show loading indicator while fetching data
  }

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h2 className="text-xl font-bold mb-4 text-zinc-600	">Equivalencies</h2>
      <table className="table-auto border-collapse border border-green-500 w-full text-zinc-700	">
        <thead>
          <tr>
            <th className="border border-green-500 px-4 py-2">Icon</th>
            <th className="border border-green-500 px-4 py-2">Category</th>
            <th className="border border-green-500 px-4 py-2">Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-green-500 px-4 py-2 text-center">
              <FaTree className="text-green-500 text-xl" />
            </td>
            <td className="border border-green-500 px-4 py-2">Trees Planted</td>
            <td className="border border-green-500 px-4 py-2">
              {equivalencies.treesPlanted}
            </td>
          </tr>
          <tr>
            <td className="border border-green-500 px-4 py-2 text-center">
              <FaMobileAlt className="text-blue-500 text-xl" />
            </td>
            <td className="border border-green-500 px-4 py-2">
              Phones Charged
            </td>
            <td className="border border-green-500 px-4 py-2">
              {equivalencies.phonesCharged}
            </td>
          </tr>
          <tr>
            <td className="border border-green-500 px-4 py-2 text-center">
              <FaCar className="text-gray-500 text-xl" />
            </td>
            <td className="border border-green-500 px-4 py-2">
              Distance Driven
            </td>
            <td className="border border-green-500 px-4 py-2">
              {equivalencies.distanceDriven}
            </td>
          </tr>
          <tr>
            <td className="border border-green-500 px-4 py-2 text-center">
              <FaGasPump className="text-yellow-500 text-xl" />
            </td>
            <td className="border border-green-500 px-4 py-2">
              Gallons of Gasoline
            </td>
            <td className="border border-green-500 px-4 py-2">
              {equivalencies.gallonsGasoline}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default EquivalenciesTable;
