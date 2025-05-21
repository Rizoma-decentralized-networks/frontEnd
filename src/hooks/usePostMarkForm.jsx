import { useForm } from "react-hook-form";
import { useState } from "react";
import { postMark } from "../services/apiMarks";

export const usePostMarkForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const formMethods = useForm({ 
    mode: "onTouched",
    defaultValues: {
      title: "",
      description: "",
      location: "",
      category: "",
      tag: "",
      file: undefined
    }
  });
  
  const { reset, handleSubmit } = formMethods;

  const getTagId = (tagName) => ({
    "Environment": 1,
    "Feminist": 2,
    "Public Service": 3,
    "Tenement": 4,
    "Urbanism": 5,
    "Mobility": 6,
    "Culture": 7,
    "Economy and employment": 8,
    "Sport": 9,
    "Democracy memory": 10,
  }[tagName] || 1);

  const getCategoryId = (categoryName) => ({
    Proposals: 1,
    Initiatives: 2,
    Conflicts: 3,
  }[categoryName] || 1);

  const onSubmit = async (dataMark) => {
    setIsLoading(true);
    setError(null);
    try {
      const userId = 1; // En un caso real, esto vendría de un contexto de autenticación
      const markData = {
        title: dataMark.title,
        description: dataMark.description,
        location: dataMark.location,
        imageUrl: "https://picsum.photos/200/300", // En un caso real, subirías el archivo
        tag: getTagId(dataMark.tag),
        category: getCategoryId(dataMark.category),
      };
      await postMark(markData, userId);
      setIsSubmitted(true);
      reset();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { 
    ...formMethods, 
    onSubmit, 
    isLoading, 
    isSubmitted, 
    error 
  };
};
