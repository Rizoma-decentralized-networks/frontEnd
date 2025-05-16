import axios from 'axios';

// Api URL
const API_URL = 'http://localhost:8080/api/v1/users';


export const postUser = async (user) => {
    try {
      const response = await axios.post(API_URL, user);
      return { success: true, data: response.data };
    } catch (error) {
      // Manejo detallado de errores
      let errorMessage = "An unknown error occurred";
      let statusCode = 500;
      
      if (error.response) {
        // El servidor respondió con un código de estado fuera del rango 2xx
        statusCode = error.response.status;
        
        // Manejar diferentes códigos de estado
        switch (statusCode) {
          case 400:
            errorMessage = error.response.data.message || "Invalid user data provided";
            break;
          case 401:
            errorMessage = "Authentication required";
            break;
          case 403:
            errorMessage = "You don't have permission to create this user";
            break;
          case 409:
            errorMessage = "User already exists";
            break;
          case 422:
            errorMessage = error.response.data.message || "Validation failed";
            break;
          case 500:
            errorMessage = "Server error, please try again later";
            break;
          default:
            errorMessage = `Server responded with error: ${error.response.data.message || 'Unknown error'}`;
        }
      } else if (error.request) {
        // La petición fue hecha pero no se recibió respuesta
        errorMessage = "No response from server. Please check your connection";
        statusCode = 0;
      } else {
        // Error al configurar la petición
        errorMessage = error.message || "Error setting up the request";
      }
      
      console.error("Error posting user:", {
        message: errorMessage,
        status: statusCode,
        originalError: error
      });
      
      // Devolver un objeto de error estructurado
      return {
        success: false,
        error: {
          message: errorMessage,
          status: statusCode,
          originalError: error
        }
      };
    }
};