"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { UserState } from "@/store/slices/profileSummary";
import { fetchRepositories } from "@/utils/api";
import { Spin, Card, Badge, Tooltip, Statistic, StatisticProps } from "antd";
import Cookies from "js-cookie";
import moment from "moment";
import CountUp from "react-countup";
import { ForkOutlined } from "@ant-design/icons";

const Contributions = () => {
  const { profileSummary }: any = useSelector(
    (state: UserState) => state.profileSummary
  );
  const accessToken: string | undefined = Cookies.get("access_token");
  const [ownReposContributions, setOwnReposContributions] = useState<any[]>([]);
  const [otherReposContributions, setOtherReposContributions] = useState<any[]>(
    []
  );
  const [totalContributions, setTotalContributions] = useState<number>();
  const [highestContributions, setHighestContributions] = useState<number>();
  const formatter: StatisticProps["formatter"] = (value) => (
    <CountUp end={value as number} separator="," />
  );

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

          setOwnReposContributions(ownRepos);
          setOtherReposContributions(otherRepos);

          const highestContributions = Math.max(
            ...repositories.map((repo: any) =>
              !repo.isFork ? repo.contributions.totalCount : 0
            )
          );

          setHighestContributions(
            highestContributions <= 0 ? 0 : highestContributions
          );
          const totalContributions = repositories.reduce(
            (acc: number, repo: any) =>
              acc + (!repo.isFork ? repo.contributions.totalCount : 0),
            0
          );
          setTotalContributions(
            totalContributions <= 0 ? 0 : totalContributions
          );
        } catch (error) {
          console.error("Error fetching contributions:", error);
        }
      }
    };

    fetchData();
  }, [profileSummary]);

  const getActivityStatus = (updatedAt: string) => {
    const lastUpdated = moment(updatedAt);
    const now = moment();

    if (now.diff(lastUpdated, "months") <= 1) {
      return { status: "Recently Active", color: "green" };
    } else if (now.diff(lastUpdated, "months") <= 6) {
      return { status: "Moderately Active", color: "orange" };
    } else {
      return { status: "Inactive", color: "red" };
    }
  };

  return (
    <div className="bg-[#d4e7fa] p-4 rounded-md shadow-mg mt-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Contributions</h2>
      <div className="my-4 flex flex-col md:flex-row justify-between">
        <div className="bg-white p-4 rounded-md w-full md:mx-2 text-center mb-4 md:mb-0">
          <div className="text-[28px]">
            <Statistic
              title={<div className="text-[20px]">Own Repositories</div>}
              value={ownReposContributions.length}
              formatter={formatter}
            />
          </div>
        </div>
        <div className="bg-white p-4 rounded-md w-full md:mx-2 text-center mb-4 md:mb-0">
          <Statistic
            title={<div className="text-[20px]">Other Repositories</div>}
            value={otherReposContributions.length}
            formatter={formatter}
          />
        </div>
        <div className="bg-white p-4 rounded-md w-full md:mx-2 text-center mb-4 md:mb-0">
          <Statistic
            title={<div className="text-[20px]">Total Contributions</div>}
            value={totalContributions}
            formatter={formatter}
          />
        </div>
        <div className="bg-white p-4 rounded-md w-full md:mx-2 text-center mb-4 md:mb-0">
          <Statistic
            title={<div className="text-[20px]">Highest Contributions</div>}
            value={highestContributions}
            formatter={formatter}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
        <div>
          <h3 className="text-xl font-semibold mb-2">Own Repositories</h3>
          <div>
            {ownReposContributions.length > 0 ? (
              ownReposContributions.map((repo) => {
                const activity = getActivityStatus(repo.updatedAt);
                return (
                  <Badge.Ribbon
                    key={repo.name}
                    text={activity.status}
                    color={activity.color}
                    placement="start"
                  >
                    <Card className="bg-white p-4 rounded-md shadow-md flex flex-col justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row items-center justify-between w-full">
                          <h4 className="text-lg font-bold">
                            <a
                              href={repo.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <div className="flex items-center">
                                {repo.name && repo.name.length > 25 ? (
                                  <Tooltip title={repo.name}>
                                    {repo.name.slice(0, 25) + "..."}
                                  </Tooltip>
                                ) : (
                                  repo.name
                                )}
                                <div className="ml-1">
                                  {repo.isFork ? <ForkOutlined /> : ""}
                                </div>
                              </div>
                            </a>
                          </h4>
                          <div className="p-3 rounded-md bg-[#d4e7fa] mt-2 sm:mt-0 sm:ml-4 w-full sm:w-auto mb-2 text-center">
                            <span className="font-semibold">
                              Contributions:{" "}
                            </span>
                            {repo.contributions.totalCount}
                          </div>
                        </div>

                        <p className="text-gray-600">
                          {repo.description && repo.description.length > 100 ? (
                            <Tooltip title={repo.description}>
                              {repo.description.slice(0, 100) + "..."}
                            </Tooltip>
                          ) : (
                            repo.description || "No description available."
                          )}
                        </p>
                      </div>
                      <div>
                        <div className="flex justify-between mt-2">
                          <div>
                            <span className="font-semibold">Stars: </span>
                            {repo.stargazerCount}
                          </div>
                          <div>
                            <span className="font-semibold">Forks: </span>
                            {repo.forkCount}
                          </div>
                          <div>
                            <span className="font-semibold">Issues: </span>
                            {repo.issues.totalCount || 0}
                          </div>
                        </div>
                        <div className="mt-2">
                          <span className="font-semibold">Language: </span>
                          {repo.primaryLanguage
                            ? repo.primaryLanguage.name
                            : "N/A"}
                        </div>
                        <div className="flex justify-between mt-2">
                          <Tooltip
                            title={`Created at: ${new Date(
                              repo.createdAt
                            ).toLocaleDateString()}`}
                          >
                            <div>
                              <span className="font-semibold">Created: </span>
                              {new Date(repo.createdAt).toLocaleDateString()}
                            </div>
                          </Tooltip>
                          <Tooltip
                            title={`Last Updated: ${new Date(
                              repo.updatedAt
                            ).toLocaleDateString()}`}
                          >
                            <div>
                              <span className="font-semibold">Updated: </span>
                              {new Date(repo.updatedAt).toLocaleDateString()}
                            </div>
                          </Tooltip>
                        </div>
                      </div>
                    </Card>
                  </Badge.Ribbon>
                );
              })
            ) : (
              <p>No contributions to own repositories.</p>
            )}
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Other Repositories</h3>
          {otherReposContributions.length > 0 ? (
            otherReposContributions.map((repo) => {
              const activity = getActivityStatus(repo.updatedAt);
              return (
                <Badge.Ribbon
                  key={repo.name}
                  text={activity.status}
                  color={activity.color}
                  placement="start"
                >
                  <Card className="bg-white p-4 rounded-md shadow-md flex flex-col justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row items-center justify-between w-full">
                        <h4 className="text-lg font-bold">
                          <a
                            href={repo.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <div className="flex items-center">
                              {repo.name && repo.name.length > 25 ? (
                                <Tooltip title={repo.name}>
                                  {repo.name.slice(0, 25) + "..."}
                                </Tooltip>
                              ) : (
                                repo.name
                              )}
                              <div className="ml-1">
                                {repo.isFork ? <ForkOutlined /> : ""}
                              </div>
                            </div>
                          </a>
                        </h4>
                        <div className="p-3 rounded-md bg-[#d4e7fa] mt-2 sm:mt-0 sm:ml-4 w-full sm:w-auto mb-2 text-center">
                          <span className="font-semibold">Contributions: </span>
                          {repo.contributions.totalCount}
                        </div>
                      </div>

                      <p className="text-gray-600">
                        {repo.description && repo.description.length > 100 ? (
                          <Tooltip title={repo.description}>
                            {repo.description.slice(0, 100) + "..."}
                          </Tooltip>
                        ) : (
                          repo.description || "No description available."
                        )}
                      </p>
                    </div>
                    <div>
                      <div className="flex justify-between mt-2">
                        <div>
                          <span className="font-semibold">Stars: </span>
                          {repo.stargazerCount}
                        </div>
                        <div>
                          <span className="font-semibold">Forks: </span>
                          {repo.forkCount}
                        </div>
                        <div>
                          <span className="font-semibold">Issues: </span>
                          {repo.issues.totalCount || 0}
                        </div>
                      </div>
                      <div className="mt-2">
                        <span className="font-semibold">Language: </span>
                        {repo.primaryLanguage
                          ? repo.primaryLanguage.name
                          : "N/A"}
                      </div>
                      <div className="flex justify-between mt-2">
                        <Tooltip
                          title={`Created at: ${new Date(
                            repo.createdAt
                          ).toLocaleDateString()}`}
                        >
                          <div>
                            <span className="font-semibold">Created: </span>
                            {new Date(repo.createdAt).toLocaleDateString()}
                          </div>
                        </Tooltip>
                        <Tooltip
                          title={`Last Updated: ${new Date(
                            repo.updatedAt
                          ).toLocaleDateString()}`}
                        >
                          <div>
                            <span className="font-semibold">Updated: </span>
                            {new Date(repo.updatedAt).toLocaleDateString()}
                          </div>
                        </Tooltip>
                      </div>
                    </div>
                  </Card>
                </Badge.Ribbon>
              );
            })
          ) : (
            <p>No contributions to other repositories.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contributions;
