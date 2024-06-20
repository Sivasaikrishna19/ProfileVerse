import { AntDesignOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import React from "react";

const ProfileSummary = () => {
  return (
    <div className="bg-[#e0e0e0] p-4 rounded-md shadow-mg mt-4">
      <div className="flex">
        <Avatar
          size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
          icon={<AntDesignOutlined />}
          src={"https://avatars.githubusercontent.com/u/146486981?v=4"}
        />
        <div className="flex flex-col justify-center ml-4">
          <div className="text-[16px] font-bold">Username</div>
          <div className="text-[20px] font-semibold">Sivasaikrishna19</div>
        </div>
      </div>
      <div className="flex justify-between mt-4">
        <div className="bg-white p-4 rounded-md w-full mx-2 text-center">
          <div className="text-[28px]">14</div>
          <div className="text-[20px]">Repositories</div>
        </div>
        <div className="bg-white p-4 rounded-md w-full mx-2 text-center">
          <div className="text-[28px]">0</div>
          <div className="text-[20px]">Followers</div>
        </div>
        <div className="bg-white p-4 rounded-md w-full mx-2 text-center">
          <div className="text-[28px]">2</div>
          <div className="text-[20px]">Following</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSummary;
