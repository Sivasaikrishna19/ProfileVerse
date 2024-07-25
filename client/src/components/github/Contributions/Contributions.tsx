"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { UserState } from "@/store/slices/profileSummary";
import { fetchRepositories } from "@/utils/github/api";
import { Statistic, StatisticProps, TabsProps, Tabs, Select, Spin } from "antd";
import Cookies from "js-cookie";
import CountUp from "react-countup";
import OwnContributions from "./Tabs/OwnContributions";
import OpenSourceContributions from "./Tabs/OpenSourceContributions";
import CommitHeatmap from "../CommitHeatmap/CommitHeatmap";
import { calculateRepoHealth } from "../RepoHealth/RepoHealth";

const Contributions = () => {
  const { profileSummary }: any = useSelector(
    (state: UserState) => state.profileSummary
  );
  const accessToken: string | undefined = Cookies.get("access_token");
  const [ownReposContributions, setOwnReposContributions] = useState<any[]>([]);
  const [otherReposContributions, setOtherReposContributions] = useState<any[]>(
    []
  );
  const [ownReposContributionsCount, setOwnReposContributionsCount] =
    useState<number>(0);
  const [otherReposContributionsCount, setOtherReposContributionsCount] =
    useState<number>(0);
  const [pullRequestsCount, setPullRequestsCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [languageOptions, setLanguageOptions] = useState<any[]>([]);
  const [filteredRepos, setFilteredRepos] = useState<any[]>([]);
  const [sortCriteria, setSortCriteria] = useState<string>("lastUpdated");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("all");

  const formatter: StatisticProps["formatter"] = (value) => (
    <CountUp end={value as number} separator="," />
  );

  const onChange = (key: string) => {
    console.log(key);
  };

  const handleSortChange = (value: string) => {
    setSortCriteria(value);
    sortRepositories(filteredRepos, value);
  };

  const handleLanguageChange = (value: string) => {
    setSelectedLanguage(value);
    const repos =
      value === "all"
        ? [...ownReposContributions, ...otherReposContributions]
        : [...ownReposContributions, ...otherReposContributions].filter(
            (repo) => repo.primaryLanguage?.name.toLowerCase() === value
          );
    sortRepositories(repos, sortCriteria);
  };

  const sortRepositories = (repos: any[], criteria: string) => {
    let sortedRepos;
    switch (criteria) {
      case "name":
        sortedRepos = repos.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "contributions":
        sortedRepos = repos.sort(
          (a, b) => b.contributions?.totalCount - a.contributions?.totalCount
        );
        break;
      case "stars":
        sortedRepos = repos.sort((a, b) => b.stargazerCount - a.stargazerCount);
        break;
      case "repoHealth":
        sortedRepos = repos.sort(
          (a, b) =>
            calculateRepoHealth(b).totalHealthScore -
            calculateRepoHealth(a).totalHealthScore
        );
        break;
      case "lastUpdated":
      default:
        sortedRepos = repos.sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
        break;
    }
    setFilteredRepos(sortedRepos);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (profileSummary.login) {
        try {
          const repositories = await fetchRepositories(
            profileSummary.login,
            accessToken!
          );
          setLoading(false);

          const ownRepos = repositories.filter(
            (repo: any) =>
              repo.owner.login === profileSummary.login && !repo.isFork
          );

          const otherRepos = repositories.filter(
            (repo: any) =>
              !repo.isFork && repo.owner.login !== profileSummary.login
          );

          const allRepos = [...ownRepos, ...otherRepos];
          const languageOptions = Array.from(
            new Set(allRepos.map((repo: any) => repo.primaryLanguage?.name))
          )
            .filter((lang) => lang)
            .map((lang) => ({
              value: lang.toLowerCase(),
              label: lang,
            }));
          setLanguageOptions([
            { value: "all", label: "All" },
            ...languageOptions,
          ]);

          const ownReposContributionsCount = ownRepos.reduce(
            (acc: any, repo: any) =>
              acc + (repo.contributions?.totalCount || 0),
            0
          );

          const otherReposContributionsCount = otherRepos.reduce(
            (acc: any, repo: any) =>
              acc + (repo.contributions?.totalCount || 0),
            0
          );

          const pullRequestsCount = repositories.reduce(
            (acc: any, repo: any) => acc + (repo.pullRequests?.totalCount || 0),
            0
          );

          setPullRequestsCount(pullRequestsCount);
          setOwnReposContributionsCount(ownReposContributionsCount);
          setOtherReposContributionsCount(otherReposContributionsCount);
          setOwnReposContributions(ownRepos);
          setOtherReposContributions(otherRepos);

          setFilteredRepos(allRepos);
          sortRepositories(allRepos, sortCriteria);
        } catch (error) {
          console.error("Error fetching contributions:", error);
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [profileSummary]);

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: (
        <div className="text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px]">
          Own Contributions
        </div>
      ),
      children: (
        <OwnContributions
          ownReposContributions={filteredRepos.filter(
            (repo: any) =>
              !repo.isFork && repo.owner.login === profileSummary.login
          )}
        />
      ),
    },
    {
      key: "2",
      label: (
        <div className="text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px]">
          Open Source Contributions
        </div>
      ),
      children: (
        <OpenSourceContributions
          openSourceContributions={filteredRepos.filter(
            (repo) => repo.isFork || repo.owner.login !== profileSummary.login
          )}
        />
      ),
    },
  ];

  return (
    <div className="bg-[#d4e7fa] p-4 rounded-md shadow-mg mt-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Contributions</h2>
      <div className="my-4 flex flex-col md:flex-row justify-between">
        <div className="bg-white p-4 rounded-md w-full md:mx-2 text-center mb-4 md:mb-0 flex flex-col justify-center items-center">
          <div className="min-h-[50px] flex items-center justify-center text-[20px]">
            Own Repositories
          </div>
          <Statistic
            value={ownReposContributions.length}
            formatter={formatter}
            className="text-[28px] font-bold"
          />
        </div>
        <div className="bg-white p-4 rounded-md w-full md:mx-2 text-center mb-4 md:mb-0 flex flex-col justify-center items-center">
          <div className="min-h-[50px] flex items-center justify-center text-[20px]">
            Other Repositories
          </div>
          <Statistic
            value={otherReposContributions.length}
            formatter={formatter}
            className="text-[28px] font-bold"
          />
        </div>
        <div className="bg-white p-4 rounded-md w-full md:mx-2 text-center mb-4 md:mb-0 flex flex-col justify-center items-center">
          <div className="min-h-[50px] flex items-center justify-center text-[20px]">
            Own Repos Contributions
          </div>
          <Statistic
            value={ownReposContributionsCount}
            formatter={formatter}
            className="text-[28px] font-bold"
          />
        </div>
        <div className="bg-white p-4 rounded-md w-full md:mx-2 text-center mb-4 md:mb-0 flex flex-col justify-center items-center">
          <div className="min-h-[50px] flex items-center justify-center text-[20px]">
            Open Source Contributions
          </div>
          <Statistic
            value={otherReposContributionsCount}
            formatter={formatter}
            className="text-[28px] font-bold"
          />
        </div>
        <div className="bg-white p-4 rounded-md w-full md:mx-2 text-center mb-4 md:mb-0 flex flex-col justify-center items-center">
          <div className="min-h-[50px] flex items-center justify-center text-[20px]">
            Pull Requests
          </div>
          <Statistic
            value={pullRequestsCount}
            formatter={formatter}
            className="text-[28px] font-bold"
          />
        </div>
      </div>
      <CommitHeatmap />
      <div className="p-2 w-full">
        <div className="flex flex-col sm:flex-row items-center mb-4 gap-4 w-full">
          <div className="w-full sm:w-1/2">
            <label className="block mb-2 text-sm sm:text-base md:text-lg lg:text-xl font-medium text-gray-700">
              Sort By
            </label>
            <Select
              defaultValue="lastUpdated"
              style={{ width: "100%" }}
              onChange={handleSortChange}
              options={[
                { value: "lastUpdated", label: "Last updated" },
                { value: "contributions", label: "Contributions" },
                { value: "name", label: "Name" },
                { value: "stars", label: "Stars" },
                { value: "repoHealth", label: "Repo Health" },
              ]}
            />
          </div>
          <div className="w-full sm:w-1/2">
            <label className="block mb-2 text-sm sm:text-base md:text-lg lg:text-xl font-medium text-gray-700">
              Language
            </label>
            <Select
              defaultValue="all"
              style={{ width: "100%" }}
              onChange={handleLanguageChange}
              options={languageOptions}
            />
          </div>
        </div>

        {!loading ? (
          <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        ) : (
          <Spin />
        )}
      </div>
    </div>
  );
};

export default Contributions;
