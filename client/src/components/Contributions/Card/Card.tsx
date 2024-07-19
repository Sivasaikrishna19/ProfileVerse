import { ForkOutlined } from "@ant-design/icons";
import { Tooltip, Card as AntdCard, Progress, ProgressProps } from "antd";
import React from "react";
import { analyzeCommitFrequency } from "../RepoHealth/CommitFrequency";
import { calculateRepoHealth } from "../RepoHealth/RepoHealth";

const Card = ({ repo }: any) => {
  const twoColors: ProgressProps["strokeColor"] = {
    "0%": "#108ee9",
    "100%": "#87d068",
  };
  return (
    <div>
      <AntdCard className="bg-white p-4 rounded-md shadow-md flex flex-col justify-between mb-4">
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row items-center justify-between w-full">
            <h4 className="text-lg font-bold">
              <a href={repo.url} target="_blank" rel="noopener noreferrer">
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
            <div className="sm:mb-0 mb-2">
              <span className="font-semibold mr-2">Repo Health </span>

              <Progress
                type="dashboard"
                percent={Number(calculateRepoHealth(repo).totalHealthScore)}
                strokeColor={twoColors}
                size={40}
              />
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
          <div className="mb-2 flex justify-between">
            <div>
              <span className="font-semibold">Language: </span>
              {repo.primaryLanguage ? repo.primaryLanguage.name : "N/A"}
            </div>
            <div className="text-blue-500">
              <span className="font-semibold">Contributions: </span>
              {repo.contributions.totalCount}
            </div>
          </div>
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
      </AntdCard>
    </div>
  );
};

export default Card;
