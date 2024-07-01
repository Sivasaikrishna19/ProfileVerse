"use client";
import React from "react";
import PieChart from "../PieChart";
import CommitHeatmap from "../CommitHeatmap";

const LanguagesSummary = ({ languages }: any) => {
  return (
    <div className="bg-[#d4e7fa] p-4 rounded-md shadow-mg mt-4 flex items-center overflow-y-auto">
      <div className="flex flex-col items-center w-full">
        <PieChart data={languages} />
        <div className="text-semibold">Language Proficiency Overview</div>
      </div>
      <div className="w-full">
        <CommitHeatmap />
      </div>
    </div>
  );
};

export default LanguagesSummary;
