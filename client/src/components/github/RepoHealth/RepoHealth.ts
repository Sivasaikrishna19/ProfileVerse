import { analyzeCommitFrequency } from "./CommitFrequency";
import { calculateMetaDataScore } from "./MetaData";
import { calculateReadmeScore } from "./ReadmeQuality";



export const calculateRepoHealth = (repo: any) => {
  const readmeContent = repo.object?.text || "";
  const readmeScore :any= calculateReadmeScore(readmeContent);

  const commitFrequencyScore = analyzeCommitFrequency(repo.allCommits);
  
  const metaDataScore:any = calculateMetaDataScore(repo);

  // Assuming equal weightage for both aspects
  const readmeWeight = 0.3;
  const commitFrequencyWeight = 0.6;
  const metaDataWeight = 0.1;

  const totalHealthScore = (readmeScore * readmeWeight) + (commitFrequencyScore * commitFrequencyWeight)  
//   +(metaDataScore * metaDataWeight)

  return {
    readmeScore,
    commitFrequencyScore,
    totalHealthScore: parseInt((totalHealthScore * 10).toFixed(2)),
  };
};
