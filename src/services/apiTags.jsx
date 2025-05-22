import axios from "axios";

const API_URL = "http://localhost:8080/api/v1";

export const getAllTags = async () => {
  try {
    console.log("Fetching tags from:", `${API_URL}/tags`);
    const response = await axios.get(`${API_URL}/tags`);
    return response.data;
  } catch (error) {
    console.error("Error fetching tags:", error);
    throw error;
  }
};

export const getTagById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching tag by id:", error);
    throw error;
  }
};
