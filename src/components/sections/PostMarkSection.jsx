import { useForm } from "react-hook-form";
import PublishMark from "../buttons/PublishMark";

function PostMarkForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (dataMark) => {
    const structuredDataMark = {
      file: dataMark.file[0], 
      category: dataMark.category,
      type: dataMark.type,
      title: dataMark.title,
      description: dataMark.description,
      location: dataMark.location,
    };
    console.log(structuredDataMark);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 items-center justify-center min-h-[70vh] bg-gray-100"
    >
      <div className="bg-white shadow-md p-8 rounded-md w-80 text-center">
        <h1 className="text-lg mb-6">Create Bookmark</h1>

        <input
          type="file"
          {...register("file")}
          className="file-input file-input-secondary mb-3"
        />

        <div className="flex gap-4 mb-3">
          <div className="flex-1">
            <select
              {...register("category", { required: true })}
              className="select validator select-secondary"
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
                A category must be selected
              </p>
            )}
          </div>

          <div className="flex-1">
            <select
              {...register("type", { required: true })}
              className="select validator select-secondary"
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
              <option>Enconomy and employment</option>
              <option>Sport</option>
              <option>Democracy memory</option>
            </select>
            {errors.type && (
              <p className="text-red-500 text-sm">A type must be selected</p>
            )}
          </div>
        </div>

        <input
          type="text"
          {...register("title")}
          placeholder="Title"
          className="input input-secondary mb-3"
        />
        <input
          type="text"
          {...register("description")}
          placeholder="Description"
          className="textarea textarea-secondary mb-3"
        />

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
            {...register("location")}
            className="grow"
            placeholder="Location"
          />
        </label>
        <PublishMark />
      </div>
    </form>
  );
}

export default PostMarkForm;
