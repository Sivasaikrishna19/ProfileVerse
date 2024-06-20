"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Button, Input } from "antd";
import Search from "antd/es/input/Search";
import { fetchUserData } from "@/utils/api";
import ProfileSummary from "@/components/ProfileSummary/ProfileSummary";
import { useDispatch } from "react-redux";
import { setProfileSummary } from "@/store/slices/profileSummary";

const page = () => {
  const dispatch = useDispatch();
  const [accessToken, setAccessToken] = useState<string>("");
  const [isGuest, setIsGuest] = useState<boolean>(false);
  const [username, setUsername] = useState<string | null>();
  const [userData, setUserData] = useState<any>();

  const handleGuestLogin = () => {
    setIsGuest(true);
  };

  useEffect(() => {
    const token: any = Cookies.get("access_token");
    setAccessToken(token);
  }, []);

  const onSearch = async () => {
    let tempUserData;
    if (username) {
      if (accessToken) {
        tempUserData = await fetchUserData(username!, accessToken);
      } else {
        tempUserData = await fetchUserData(username!);
      }
    }
    dispatch(setProfileSummary(tempUserData));
    setUserData(tempUserData);

    // setUsername(null);
  };

  useEffect(() => {
    console.log(userData, "user data");
  }, [userData]);

  return (
    <div>
      <div className="flex items-center justify-center w-full text-[24px] mb-6">
        <>
          {" "}
          Welcome to GitInsight! Discover top talent through GitHub profiles
          with ease
        </>
      </div>
      {accessToken || isGuest ? (
        <div className="w-full">
          <Search
            placeholder="Search for profile..."
            allowClear
            enterButton="Search"
            value={username}
            size="large"
            className="w-full"
            onSearch={onSearch}
            onChange={(e: any) => {
              setUsername(e.target.value);
            }}
          />
          {userData ? <ProfileSummary /> : ""}
        </div>
      ) : (
        <div className="w-[80%] m-auto flex justify-center">
          <Button
            type="primary"
            className="w-full mr-1"
            onClick={() =>
              (window.location.href =
                "https://github.com/login/oauth/authorize?client_id=Ov23li3wlt1XywFULHLj&redirect_uri=http://localhost:3000/api/github/callback&scope=user,repo")
            }
          >
            Authorize with GitHub
          </Button>
          <Button onClick={handleGuestLogin} className="w-full ml-1">
            Use as Guest
          </Button>
        </div>
      )}
    </div>
  );
};

export default page;
