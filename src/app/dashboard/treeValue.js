import React from "react";
import { FaTree } from "react-icons/fa";

const TreeValue = () => {
  const trees = 70;

  const treeIcons = Math.min(Math.ceil(trees / 20), 5); // 1 icon per 20 trees, but max 5 icons
  const displayIcons = trees > 100 ? treeIcons + 1 : treeIcons; // For more than 100 trees, show 6 icons

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="flex space-x-2">
        {Array.from({ length: displayIcons }).map((_, index) => (
          <FaTree key={index} className="text-green-500 text-2xl" />
        ))}
      </div>
      <div className="flex justify-center items-center w-48 h-24 border-2 border-green-500 rounded-lg bg-green-50 p-4">
        <p className="text-lg text-green-700">{trees} Trees to Plant</p>
      </div>
    </div>
  );
};

export default TreeValue;
