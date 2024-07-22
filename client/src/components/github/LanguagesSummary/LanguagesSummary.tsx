"use client";
import React from "react";
import PieChart from "../PieChart/PieChart";
const LanguagesSummary = ({ languages }: any) => {
  return (
    <div className="bg-[#d4e7fa] p-4 rounded-md shadow-mg mt-4  overflow-y-auto">
      <div className="text-semibold text-[20px] text-center mb-2">
        Language Proficiency Overview
      </div>
      <div className="flex flex-col items-center w-full">
        <PieChart data={languages} />
      </div>
    </div>
  );
};

export default LanguagesSummary;
