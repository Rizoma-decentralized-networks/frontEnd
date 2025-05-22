export const handleApiError = (error, action = "API request") => {
  if (error.response) {
    console.error(`Error ${action}: ${error.response.status} - ${error.response.data.message || error.response.statusText}`);
    
    const errorMessages = {
      400: "Invalid data. Please check your information and try again.",
      401: "You don't have permission to perform this action.",
      403: "You don't have permission to perform this action.",
      404: "Resource not found. Please check your request.",
      500: "Server error. Please try again later."
    };
    
    const message = errorMessages[error.response.status] || "An unexpected error occurred.";
    throw new Error(message);
  } else if (error.request) {
    console.error(`Error ${action}: No response received from server`);
    throw new Error("No response from server. Please check your internet connection.");
  } else {
    console.error(`Error ${action}:`, error.message);
    throw error;
  }
};
