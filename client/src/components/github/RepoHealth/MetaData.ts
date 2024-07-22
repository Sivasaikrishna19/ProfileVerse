// MetaData.ts

export const calculateMetaDataScore = (repo: any) => {
    // Weightage
    const descriptionWeight = 1;
  
    // Check presence of description
    const hasDescription = repo.description ? 1 : 0;
  
    // Penalize if description is not present
    const descriptionScore = hasDescription ? 1 : 0;
  
    // Calculate weighted score
    const totalScore = descriptionScore * descriptionWeight;
  
    // Return score as percentage
    return (totalScore * 10).toFixed(2);
  };
  