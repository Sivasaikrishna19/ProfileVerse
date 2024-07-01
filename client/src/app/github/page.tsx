"use client";
import React, { useCallback, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Button, Spin } from "antd";
import Search from "antd/es/input/Search";
import { fetchRepositories, fetchUserData } from "@/utils/api";
import ProfileSummary from "@/components/ProfileSummary/ProfileSummary";
import { useDispatch } from "react-redux";
import {
  setProfileSummary,
  setRepositories,
} from "@/store/slices/profileSummary";
import LanguagesSummary from "@/components/LanguagesSummary/LanguagesSummary";
import { setAccessToken } from "@/store/slices/authentication";
import { IProfileSummary } from "@/interfaces/profileSummary.interface";
import { fetchUserLanguages } from "@/graphql/queries/languages";
import { IRepository } from "@/interfaces/repo.interface";
import CommitHeatmap from "@/components/CommitHeatmap";

const Page = () => {
  const dispatch = useDispatch();
  const [token, setToken] = useState<string | undefined>("");
  const [isGuest, setIsGuest] = useState<boolean>(false);
  const [username, setUsername] = useState<string | null>("");
  const [userData, setUserData] = useState<IProfileSummary>();
  const [languages, setLanguages] = useState<any>({ Type: 10000 });
  const [loading, setLoading] = useState<boolean>(false);

  const handleGuestLogin = useCallback(() => {
    setIsGuest(true);
  }, []);

  useEffect(() => {
    const tempToken: string | undefined = Cookies.get("access_token");
    if (tempToken) {
      setToken(tempToken);
      dispatch(setAccessToken(tempToken));
    }
  }, [dispatch]);
  const significantLanguages = [
    "JavaScript",
    "TypeScript",
    "Python",
    "Java",
    "C++",
    "C#",
    "PHP",
    "Ruby",
    "Go",
    "Rust",
    "Kotlin",
    "Swift",
    "Objective-C",
    "Scala",
    "Haskell",
    "Shell",
    "HTML",
    "CSS",
    "Dart",
    "Perl",
    "Lua",
    "Elixir",
    "Clojure",
    "R",
    "MATLAB",
  ];

  const onSearch = async () => {
    if (username == "" || !username) {
      dispatch(setProfileSummary({} as IProfileSummary));
      dispatch(setRepositories([]));
    }
    setLoading(true);
    let tempUserData: IProfileSummary;
    let tempRepos: IRepository[];
    if (username) {
      if (token) {
        tempUserData = await fetchUserData(username, token);
        tempRepos = await fetchRepositories(username, token);
        const tempLangStats = await fetchUserLanguages(username, token);
        const filteredLangStats = tempLangStats.filter((lang: any) =>
          significantLanguages.includes(lang.language)
        );
        setLanguages(filteredLangStats);
        dispatch(setRepositories(tempRepos));
        dispatch(setProfileSummary(tempUserData));
        setUserData(tempUserData);
      }

      setLoading(false);
    }
  };

  useEffect(() => {
    if (username == "" || !username) {
      dispatch(setProfileSummary({} as IProfileSummary));
      dispatch(setRepositories([]));
      setUserData({} as IProfileSummary);
    }
  }, [username]);

  const client_id =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID_PROD
      : process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID_DEV;

  const redirect_uri =
    process.env.NODE_ENV === "production"
      ? `${process.env.NEXT_PUBLIC_PROD_URL}/api/github/callback`
      : `${process.env.NEXT_PUBLIC_DEV_URL}`;

  const oauthUrl = `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=user,repo`;

  return (
    <div>
      <div className="flex items-center justify-center w-full text-[24px] mb-6 text-center">
        Welcome to GitInsight! Discover top talent through GitHub profiles with
        ease
      </div>
      {token || isGuest ? (
        <div className="w-full">
          <Search
            placeholder="Search for profile..."
            // allowClear
            enterButton="Search"
            value={username!}
            size="large"
            className="w-full"
            onSearch={onSearch}
            onChange={(e: any) => setUsername(e.target.value)}
          />
          {loading ? (
            <div className="w-full flex justify-center mt-6">
              <Spin tip="Loading..." size="large" />
            </div>
          ) : (
            userData?.login && (
              <>
                <ProfileSummary />
                <CommitHeatmap />
                <LanguagesSummary languages={languages} />
              </>
            )
          )}
        </div>
      ) : (
        <div className="w-[80%] m-auto flex justify-center">
          <Button
            type="primary"
            className="w-full mr-1"
            onClick={() => (window.location.href = oauthUrl)}
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

export default Page;
