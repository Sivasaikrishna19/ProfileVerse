"use client";

import { UserState } from "@/store/slices/profileSummary";
import { Avatar } from "antd";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const ProfileSummary = () => {
  const { profileSummary }: any = useSelector(
    (state: UserState) => state.profileSummary
  );

  useEffect(() => {
    console.log(profileSummary, "profile summary");
  }, [profileSummary]);

  return (
    <div className="bg-[#d4e7fa] p-4 rounded-md shadow-mg mt-4">
      <div className="flex ml-2">
        <Avatar
          size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
          src={profileSummary?.avatarUrl}
        />
        <div className="flex flex-col justify-center ml-4">
          <div className="text-[16px] font-bold">Username</div>
          <div className="text-[20px] font-semibold">
            {profileSummary?.login}
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-col md:flex-row justify-between">
        <div className="bg-white p-4 rounded-md w-full md:mx-2 text-center mb-4 md:mb-0">
          <div className="text-[28px]">
            {profileSummary.repositories?.totalCount}
          </div>
          <div className="text-[20px]">Repositories</div>
        </div>
        <div className="bg-white p-4 rounded-md w-full md:mx-2 text-center mb-4 md:mb-0">
          <div className="text-[28px]">
            {profileSummary.followers?.totalCount}
          </div>
          <div className="text-[20px]">Followers</div>
        </div>
        <div className="bg-white p-4 rounded-md w-full md:mx-2 text-center">
          <div className="text-[28px]">
            {profileSummary.following?.totalCount}
          </div>
          <div className="text-[20px]">Following</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSummary;
