"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Button, Input } from "antd";
import Search from "antd/es/input/Search";
import {
  aggregateLanguages,
  fetchCommitActivity,
  fetchRepositories,
  fetchUserData,
} from "@/utils/api";
import ProfileSummary from "@/components/ProfileSummary/ProfileSummary";
import { useDispatch, useSelector } from "react-redux";
import {
  setProfileSummary,
  setRepositories,
} from "@/store/slices/profileSummary";

import LanguagesSummary from "@/components/LanguagesSummary/LanguagesSummary";
import {
  AuthenticationState,
  setAccessToken,
} from "@/store/slices/authentication";
import CommitHeatmap from "@/components/CommitHeatmap";
import { LanguageStats } from "@/interfaces/language.interface";

const page = () => {
  const dispatch = useDispatch();
  const [token, setToken] = useState<string | undefined>("");
  const [isGuest, setIsGuest] = useState<boolean>(false);
  const [username, setUsername] = useState<string | null>();
  const [userData, setUserData] = useState<any>();
  const [languages, setLanguages] = useState<any>({ Type: 10000 });

  const handleGuestLogin = () => {
    setIsGuest(true);
  };
  // const token: any = useSelector(
  //   (state: AuthenticationState) => state.accessToken
  // );

  useEffect(() => {
    const tempToken: string | undefined = Cookies.get("access_token");
    if (tempToken) {
      setToken(tempToken);
      dispatch(setAccessToken(tempToken));
    }
  }, []);

  const onSearch = async () => {
    let tempUserData;
    let tempRepos;
    if (username) {
      if (token) {
        tempUserData = await fetchUserData(username!, token);
        tempRepos = await fetchRepositories(username);
        let tempLangStats: any = await aggregateLanguages(
          tempRepos,
          username,
          token
        );
        setLanguages(tempLangStats);
        console.log(tempLangStats, "lang stats");

        dispatch(setRepositories(tempRepos));
      } else {
        tempUserData = await fetchUserData(username!);
      }
    }
    dispatch(setProfileSummary(tempUserData));
    setUserData(tempUserData);
  };

  return (
    <div>
      <div className="flex items-center justify-center w-full text-[24px] mb-6">
        <>
          {" "}
          Welcome to GitInsight! Discover top talent through GitHub profiles
          with ease
        </>
      </div>
      {token || isGuest ? (
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
          {userData ? (
            <>
              <ProfileSummary />
              <LanguagesSummary languages={languages} />{" "}
            </>
          ) : (
            ""
          )}
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
