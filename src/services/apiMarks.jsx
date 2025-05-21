import axios from "axios";
// Api URL
const API_URL = "http://localhost:8080/api/v1/marks";

export const postMark = async (mark, userId) => {
  try {
    const response = await axios.post(`${API_URL}/user/${userId}`, mark);
    return response.data;
  } catch (error) {
    console.error("Error posting mark:", error);
    throw error;
  }
};
