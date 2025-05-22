import { useEffect, useState } from "react";
import { useWatch } from "react-hook-form";
import PublishMark from "../buttons/PublishMark";
import CancelButton from "../buttons/CancelButton";
import SelectField from "./SelectField";
import { getAllCategories } from "../../services/apiCategory";
import { getAllTags } from "../../services/apiTags";

const PostMarkForm = ({
  register,
  handleSubmit,
  formState: { errors },
  control,
  reset,
  onSubmit,
  isLoading,
  isSubmitted,
  error,
  tags: initialTags = [],
  categories: initialCategories = []
}) => {
  const [categories, setCategories] = useState(initialCategories);
  const [tags, setTags] = useState(initialTags);
  const [isLoadingData, setIsLoadingData] = useState(false);

  const titleValue = useWatch({
    control,
    name: "title",
    defaultValue: ""
  });
  
  const descriptionValue = useWatch({
    control,
    name: "description",
    defaultValue: ""
  });
  
  const locationValue = useWatch({
    control,
    name: "location",
    defaultValue: ""
  });

  useEffect(() => {
    const loadData = async () => {
      setIsLoadingData(true);
      try {
        const categoriesData = await getAllCategories();
        const tagsData = await getAllTags();
        
        setCategories(categoriesData);
        setTags(tagsData);
      } catch (error) {
        console.error("Error loading categories and tags:", error);
      } finally {
        setIsLoadingData(false);
      }
    };

    if (initialCategories.length === 0 || initialTags.length === 0) {
      loadData();
    }
  }, [initialCategories.length, initialTags.length]);
  
  const categoryOptions = [
    { value: "", label: "Select Category", disabled: true },
    ...categories.map(cat => ({
      value: cat.categoryId?.toString() || "",
      label: cat.category || "Unknown"
    }))
  ];

  const tagOptions = [
    { value: "", label: "Select Tag", disabled: true },
    ...tags.map(tag => ({
      value: tag.tagId?.toString() || "",
      label: tag.tag || "Unknown"
    }))
  ];
  
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Create Bookmark</h1>
          <p className="py-6">
            Share your discoveries and initiatives with the community!
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-md shrink-0 shadow-2xl">
          <div className="card-body">
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

            {isLoading && <div>Loading...</div>}

            <form onSubmit={handleSubmit(onSubmit)}>
              <fieldset className="fieldset">
                <label className="label">Image</label>
          
                <input
                  type="file"
                  accept="image/*"
                  {...register("file", {
                    required: "An image file is required",
                  })}
                  className={`file-input w-full ${errors?.file ? 'file-input-error' : 'file-input-secondary'}`}
                />
                {errors?.file && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.file.message}
                  </p>
                )}

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="label">Category</label>
                    <select
                      {...register("category", { required: "Category is required" })}
                      className={`select w-full ${errors?.category ? 'select-error' : 'select-secondary'}`}
                      defaultValue=""
                    >
                      {categoryOptions.map((option, index) => (
                        <option
                          key={index}
                          value={option.value}
                          disabled={option.disabled}
                        >
                          {option.label}
                        </option>
                      ))}
                    </select>
                    {errors?.category && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.category.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="label">Tag</label>
                    <select
                      {...register("tag", { required: "Tag is required" })}
                      className={`select w-full ${errors?.tag ? 'select-error' : 'select-secondary'}`}
                      defaultValue=""
                    >
                      {tagOptions.map((option, index) => (
                        <option
                          key={index}
                          value={option.value}
                          disabled={option.disabled}
                        >
                          {option.label}
                        </option>
                      ))}
                    </select>
                    {errors?.tag && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.tag.message}
                      </p>
                    )}
                  </div>
                </div>

                <label className="label mt-2">
                  Title
                </label>
                <input
                  type="text"
                  {...register("title", {
                    required: "Title is required",
                    minLength: { value: 3, message: "Title must be at least 3 characters" },
                    maxLength: { value: 100, message: "Title cannot exceed 100 characters" },
                    pattern: {
                      value: /^[\p{L}\p{N}\s]+$/u,
                      message: "Special characters are not allowed in title"
                    }
                  })}
                  placeholder="Enter title"
                  className={`input w-full ${errors?.title ? 'input-error' : 'input-secondary'}`}
                />
                <div className="flex justify-between items-center mt-1">
                  {errors?.title && (
                    <p className="text-red-500 text-sm">
                      {errors.title.message}
                    </p>
                  )}
                  <div className={`text-xs ${
                    titleValue.length > 100 ? 'text-red-500' : 
                    titleValue.length > 80 ? 'text-amber-500' : 
                    'text-gray-500'
                  }`}>
                    {titleValue.length}/100
                  </div>
                </div>

                <label className="label mt-2">
                  Description
               
                </label>
                <textarea
                  {...register("description", {
                    required: "Description is required",
                    minLength: { value: 10, message: "Description must be at least 10 characters" },
                    maxLength: { value: 2000, message: "Description cannot exceed 2000 characters" },
                    pattern: {
                      value: /^[^\/\*<>|]+$/,
                      message: "Special characters like /, *, <, >, | are not allowed in description"
                    }
                  })}
                  placeholder="Enter description"
                  className={`textarea w-full ${errors?.description ? 'textarea-error' : 'textarea-secondary'}`}
                  rows="3"
                ></textarea>
                <div className="flex justify-between items-center mt-1">
                  {errors?.description && (
                    <p className="text-red-500 text-sm">
                      {errors.description.message}
                    </p>
                  )}
                  <div className={`text-xs ${
                    descriptionValue.length > 2000 ? 'text-red-500' : 
                    descriptionValue.length > 1600 ? 'text-amber-500' : 
                    'text-gray-500'
                  }`}>
                    {descriptionValue.length}/2000
                  </div>
                </div>

                <label className="label mt-2">
                  Location
                </label>
                <label className={`input flex items-center gap-2 w-full ${errors?.location ? 'input-error' : 'input-secondary'}`}>
                  <svg
                    className="h-5 w-5 opacity-50"
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
                      pattern: {
                        value: /^[^\/\*<>|]+$/,
                        message: "Special characters like /, *, <, >, | are not allowed in location"
                      }
                    })}
                    className="grow"
                    placeholder="Search location"
                  />
                </label>
                <div className="flex justify-between items-center mt-1">
                  {errors?.location && (
                    <p className="text-red-500 text-sm">
                      {errors.location.message}
                    </p>
                  )}
                  <div className={`text-xs ${
                    locationValue.length > 100 ? 'text-red-500' : 
                    locationValue.length > 80 ? 'text-amber-500' : 
                    'text-gray-500'
                  }`}>
                    {locationValue.length}/100
                  </div>
                </div>

                <div className="flex gap-4 justify-center mt-6">
                  <PublishMark isLoading={isLoading} />
                  <CancelButton onCancel={reset} />
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostMarkForm;
