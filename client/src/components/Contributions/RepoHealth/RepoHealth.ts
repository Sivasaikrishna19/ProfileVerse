import { analyzeCommitFrequency } from "./CommitFrequency";
import { calculateReadmeScore } from "./ReadmeQuality";



export const calculateRepoHealth = (repo: any) => {
  const readmeContent = repo.object?.text || "";
  const readmeScore :any= calculateReadmeScore(readmeContent);

  const commitFrequencyScore = analyzeCommitFrequency(repo.allCommits);

  // Assuming equal weightage for both aspects
  const readmeWeight = 0.3;
  const commitFrequencyWeight = 0.7;

  const totalHealthScore = (readmeScore * readmeWeight) + (commitFrequencyScore * commitFrequencyWeight);

  return {
    readmeScore,
    commitFrequencyScore,
    totalHealthScore: parseInt((totalHealthScore * 10).toFixed(2)),
  };
};
