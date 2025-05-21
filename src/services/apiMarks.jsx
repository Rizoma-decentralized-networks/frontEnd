import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/marks";

export const postMark = async (mark, userId) => {
  try {
  
    if (!mark) {
      throw new Error("Mark data is required");
    }
    
    if (!userId) {
      throw new Error("User ID is required");
    }
    
    
    if (isNaN(userId) || userId <= 0) {
      throw new Error("Invalid user ID");
    }
    
    const dataToSend = {
      title: mark.title,
      description: mark.description,
      location: mark.location,
      imageUrl: mark.imageUrl,
      category: mark.category,
      tag: mark.tag
    };
    
    console.log("Datos finales enviados al servidor:", dataToSend);
    
    const response = await axios.post(`${API_URL}/user/${userId}`, dataToSend);
    return response.data;
  } catch (error) {
  
    if (error.response) {
      console.error(`Error posting mark: ${error.response.status} - ${error.response.data.message || error.response.statusText}`);
      
      if (error.response.status === 400) {
        throw new Error("Invalid mark data. Please check your information and try again.");
      } else if (error.response.status === 401 || error.response.status === 403) {
        throw new Error("You don't have permission to create this mark.");
      } else if (error.response.status === 404) {
        throw new Error("User not found. Please check the user ID.");
      } else if (error.response.status === 500) {
        throw new Error("Server error. Please try again later.");
      }
    } else if (error.request) {
      console.error("Error posting mark: No response received from server");
      throw new Error("No response from server. Please check your internet connection.");
    } else {
      console.error("Error posting mark:", error.message);
    }
    throw error;
  }
};
