import { useForm } from "react-hook-form";
import { useState, useEffect, useCallback } from "react";
import { postMark } from "../services/apiMarks";
import { getAllTags } from "../services/apiTags";
import { getAllCategories } from "../services/apiCategory";

export const usePostMarkForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);

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
  
  const { reset, handleSubmit, formState } = formMethods;

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [tagsData, categoriesData] = await Promise.all([
        getAllTags(),
        getAllCategories()
      ]);
      
           if (Array.isArray(tagsData)) {
        setTags(tagsData);
      }
      
      if (Array.isArray(categoriesData)) {
        setCategories(categoriesData);
      }
      
      setError(null);
    } catch (err) {
      console.error("Error loading data:", err);
      setError("Error loading categories and tags");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const getTagId = (tagName) => {
    const tagObj = tags.find(t => t.tag === tagName);
    return tagObj ? tagObj.tagId : null;
  };

  const getCategoryId = (categoryName) => {
    const categoryObj = categories.find(c => c.category === categoryName);
    return categoryObj ? categoryObj.categoryId : null;
  };

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
        category: parseInt(dataMark.category) || null,
        tag: parseInt(dataMark.tag) || null,
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
    error,
    tags,
    categories,
    loadData
  };
};
