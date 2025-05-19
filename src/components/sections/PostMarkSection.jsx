import { useForm } from "react-hook-form";
import PublishMark from "../buttons/PublishMark";
import CancelButton from "../buttons/CancelButton";
import { useState } from "react";
import { postMark } from "../../services/apiMarks";

function PostMarkForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (dataMark) => {
    setIsLoading(true);
    setError(null);
    
    try {
    
      const userId = 1;
      
      
      const markData = {
        title: dataMark.title,
        description: dataMark.description,
        location: dataMark.location,
       
        imageUrl: "https://picsum.photos/200/300", 
        tag: {
          tagId: getTagId(dataMark.tag),
          tag: dataMark.tag.toLowerCase()
        },
        category: {
          categoryId: getCategoryId(dataMark.category),
          category: dataMark.category.toLowerCase()
        }
      };
      
      console.log('Enviando datos:', markData, 'userId:', userId);
    
      const result = await postMark(markData, userId);
      console.log('Marcador creado:', result);
      
      setIsSubmitted(true);
      reset();
    } catch (err) {
      console.error('Error completo:', err);
      
      if (err.response && err.response.data) {
        console.error('Detalles del error del servidor:', err.response.data);
        setError(`Error del servidor: ${JSON.stringify(err.response.data)}`);
      } else {
        setError(err.message || 'Ocurrió un error al crear el marcador');
      }
    } finally {
      setIsLoading(false);
    }
  };

  
  const getTagId = (tagName) => {
    const tagMap = {
      'Environment': 1,
      'Feminist': 2,
      'Public Service': 3,
      'Tenement': 4,
      'Urbanism': 5,
      'Mobility': 6,
      'Culture': 7,
      'Economy and employment': 8,
      'Sport': 9,
      'Democracy memory': 10
    };
    return tagMap[tagName] || 1; 
  };
  
  const getCategoryId = (categoryName) => {
    const categoryMap = {
      'Proposals': 1,
      'Initiatives': 2,
      'Conflicts': 3
    };
    return categoryMap[categoryName] || 1;
  };

  return (
    <div>
      {isSubmitted && (
        <div role="alert" className="alert alert-success alert-soft">
          <span>Your mark has been created!</span>
        </div>
      )}

      {error && (
        <div role="alert" className="alert alert-error alert-soft">
          <span>{error}</span>
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 items-center justify-center min-h-[70vh] bg-gray-100"
      >
        <div className="bg-white shadow-md p-8 rounded-md w-80 text-center">
          <h1 className="text-lg mb-6">Create Bookmark</h1>

          <input
            type="file"
            accept="image/*"
            {...register("file", { required: "An image file is required" })}
            className="file-input file-input-secondary mb-3"
          />
          {errors.file && (
            <p className="text-red-500 text-sm">{errors.file.message}</p>
          )}

          <div className="flex gap-4 mb-3">
            <div className="flex-1">
              <select
                {...register("category", {
                  required: "A category must be selected",
                })}
                className="select select-secondary"
                defaultValue=""
              >
                <option disabled value="">
                  Category
                </option>
                <option>Proposals</option>
                <option>Initiatives</option>
                <option>Conflicts</option>
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm">
                  {errors.category.message}
                </p>
              )}
            </div>

            <div className="flex-1">
              <select
                {...register("tag", { required: "A tag must be selected" })}
                className="select select-secondary"
                defaultValue=""
              >
                <option disabled value="">
                  Tag
                </option>
                <option>Environment</option>
                <option>Feminist</option>
                <option>Public Service</option>
                <option>Tenement</option>
                <option>Urbanism</option>
                <option>Mobility</option>
                <option>Culture</option>
                <option>Economy and employment</option>
                <option>Sport</option>
                <option>Democracy memory</option>
              </select>
              {errors.tag && (
                <p className="text-red-500 text-sm">{errors.tag.message}</p>
              )}
            </div>
          </div>

          <input
            type="text"
            {...register("title", {
              required: "Title is required",
              maxLength: { value: 100, message: "Title is too long" },
            })}
            placeholder="Title"
            className="input input-secondary mb-3"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}

          <input
            type="text"
            {...register("description", {
              required: "Description is required",
              maxLength: { value: 500, message: "Description is too long. Max 500 characters." },
            })}
            placeholder="Description"
            className="textarea textarea-secondary mb-3"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}

          <label className="input flex items-center gap-2 mb-4 input-secondary">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              type="search"
              {...register("location", {
                required: "Location is required",
                maxLength: { value: 100, message: "Location is too long" },
              })}
              className="grow"
              placeholder="Location"
            />
          </label>
          {errors.location && (
            <p className="text-red-500 text-sm">{errors.location.message}</p>
          )}

          <div className="flex gap-4 justify-center">
            <PublishMark isLoading={isLoading} />
            <CancelButton onCancel={reset} />
          </div>
        </div>
      </form>
    </div>
  );
}

export default PostMarkForm;
