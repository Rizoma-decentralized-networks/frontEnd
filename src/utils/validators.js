export const validateMarkData = (mark, userId) => {
  if (!mark) {
    throw new Error("Mark data is required");
  }
  
  if (!userId) {
    throw new Error("User ID is required");
  }
  
  if (isNaN(userId) || userId <= 0) {
    throw new Error("Invalid user ID");
  }
};
