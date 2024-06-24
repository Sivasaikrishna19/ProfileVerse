"use client";
import React, { useEffect, useState } from "react";
import PieChart from "../PieChart";
import CommitHeatmap from "../CommitHeatmap";
import { useSelector } from "react-redux";
import { UserState } from "@/store/slices/profileSummary";
import { aggregateLanguages } from "@/utils/api";
import Cookies from "js-cookie";
import { LanguageStats } from "@/interfaces/language.interface";

const LanguagesSummary = ({ languages }: any) => {
  return (
    <div className="bg-[#d4e7fa] p-4 rounded-md shadow-mg mt-4 flex items-center">
      <div className="flex-1 flex flex-col items-center">
        <PieChart languages={languages} />
        <div className="text-semibold">Language Proficiency Overview</div>
      </div>
      <div className="flex-1">
        <CommitHeatmap />
      </div>
    </div>
  );
};

export default LanguagesSummary;
