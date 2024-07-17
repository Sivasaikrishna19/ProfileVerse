"use client";

import React from "react";
import { Badge, Card, Tooltip } from "antd";
import { ForkOutlined } from "@ant-design/icons";
import moment from "moment";
import { analyzeCommitFrequency } from "../RepoHealth/CommitFrequency";

const OwnContributions = ({
  ownReposContributions,
}: {
  ownReposContributions: any[];
}) => {
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

  console.log("Own repo contributions: ", ownReposContributions);
  return (
    <div>
      {/* <h3 className="text-xl font-semibold mb-2">Own Repositories</h3> */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ownReposContributions?.length > 0 ? (
          ownReposContributions.map((repo: any) => {
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
                        {analyzeCommitFrequency(repo.allCommits).toFixed(2)}
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
          })
        ) : (
          <p>No contributions to own repositories.</p>
        )}
      </div>
    </div>
  );
};

export default OwnContributions;
