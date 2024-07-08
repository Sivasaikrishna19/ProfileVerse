import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { UserState } from "@/store/slices/profileSummary";
import { fetchUserContributions } from "@/utils/api";
import { Spin, Card } from "antd";
import Cookies from "js-cookie";

const Contributions = () => {
  const { profileSummary }: any = useSelector(
    (state: UserState) => state.profileSummary
  );
  const accessToken: string | undefined = Cookies.get("access_token");
  const [ownReposContributions, setOwnReposContributions] = useState<any[]>([]);
  const [otherReposContributions, setOtherReposContributions] = useState<any[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      if (profileSummary.login) {
        try {
          const contributions = await fetchUserContributions(
            profileSummary.login,
            accessToken!
          );
          const ownRepos = contributions.filter(
            (contribution: any) =>
              contribution.repository.owner.login === profileSummary.login
          );
          const otherRepos = contributions.filter(
            (contribution: any) =>
              contribution.repository.owner.login !== profileSummary.login
          );
          setOwnReposContributions(ownRepos);
          setOtherReposContributions(otherRepos);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching contributions:", error);
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [profileSummary]);

  return (
    <div className="bg-[#d4e7fa] p-4 rounded-md shadow-mg mt-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Contributions</h2>
      {loading ? (
        <div className="flex justify-center">
          <Spin size="large" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-xl font-semibold mb-2">Own Repositories</h3>
            {ownReposContributions.length > 0 ? (
              ownReposContributions.map((contribution: any) => (
                <Card
                  key={contribution.repository.name}
                  className="mb-4 bg-white p-4 rounded-md shadow-md"
                >
                  <h4 className="text-lg font-bold">
                    <a
                      href={contribution.repository.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {contribution.repository.name}
                    </a>
                  </h4>
                  <div className="text-gray-600">
                    <span className="font-semibold">Total Contributions: </span>
                    {contribution.contributions.totalCount}
                  </div>
                </Card>
              ))
            ) : (
              <p>No contributions to own repositories.</p>
            )}
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Other Repositories</h3>
            {otherReposContributions.length > 0 ? (
              otherReposContributions.map((contribution: any) => (
                <Card
                  key={contribution.repository.name}
                  className="mb-4 bg-white p-4 rounded-md shadow-md"
                >
                  <h4 className="text-lg font-bold">
                    <a
                      href={contribution.repository.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {contribution.repository.name}
                    </a>
                  </h4>
                  <div className="text-gray-600">
                    <span className="font-semibold">Total Contributions: </span>
                    {contribution.contributions.totalCount}
                  </div>
                </Card>
              ))
            ) : (
              <p>No contributions to other repositories.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Contributions;
