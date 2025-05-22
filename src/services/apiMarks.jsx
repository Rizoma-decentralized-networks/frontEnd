import axios from "axios";
import { validateMarkData } from "../utils/validators";
import { handleApiError } from "../utils/handleApiError";

const API_URL = "http://localhost:8080/api/v1/marks";

export const postMark = async (mark, userId) => {
  try {
    validateMarkData(mark, userId);
    
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
    return handleApiError(error, "posting mark");
  }

};

export const getAllMarks = async () => {
  const response = await axios.get(`${API_URL}`);
  return response.data;
};