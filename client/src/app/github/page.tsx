"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Button, FloatButton, Spin, message } from "antd";
import Search from "antd/es/input/Search";
import { fetchRepositories, fetchUserData } from "@/utils/github/api";
import ProfileSummary from "@/components/github/ProfileSummary/ProfileSummary";
import { useDispatch } from "react-redux";
import {
  setProfileSummary,
  setRepositories,
} from "@/store/slices/profileSummary";
import LanguagesSummary from "@/components/github/LanguagesSummary/LanguagesSummary";
import { setAccessToken } from "@/store/slices/authentication";
import { IProfileSummary } from "@/interfaces/profileSummary.interface";
import { fetchUserLanguages } from "@/graphql/queries/languages";
import { IRepository } from "@/interfaces/repo.interface";
import Contributions from "@/components/github/Contributions/Contributions";

const Page = () => {
  const dispatch = useDispatch();
  const [token, setToken] = useState<string | undefined>("");
  const [username, setUsername] = useState<string | null>("");
  const [userData, setUserData] = useState<IProfileSummary>();
  const [languages, setLanguages] = useState<any>({ Type: 10000 });
  const [loading, setLoading] = useState<boolean>(false);

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
    if (username === "" || !username) {
      dispatch(setProfileSummary({} as IProfileSummary));
      dispatch(setRepositories([]));
      setUserData({} as IProfileSummary);
      return;
    }
    setLoading(true);
    try {
      let tempUserData: IProfileSummary;
      let tempRepos: IRepository[];
      if (username && token) {
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
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (username === "" || !username) {
      dispatch(setProfileSummary({} as IProfileSummary));
      dispatch(setRepositories([]));
      setUserData({} as IProfileSummary);
    }
  }, [username, dispatch]);

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
      <div className="flex flex-col items-center justify-center w-full text-center mb-6">
        <div className="text-[32px] sm:text-[36px] md:text-[40px] lg:text-[44px] font-extrabold ">
          Universe <span className="text-blue-500">GitInsight</span>
        </div>
        <div className="text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] mt-2 text-gray-700">
          Discover top talent through GitHub profiles with ease
        </div>
        <div className="mt-4 w-2/3 sm:w-1/2 md:w-1/3 lg:w-1/4 h-1 bg-blue-500 rounded-full"></div>
      </div>

      {token ? (
        <div className="w-full">
          <Search
            placeholder="Enter GitHub username to explore..."
            // allowClear
            enterButton="Search"
            value={username!}
            size="large"
            className="w-full"
            onSearch={onSearch}
            onChange={(e: any) => setUsername(e.target.value)}
          />
          {loading ? (
            <div className="w-full flex flex-col justify-center mt-6 items-center m-auto">
              <div className="loader"></div>
              <div className="text-[16px] text-blue-400">
                Fetching user profile...
              </div>
            </div>
          ) : (
            userData?.login && (
              <>
                <ProfileSummary />
                {/* <CommitHeatmap /> */}
                <Contributions />
                <LanguagesSummary languages={languages} />
                {/* <Repositories /> */}
              </>
            )
          )}
        </div>
      ) : (
        <div className="w-[80%] m-auto flex justify-center">
          <Button
            type="primary"
            className="w-full"
            onClick={() => {
              {
                window.location.href = oauthUrl;
              }
            }}
          >
            Authorize with GitHub
          </Button>
        </div>
      )}
      <FloatButton.BackTop
        visibilityHeight={10}
        style={{ right: "90px" }}
        className="max-md:right-10"
      />
    </div>
  );
};

export default Page;
