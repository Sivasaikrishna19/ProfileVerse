// src/components/CommitHeatmap.tsx
import React, { useEffect, useState } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { useSelector } from "react-redux";
import { UserState } from "@/store/slices/profileSummary";
import Cookies from "js-cookie";
import { fetchUserCommitHistory } from "@/graphql/queries/commitHistory";

const CommitHeatmap = () => {
  const [commitActivity, setCommitActivity] = useState<
    { date: string; count: number }[]
  >([]);
  const { profileSummary }: any = useSelector(
    (state: UserState) => state.profileSummary
  );
  const accessToken: string | undefined = Cookies.get("access_token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const commitHistory = await fetchUserCommitHistory(
          profileSummary.login,
          accessToken!
        );

        const commitActivities = commitHistory.user.repositories.edges.flatMap(
          (repo: any) =>
            repo.node.defaultBranchRef.target.history.edges.map(
              (commit: any) => ({
                date: commit.node.committedDate.split("T")[0],
                count: 1 as number,
              })
            )
        );

        const aggregatedData = commitActivities.reduce(
          (
            acc: { [date: string]: number },
            { date, count }: { date: string; count: number }
          ) => {
            if (date) {
              acc[date] = (acc[date] || 0) + count;
            }
            return acc;
          },
          {}
        );

        const heatmapData: any = Object.entries(aggregatedData).map(
          ([date, count]) => ({
            date,
            count,
          })
        );

        setCommitActivity(heatmapData);
      } catch (error) {
        console.error("Error fetching commit activities:", error);
      }
    };

    if (profileSummary.login && accessToken) {
      fetchData();
    }
  }, [profileSummary.login, accessToken]);

  return (
    <div className="bg-[#d4e7fa] p-4 rounded-md shadow-mg mt-4 overflow-y-auto">
      <div className="text-semibold text-[18px] text-center mb-2">
        Commit History
      </div>
      <CalendarHeatmap
        startDate={new Date("2023-07-01")}
        endDate={new Date("2024-07-31")}
        values={commitActivity}
        classForValue={(value) => {
          if (!value) {
            return "color-empty";
          }
          return `color-github-${Math.min(value.count, 4)}`;
        }}
        tooltipDataAttrs={(value: any) => {
          return {
            "data-tip": `${value.date}: ${value.count} commits`,
          };
        }}
      />
    </div>
  );
};

export default CommitHeatmap;
