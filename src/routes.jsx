import Home from "./views/Home";
import Login from "./views/Login";
import Register from "./views/Register";
import Profile from "./views/Profile";
import Blog from "./views/Blog";
import CreateBlog from "./views/CreateBlog";
import UpdateBlog from "./views/UpdateBlog";

const routes = [
  {
    name: "Home",
    path: "/",
    element: <Home />,
  },
  {
    name: "Login",
    path: "/login",
    element: <Login />,
  },
  {
    name: "Register",
    path: "/register",
    element: <Register />,
  },
  {
    name: "Profile",
    path: "/profile/:user_id",
    element: <Profile />,
  },
  {
    name: "Blog",
    path: "/blog/:blog_id",
    element: <Blog />,
  },
  {
    name: "CreateBlog",
    path: "/create-blog",
    element: <CreateBlog />,
  },
  {
    name: "UpdateBlog",
    path: "/update-blog/:blog_id",
    element: <UpdateBlog />,
  },
];

export default routes;
