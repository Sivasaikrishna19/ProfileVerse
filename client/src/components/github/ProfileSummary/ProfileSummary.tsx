"use client";

import { Avatar, Statistic, StatisticProps } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import CountUp from "react-countup";
import { UserState } from "@/store/slices/profileSummary";

const ProfileSummary = () => {
  const { profileSummary }: any = useSelector(
    (state: UserState) => state.profileSummary
  );
  const formatter: StatisticProps["formatter"] = (value) => (
    <CountUp end={value as number} separator="," />
  );

  return (
    <div className="bg-[#d4e7fa] p-6 rounded-lg shadow-lg mt-4">
      <div className="flex justify-center items-center flex-col">
        <Avatar
          size={{ xs: 80, sm: 100, md: 120, lg: 140, xl: 160, xxl: 180 }}
          src={profileSummary?.avatarUrl}
        />
        <div className="text-center mt-4">
          <div className="text-[18px] font-semibold md:text-[24px] lg:text-[28px]">
            {profileSummary?.login}
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <Statistic
            title={<div className="text-[20px]">Repositories</div>}
            value={profileSummary.repositories?.totalCount}
            formatter={formatter}
            className="text-[32px] font-bold text-gray-900"
          />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <Statistic
            title={<div className="text-[20px]">Followers</div>}
            value={profileSummary.followers?.totalCount}
            formatter={formatter}
            className="text-[32px] font-bold text-gray-900"
          />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <Statistic
            title={<div className="text-[20px]">Following</div>}
            value={profileSummary.following?.totalCount}
            formatter={formatter}
            className="text-[32px] font-bold text-gray-900"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileSummary;
