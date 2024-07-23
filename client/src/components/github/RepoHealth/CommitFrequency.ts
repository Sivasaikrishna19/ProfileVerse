


const commits = [
    { date: "2023-06-15", count: 3 },
    { date: "2023-06-10", count: 1 },
    { date: "2023-05-05", count: 2 },
    { date: "2023-04-25", count: 1 },
    { date: "2023-04-20", count: 1 },
    { date: "2023-03-15", count: 2 },
    { date: "2022-12-10", count: 1 },
    { date: "2022-10-05", count: 3 },
    { date: "2022-08-15", count: 1 },
  ];
  export const analyzeCommitFrequency = (commits: any) => {
    if (commits.length === 0) return 0;

    const now = new Date();
    const firstCommitDate = new Date(commits[0].date);
    const totalMonths =
      (now.getFullYear() - firstCommitDate.getFullYear()) * 12 +
      (now.getMonth() - firstCommitDate.getMonth()) +
      1;

    // Group commits by month and count total commits
    const commitsByMonth = commits.reduce((acc: any, commit: any) => {
      const month = new Date(commit.date).toISOString().substring(0, 7);
      if (!acc[month]) acc[month] = 0;
      acc[month] += commit.count;
      return acc;
    }, {});

    // Total commits
    const totalCommits = commits.reduce(
      (sum: any, commit: any) => sum + commit.count,
      0
    );

    // Commit density (average commits per month)
    const commitDensity = totalMonths>4? totalCommits / totalMonths : 0;

    // Regularity (number of active months)
    const activeMonths = Object.keys(commitsByMonth).length;
    const regularity = activeMonths / totalMonths;

    // Gaps (months without commits)
    const gaps = totalMonths - activeMonths;

    // Recent activity
    const lastCommitDate = new Date(commits[commits.length - 1].date);
    const monthsSinceLastCommit =
      (now.getFullYear() - lastCommitDate.getFullYear()) * 12 +
      (now.getMonth() - lastCommitDate.getMonth());

    // Score calculation logic
    let score = 0;

    // Total commits contribution


    if (totalCommits >= 25) {
      score += 5;
    } else if (totalCommits>= 10) {
      score += 3;
    } else {
      score += 0;
    }

    // Commit density contribution
    if (commitDensity >= 20) {
      score += 6;
    } else if (commitDensity >= 10) {
      score += 3;
    } else if(commitDensity >=5){
      score += 1;
    } else if(commitDensity >=0.5){
      score += 0.5;
    }else {
      score +=0;
    }

    // Regularity contribution
    if (regularity >= 0.75) {
      score += 5;
    } else if (regularity >= 0.5) {
      score += 3;
    } else {
      score += 1;
    }

    // Penalize gaps
    if (gaps > totalMonths * 0.25) {
      score -= 2;
    }

    // Bonus for recent activity
    if (monthsSinceLastCommit <= 1) {
      score += 3;
    } else if (monthsSinceLastCommit <= 3) {
      score += 2;
    } else {
      score += 1;
    }

    // Ensure score is within a reasonable range
    score = Math.max(0, Math.min(score, 10));

    return score;
  };

  // Example usage
  const commitFrequencyScore = analyzeCommitFrequency(commits);



