
export const calculateReadmeScore = (readmeContent: string) => {
  // Weightage
  const presenceWeight = 0.3;
  const lengthWeight = 0.4;
  const sectionsWeight = 0.3;

  // Constants for scoring
  const maxLengthScore = 1000; // Arbitrary max length for scoring
  const maxSectionsScore = 10; // Arbitrary max sections for scoring

  // Check presence of README
  const presenceScore = readmeContent ? 1 : 0;

  // Calculate length and detail score
  const lengthScore = Math.min(readmeContent.length / maxLengthScore, 1);

  // Calculate number of sections
  const sections = readmeContent.split('\n').filter(line => /^#+\s/.test(line)).length;
  const sectionsScore = Math.min(sections / maxSectionsScore, 1);

  // Calculate weighted score
  const totalScore = (presenceScore * presenceWeight) + (lengthScore * lengthWeight) + (sectionsScore * sectionsWeight);

  // Return score as percentage
  return (totalScore * 10).toFixed(2);
};
