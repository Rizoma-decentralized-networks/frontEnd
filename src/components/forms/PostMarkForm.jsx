import PublishMark from "../buttons/PublishMark";
import CancelButton from "../buttons/CancelButton";
import SelectField from "./SelectField";

const PostMarkForm = ({
  register,
  handleSubmit,
  errors,
  reset,
  onSubmit,
  isLoading,
  isSubmitted,
  error
}) => {
  const categoryOptions = [
    { value: "", label: "Select Category", disabled: true },
    { value: "Proposals", label: "Proposals" },
    { value: "Initiatives", label: "Initiatives" },
    { value: "Conflicts", label: "Conflicts" }
  ];

  const tagOptions = [
    { value: "", label: "Select Tag", disabled: true },
    { value: "Environment", label: "Environment" },
    { value: "Feminist", label: "Feminist" },
    { value: "Public Service", label: "Public Service" },
    { value: "Tenement", label: "Tenement" },
    { value: "Urbanism", label: "Urbanism" },
    { value: "Mobility", label: "Mobility" },
    { value: "Culture", label: "Culture" },
    { value: "Economy and employment", label: "Economy and employment" },
    { value: "Sport", label: "Sport" },
    { value: "Democracy memory", label: "Democracy memory" }
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

            <form onSubmit={handleSubmit(onSubmit)}>
              <fieldset className="fieldset">
                <label className="label">Image</label>
                <input
                  type="file"
                  accept="image/*"
                  {...register("file", {
                    required: "An image file is required",
                  })}
                  className="file-input file-input-secondary w-full"
                />
                {errors?.file && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.file.message}
                  </p>
                )}

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <SelectField
                    label="Category"
                    name="category"
                    options={categoryOptions}
                    register={register}
                    error={errors?.category}
                    required={true}
                    defaultValue=""
                  />

                  <SelectField
                    label="Tag"
                    name="tag"
                    options={tagOptions}
                    register={register}
                    error={errors?.tag}
                    required={true}
                    defaultValue=""
                  />
                </div>

                <label className="label mt-2">Title</label>
                <input
                  type="text"
                  {...register("title", {
                    required: "Title is required",
                    maxLength: { value: 100, message: "Title is too long" },
                  })}
                  placeholder="Enter title"
                  className="input input-secondary w-full"
                />
                {errors?.title && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.title.message}
                  </p>
                )}

                <label className="label mt-2">Description</label>
                <textarea
                  {...register("description", {
                    required: "Description is required",
                    maxLength: {
                      value: 500,
                      message: "Description is too long. Max 500 characters.",
                    },
                  })}
                  placeholder="Enter description"
                  className="textarea textarea-secondary w-full"
                  rows="3"
                ></textarea>
                {errors?.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.description.message}
                  </p>
                )}

                <label className="label mt-2">Location</label>
                <label className="input input-secondary flex items-center gap-2 w-full">
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
                      maxLength: {
                        value: 100,
                        message: "Location is too long",
                      },
                    })}
                    className="grow"
                    placeholder="Search location"
                  />
                </label>
                {errors?.location && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.location.message}
                  </p>
                )}

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
