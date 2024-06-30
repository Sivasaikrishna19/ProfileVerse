import React, { useEffect, useState } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { fetchCommitActivity, getTopRepositories } from "../utils/api";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { UserState } from "@/store/slices/profileSummary";

const CommitHeatmap = () => {
  const [commitActivity, setCommitActivity] = useState<any[]>([]);
  const { repos }: any = useSelector(
    (state: UserState) => state.profileSummary
  );
  const { profileSummary }: any = useSelector(
    (state: UserState) => state.profileSummary
  );

  const access_token: string | undefined = Cookies.get("access_token");

  const convertCommitActivity = (commitActivity: any[]) => {
    const aggregatedData = commitActivity
      .flatMap((week: any) => {
        const weekStartDate = new Date(week.week * 1000);
        return week.days.map((count: number, index: number) => {
          const dayDate = new Date(weekStartDate);
          dayDate.setDate(weekStartDate.getDate() + index);
          const formattedDate = dayDate.toISOString().split("T")[0];
          return {
            date: formattedDate,
            count,
          };
        });
      })
      .reduce((acc: { [key: string]: number }, { date, count }) => {
        if (acc[date]) {
          acc[date] += count;
        } else {
          acc[date] = count;
        }
        return acc;
      }, {});

    return Object.entries(aggregatedData).map(([date, count]) => ({
      date,
      count,
    }));
  };
  const fetchData = async () => {
    try {
      const topRepos = getTopRepositories([...repos]);

      const allCommitActivities = await Promise.all(
        topRepos.map(async (repo: IRepository) => {
          const commitActivity = await fetchCommitActivity(
            profileSummary.login,
            repo.name,
            access_token
          );

          return Array.isArray(commitActivity) ? commitActivity : [];
        })
      );

      const tempCommitActivity = allCommitActivities.flat();

      const tempActivity = convertCommitActivity(tempCommitActivity);
      setCommitActivity(tempActivity);
    } catch (error) {
      console.error("Error fetching commit activity:", error);
    }
  };
  useEffect(() => {
    if (profileSummary.login && access_token) {
      fetchData();
    }
  }, [profileSummary.login, access_token]);

  return (
    <div>
      <h2>Commit Activity</h2>
      <CalendarHeatmap
        startDate={new Date("2023-08-01")}
        endDate={new Date("2024-7-31")}
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
