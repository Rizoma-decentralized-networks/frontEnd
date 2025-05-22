import { usePostMarkForm } from "../../hooks/usePostMarkForm";
import PostMarkForm from "../forms/PostMarkForm";

const PostMarkSection = () => {
  const { 
    register, 
    handleSubmit, 
    formState, 
    control,
    reset,
    onSubmit, 
    isLoading, 
    isSubmitted, 
    error 
  } = usePostMarkForm();

  const formProps = {
    register,
    handleSubmit,
    formState,
    control,
    reset,
    onSubmit,
    isLoading,
    isSubmitted,
    error
  };

  return <PostMarkForm {...formProps} />;
};

export default PostMarkSection;
