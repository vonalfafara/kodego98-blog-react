import { Button, Card, Form, Modal } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import useApi from "../utilities/http";
import useLocalStorage from "../hooks/useLocalStorage";

const Home = () => {
  const { getItem } = useLocalStorage();
  const token = getItem("token");
  const api = useApi(token);
  const [user, _] = useState(JSON.parse(getItem("user") || null));
  const [blogs, setBlogs] = useState([]);
  const [blog_id, setBlogId] = useState(null);
  const [sortBy, setSortBy] = useState("created_at");
  const [ascDesc, setAscDesc] = useState("desc");
  const [search, setSearch] = useState("");
  const [showDelete, setShowDelete] = useState(false);

  useEffect(() => {
    getBlogs();
    return () => {};
  }, []);

  async function getBlogs(
    sortBy = "created_at",
    ascDesc = "desc",
    search = ""
  ) {
    const { data } = await api.get(
      `/blogs?sortBy=${sortBy}&ascDesc=${ascDesc}&search=${search}`
    );
    setBlogs(data);
  }

  async function handleDelete() {
    setShowDelete(false);
    try {
      const { data } = await api.delete(`/blogs/${blog_id}`);
      toast.success(data.message);
      setBlogId(null);
      getBlogs();
    } catch (e) {
      console.log(e);
    }
  }

  async function handleFilter(e) {
    e.preventDefault();
    getBlogs(sortBy, ascDesc, search);
  }

  function handleShowDeleteModal(id) {
    setShowDelete(true);
    setBlogId(id);
  }

  function handleCloseDeleteModal() {
    setShowDelete(false);
    setBlogId(null);
  }

  return (
    <>
      <ToastContainer />
      <Modal show={showDelete} onHide={() => setShowDelete(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this blog?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            No
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Yes, Delete it
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="d-flex justify-content-end">
        <Button as={Link} to="/create-blog" className="mb-4">
          Create Blog
        </Button>
      </div>
      <Card className="mb-4">
        <Card.Body>
          <Form onSubmit={handleFilter}>
            <Form.Group className="mb-4" controlId="Sort By">
              <Form.Label>Sort By</Form.Label>
              <Form.Check
                type="radio"
                id="title"
                name="sort-by"
                label="Title"
                value="title"
                onChange={(e) => setSortBy(e.target.value)}
              />
              <Form.Check
                type="radio"
                name="sort-by"
                label="Created At"
                id="created_at"
                value="created_at"
                onChange={(e) => setSortBy(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Ascending/Descending</Form.Label>
              <Form.Check
                type="radio"
                id="asc"
                name="asc-desc"
                label="Ascending"
                value="asc"
                onChange={(e) => setAscDesc(e.target.value)}
              />
              <Form.Check
                type="radio"
                name="asc-desc"
                label="Descending"
                id="desc"
                value="desc"
                onChange={(e) => setAscDesc(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Search</Form.Label>
              <Form.Control
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button type="submit">Filter</Button>
            </div>
          </Form>
        </Card.Body>
      </Card>

      {blogs.map((blog, index) => {
        return (
          <Card key={index} className="mb-4">
            <Card.Body>
              <Card.Title>
                <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
              </Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                By{" "}
                <Link to={`/profile/${blog.user.id}`}>
                  {blog.user?.full_name}
                </Link>
              </Card.Subtitle>
              <Card.Text>{blog.subtitle}</Card.Text>
              {blog.user?.id === user?.id ? (
                <div className="d-flex justify-content-end gap-2">
                  <Button as={Link} to={`/update-blog/${blog.id}`}>
                    Update Blog
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleShowDeleteModal(blog.id)}
                  >
                    Delete Blog
                  </Button>
                </div>
              ) : null}
            </Card.Body>
          </Card>
        );
      })}
    </>
  );
};

export default Home;
