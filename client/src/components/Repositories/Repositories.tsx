"use client";

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { UserState } from "@/store/slices/profileSummary";
import { Badge, Card, Tooltip } from "antd";
import { IRepository } from "@/interfaces/repo.interface";
import moment from "moment";

const Repositories = () => {
  const { repos }: any = useSelector(
    (state: UserState) => state.profileSummary
  );

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

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + "...";
  };

  return (
    <div className="bg-[#d4e7fa] p-4 rounded-md shadow-mg mt-4">
      <div className="text-semibold text-[20px] text-center mb-2">
        Repositories
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
        {repos.map((repo: IRepository) => {
          const activity = getActivityStatus(repo.updatedAt);
          return (
            <Badge.Ribbon
              key={repo.name}
              text={activity.status}
              color={activity.color}
              placement="start"
            >
              <Card className="bg-white p-4 rounded-md shadow-md flex flex-col justify-between min-h-[200px]">
                <div className="flex-1">
                  <h2 className="text-xl font-bold">
                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {repo.name}
                    </a>
                  </h2>
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
                      {repo.openIssuesCount || 0}
                    </div>
                  </div>
                  <div className="mt-2">
                    <span className="font-semibold">Language: </span>
                    {repo.primaryLanguage ? repo.primaryLanguage.name : "N/A"}
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
        })}
      </div>
    </div>
  );
};

export default Repositories;
