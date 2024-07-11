"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { UserState } from "@/store/slices/profileSummary";
import { fetchRepositories } from "@/utils/api";
import {
  Spin,
  Card,
  Badge,
  Tooltip,
  Statistic,
  StatisticProps,
  TabsProps,
  Tabs,
} from "antd";
import Cookies from "js-cookie";
import moment from "moment";
import CountUp from "react-countup";
import { ForkOutlined } from "@ant-design/icons";
import OwnContributions from "./Tabs/OwnContributions";
import OpenSourceContributions from "./Tabs/OpenSourceContributions";

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

  const formatter: StatisticProps["formatter"] = (value) => (
    <CountUp end={value as number} separator="," />
  );

  const onChange = (key: string) => {
    console.log(key);
  };
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchData = async () => {
      if (profileSummary.login) {
        try {
          const repositories = await fetchRepositories(
            profileSummary.login,
            accessToken!
          );

          const ownRepos = repositories.filter(
            (repo: any) =>
              repo.owner.login === profileSummary.login && !repo.isFork
          );

          const otherRepos = repositories.filter(
            (repo: any) =>
              repo.isFork || repo.owner.login !== profileSummary.login
          );
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
        } catch (error) {
          console.error("Error fetching contributions:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [profileSummary]);
  useEffect(() => {
    console.log(
      "own: ",
      ownReposContributions,
      "other",
      otherReposContributions
    );
  }, [ownReposContributions, otherReposContributions]);

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: (
        <div className="text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px]">
          Own Contributions
        </div>
      ),
      children: (
        <OwnContributions ownReposContributions={ownReposContributions} />
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
          openSourceContributions={otherReposContributions}
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
      <div className="p-2">
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      </div>
    </div>
  );
};

export default Contributions;
