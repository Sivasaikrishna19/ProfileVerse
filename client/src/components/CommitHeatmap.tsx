// src/components/CommitHeatmap.tsx
import React, { useEffect, useState } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { useSelector } from "react-redux";
import { UserState } from "@/store/slices/profileSummary";
import Cookies from "js-cookie";
import { fetchUserCommitHistory } from "@/graphql/queries/commitHistory";
import { Select, Tooltip } from "antd";

const { Option } = Select;

const CommitHeatmap = () => {
  const [commitActivity, setCommitActivity] = useState<
    { date: string; count: number }[]
  >([]);
  const [availableYears, setAvailableYears] = useState<number[]>([]);
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );

  const { profileSummary }: any = useSelector(
    (state: UserState) => state.profileSummary
  );
  const accessToken: string | undefined = Cookies.get("access_token");

  const fetchData = async (year: number) => {
    try {
      const commitHistory = await fetchUserCommitHistory(
        profileSummary.login,
        accessToken!,
        year
      );
      const commitActivities = commitHistory.user.repositories.edges.flatMap(
        (repo: any) => {
          if (
            repo.node.defaultBranchRef &&
            repo.node.defaultBranchRef.target &&
            repo.node.defaultBranchRef.target.history
          ) {
            return repo.node.defaultBranchRef.target.history.edges.map(
              (commit: any) => ({
                date: commit.node.committedDate.split("T")[0],
                count: 1,
              })
            );
          }
          return [];
        }
      );

      const aggregatedData = commitActivities.reduce(
        (acc: { [date: string]: number }, { date, count }: any) => {
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

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
    fetchData(year);
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      if (profileSummary.login) {
        try {
          // Fetch the user creation year
          const userCreationYear = new Date(
            profileSummary.createdAt
          ).getFullYear();
          const currentYear = new Date().getFullYear();
          const years = [];
          for (let year = userCreationYear; year <= currentYear; year++) {
            years.push(year);
          }
          setAvailableYears(years);

          fetchData(selectedYear);
        } catch (error) {
          console.error("Error fetching initial data:", error);
        }
      }
    };

    fetchInitialData();
  }, [profileSummary.login, profileSummary.createdAt]);

  return (
    <div className="bg-[#d4e7fa] p-6 rounded-md shadow-lg mt-6">
      <div className="text-semibold text-2xl text-center mb-4">
        Commit History
      </div>
      <div className="flex justify-center mb-4">
        <Select
          defaultValue={selectedYear}
          style={{ width: 200 }}
          onChange={handleYearChange}
          className="w-full max-w-xs"
        >
          {availableYears.map((year) => (
            <Option key={year} value={year}>
              {year}
            </Option>
          ))}
        </Select>
      </div>
      <CalendarHeatmap
        startDate={new Date(`${selectedYear}-01-01`)}
        endDate={new Date(`${selectedYear}-12-31`)}
        values={commitActivity}
        classForValue={(value) => {
          if (!value) {
            return "color-empty";
          }
          return `color-github-${Math.min(value.count, 4)}`;
        }}
        tooltipDataAttrs={(value: any) => {
          return {
            "data-tip": `${value.date}: ${value.count} commit${
              value.count > 1 ? "s" : ""
            }`,
          };
        }}
      />
      {/* {commitActivity.map((activity) => (
        <Tooltip
          key={activity.date}
          title={`${activity.date}: ${activity.count} commit${
            activity.count > 1 ? "s" : ""
          }`}
        >
          <span className={`color-github-${Math.min(activity.count, 4)}`}>
            {activity.date}
          </span>
        </Tooltip>
      ))} */}
    </div>
  );
};

export default CommitHeatmap;
