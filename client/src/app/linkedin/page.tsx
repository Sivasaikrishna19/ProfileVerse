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

  const client_id = process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID;
  const redirect_uri = process.env.NEXT_PUBLIC_LINKEDIN_REDIRECT_URI;

  const linkedinAuthUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${client_id}&redirect_uri=${redirect_uri}&scope=openid%20profile%20w_member_social%20email`;

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">LinkedInLens</h1>
      <p className="text-lg mb-6 text-center">
        Discover top talent through LinkedIn profiles with ease
      </p>
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
              // console.log(linkedinAuthUrl, "OAuth");
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
