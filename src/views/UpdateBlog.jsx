import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router-dom";
import BlogForm from "../components/BlogForm";
import { useEffect, useState } from "react";
import useApi from "../utilities/http";

const UpdateBlog = () => {
  const token = localStorage.getItem("token");
  const api = useApi(token);
  const { blog_id } = useParams();
  const [blog, setBlog] = useState({});

  useEffect(() => {
    getBlog();
    return () => {};
  }, []);

  async function getBlog() {
    const { data } = await api.get(`/blogs/blog/${blog_id}`);
    setBlog(data);
  }

  async function handleUpdateBlog(newTitle, newSubtitle, newBody) {
    try {
      const body = {
        title: newTitle,
        subtitle: newSubtitle,
        body: newBody,
      };
      const { data } = await api.put(`/blogs/${blog_id}`, body);
      toast.success(data.message);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <h3>Update Blog</h3>
      <ToastContainer />
      <BlogForm
        updateTitle={blog.title}
        updateSubtitle={blog.subtitle}
        updateBody={blog.body}
        submitBlog={handleUpdateBlog}
      />
    </>
  );
};

export default UpdateBlog;
