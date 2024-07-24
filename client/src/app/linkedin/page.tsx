"use client";

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Button, Spin } from "antd";
import Search from "antd/es/input/Search";
import { useDispatch } from "react-redux";
import { setAccessToken } from "@/store/slices/authentication";

const Page = () => {
  const dispatch = useDispatch();
  const [token, setToken] = useState<string | undefined>("");

  useEffect(() => {
    const tempToken: string | undefined = Cookies.get("linkedin_access_token");

    if (tempToken) {
      setToken(tempToken);
      dispatch(setAccessToken(tempToken));
    }
  }, [dispatch]);

  const client_id =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID_PROD
      : process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID;

  const redirect_uri =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_LINKEDIN_REDIRECT_URI_PROD
      : process.env.NEXT_PUBLIC_LINKEDIN_REDIRECT_URI;

  const linkedinAuthUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${client_id}&redirect_uri=${redirect_uri}&scope=openid%20profile%20w_member_social%20email`;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center w-full text-center mb-6">
        <div className="text-[32px] sm:text-[36px] md:text-[40px] lg:text-[44px] font-extrabold ">
          Universe <span className="text-blue-500">LinkedInLens</span>
        </div>
        <div className="text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] mt-2 text-gray-700">
          Discover top talent through LinkedIn profiles with ease
        </div>
        <div className="mt-4 w-2/3 sm:w-1/2 md:w-1/3 lg:w-1/4 h-1 bg-blue-500 rounded-full"></div>
      </div>
      {token ? (
        <div className="w-full">
          <Search
            placeholder="Enter LinkedIn username to explore..."
            enterButton="Search"
            size="large"
            className="w-full mb-6"
            // Add your onSearch and onChange handlers here
          />
          {/* Render your authorized content here */}
        </div>
      ) : (
        <div className="w-[80%] m-auto flex justify-center">
          <Button
            type="primary"
            className="w-full"
            onClick={() => {
              console.log(linkedinAuthUrl, process.env);
              window.location.href = linkedinAuthUrl;
            }}
          >
            Authorize with LinkedIn
          </Button>
        </div>
      )}
    </div>
  );
};

export default Page;
