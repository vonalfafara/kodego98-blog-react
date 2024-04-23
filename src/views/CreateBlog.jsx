import { ToastContainer, toast } from "react-toastify";
import BlogForm from "../components/BlogForm";
import useApi from "../utilities/http";

const CreateBlog = () => {
  const token = localStorage.getItem("token");
  const api = useApi(token);

  async function handleCreateBlog(newTitle, newSubtitle, newBody) {
    try {
      const body = {
        title: newTitle,
        subtitle: newSubtitle,
        body: newBody,
      };
      const { data } = await api.post("/blogs", body);
      toast.success(data.message);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <h3>Create Blog</h3>
      <ToastContainer />
      <BlogForm
        updateTitle=""
        updateSubtitle=""
        updateBody=""
        submitBlog={handleCreateBlog}
      />
    </>
  );
};

export default CreateBlog;
