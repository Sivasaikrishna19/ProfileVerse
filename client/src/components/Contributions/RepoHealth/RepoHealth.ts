import { analyzeCommitFrequency } from "./CommitFrequency";
import { calculateReadmeScore } from "./ReadmeQuality";



export const calculateRepoHealth = (repo: any) => {
  const readmeContent = repo.object?.text || "";
  const readmeScore :any= calculateReadmeScore(readmeContent);

  const commitFrequencyScore = analyzeCommitFrequency(repo.allCommits);

  // Assuming equal weightage for both aspects
  const readmeWeight = 0.5;
  const commitFrequencyWeight = 0.5;

  const totalHealthScore = (readmeScore * readmeWeight) + (commitFrequencyScore * commitFrequencyWeight);

  return {
    readmeScore,
    commitFrequencyScore,
    totalHealthScore: (totalHealthScore * 10).toFixed(2),
  };
};
