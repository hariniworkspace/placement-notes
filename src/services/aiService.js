export const getSimilarProblems = async (title) => {
  // Temporary mock AI (replace later with OpenAI / Gemini)
  const database = {
    "two sum": [
      { name: "3Sum", url: "https://leetcode.com/problems/3sum/" },
      { name: "Two Sum II - Sorted Array", url: "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/" },
      { name: "Subarray Sum Equals K", url: "https://leetcode.com/problems/subarray-sum-equals-k/" },
    ],
    "binary search": [
      { name: "Search in Rotated Sorted Array", url: "https://leetcode.com/problems/search-in-rotated-sorted-array/" },
      { name: "Find First and Last Position", url: "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/" },
    ],
  };

  const key = title.toLowerCase();
  return database[key] || [];
};
