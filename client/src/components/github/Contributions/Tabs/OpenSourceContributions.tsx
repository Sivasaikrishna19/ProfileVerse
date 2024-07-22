"use client";

import React from "react";
import { Badge } from "antd";

import moment from "moment";
import Card from "../../Card/Card";

const OpenSourceContributions = ({
  openSourceContributions,
}: {
  openSourceContributions: any[];
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

  console.log("Open source contributions: ", openSourceContributions);

  return (
    <div>
      {/* <h3 className="text-xl font-semibold mb-2">Other Repositories</h3> */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {openSourceContributions?.length > 0 ? (
          openSourceContributions.map((repo: any) => {
            const activity = getActivityStatus(repo.updatedAt);
            return (
              <Badge.Ribbon
                key={repo.name}
                text={activity.status}
                color={activity.color}
                placement="start"
              >
                <Card repo={repo} />
              </Badge.Ribbon>
            );
          })
        ) : (
          <p>No contributions to other repositories.</p>
        )}
      </div>
    </div>
  );
};

export default OpenSourceContributions;
