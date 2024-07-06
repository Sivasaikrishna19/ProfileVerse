import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { UserState } from "@/store/slices/profileSummary";
import { fetchUserContributions } from "@/utils/api";
import { Spin, Card } from "antd";

const Contributions = () => {
  const { profileSummary }: any = useSelector(
    (state: UserState) => state.profileSummary
  );
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
            profileSummary.token
          );
          const ownRepos = contributions.filter(
            (contribution: any) =>
              contribution.owner.login === profileSummary.login
          );
          const otherRepos = contributions.filter(
            (contribution: any) =>
              contribution.owner.login !== profileSummary.login
          );
          setOwnReposContributions(ownRepos);
          setOtherReposContributions(otherRepos);
        } catch (error) {
          console.error("Error fetching contributions:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [profileSummary.login, profileSummary.token]);

  if (loading) {
    return <Spin />;
  }

  return (
    <div className="bg-[#d4e7fa] p-4 rounded-md shadow-mg mt-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Contributions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-xl font-semibold mb-2">Own Repositories</h3>
          {ownReposContributions.length > 0 ? (
            ownReposContributions.map((repo) => (
              <Card
                key={repo.id}
                className="mb-4 bg-white p-4 rounded-md shadow-md"
              >
                <h4 className="text-lg font-bold">
                  <a href={repo.url} target="_blank" rel="noopener noreferrer">
                    {repo.name}
                  </a>
                </h4>
                <p className="text-gray-600">
                  {repo.description || "No description available."}
                </p>
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
              </Card>
            ))
          ) : (
            <p>No contributions to own repositories.</p>
          )}
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Other Repositories</h3>
          {otherReposContributions.length > 0 ? (
            otherReposContributions.map((repo) => (
              <Card
                key={repo.id}
                className="mb-4 bg-white p-4 rounded-md shadow-md"
              >
                <h4 className="text-lg font-bold">
                  <a href={repo.url} target="_blank" rel="noopener noreferrer">
                    {repo.name}
                  </a>
                </h4>
                <p className="text-gray-600">
                  {repo.description || "No description available."}
                </p>
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
              </Card>
            ))
          ) : (
            <p>No contributions to other repositories.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contributions;
