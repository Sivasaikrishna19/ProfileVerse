import React, { useEffect, useState } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { useSelector } from "react-redux";
import { UserState } from "@/store/slices/profileSummary";
import Cookies from "js-cookie";
import { Select, Spin } from "antd";
import { fetchUserCommitHistory } from "@/graphql/queries/commitHistory";

const { Option } = Select;

const CommitHeatmap = () => {
  const [commitActivity, setCommitActivity] = useState<
    { date: string; count: number; isPrivate: boolean }[]
  >([]);
  const [availableYears, setAvailableYears] = useState<number[]>([]);
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );
  const [loading, setLoading] = useState<boolean>(false);

  const { profileSummary }: any = useSelector(
    (state: UserState) => state.profileSummary
  );
  const accessToken: string | undefined = Cookies.get("access_token");

  const fetchData = async (year: number) => {
    setLoading(true);
    try {
      const commitHistory = await fetchUserCommitHistory(
        profileSummary.login,
        accessToken!,
        year
      );

      const aggregatedData = commitHistory.reduce(
        (
          acc: { [date: string]: { count: number; isPrivate: boolean } },
          { date, count, isPrivate }: any
        ) => {
          if (date) {
            if (!acc[date]) {
              acc[date] = { count: 0, isPrivate };
            }
            acc[date].count += count;
          }
          return acc;
        },
        {}
      );

      const heatmapData: any = Object.entries(aggregatedData).map(
        ([date, { count, isPrivate }]) => ({
          date,
          count,
          isPrivate,
        })
      );

      console.log("commit activity", heatmapData);
      setCommitActivity(heatmapData);
    } catch (error) {
      console.error("Error fetching commit activities:", error);
    } finally {
      setLoading(false);
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
    <div className="bg-[#d4e7fa] p-4 rounded-md shadow-mg mt-4 overflow-y-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 w-full">
        <Select
          defaultValue={selectedYear}
          style={{ width: 120 }}
          onChange={handleYearChange}
        >
          {availableYears.map((year) => (
            <Option key={year} value={year}>
              {year}
            </Option>
          ))}
        </Select>
        {!loading && (
          <div className="text-center mt-2">
            {commitActivity.reduce((acc, { count }) => acc + count, 0)}{" "}
            Contributions in {selectedYear}
          </div>
        )}
      </div>
      <div>
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <Spin />
          </div>
        ) : (
          <CalendarHeatmap
            startDate={new Date(`${selectedYear - 1}-12-31`)}
            endDate={new Date(`${selectedYear}-12-31`)}
            values={commitActivity}
            classForValue={(value) => {
              if (!value) {
                return "color-empty";
              }
              return `color-github-${Math.min(value.count, 4)}`;
            }}
            tooltipDataAttrs={(value: any) => ({
              "data-tip": `${value.date}: ${value.count} commits ${
                value.isPrivate ? "(Private)" : ""
              }`,
            })}
          />
        )}
      </div>
    </div>
  );
};

export default CommitHeatmap;
