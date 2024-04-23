import { Container, Row, Col, Image, Card, Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import dog from "../assets/dog.jpg";
import { useState, useEffect, useRef } from "react";
import useApi from "../utilities/http";
import { useParams, Link } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";

const storage = import.meta.env.VITE_IMAGES;

const Profile = () => {
  const fileRef = useRef(null);
  const { user_id } = useParams();
  const { getItem } = useLocalStorage();
  const token = getItem("token");
  const currentUser = JSON.parse(getItem("user")) || null;
  const api = useApi(token);
  const [user, setUser] = useState({});

  useEffect(() => {
    getUser();
    return () => {};
  }, [user_id]);

  async function getUser() {
    const { data } = await api.get(`/users/${user_id}`);
    setUser(data);
  }

  async function handleUpload(e) {
    try {
      const form = new FormData();
      form.append("image", e.target.files[0]);
      let { data } = await api.post("/upload-image", form);
      const body = {
        first_name: user.first_name,
        last_name: user.last_name,
        email_address: user.email_address,
        profile_picture: data.image_name,
      };
      data = await api.post("/profile", body);
      toast.success(data.data.message);
      getUser();
    } catch (e) {
      console.log(e);
    }
  }

  function handleOpenFileExplorer() {
    if (user.id === currentUser.id) {
      fileRef.current.click();
    }
  }

  return (
    <Container>
      <ToastContainer />
      <Row>
        <Col sm={4} className="d-flex flex-column align-items-center">
          <Image
            className="mb-4"
            style={{
              width: "200px",
              height: "200px",
              objectFit: "cover",
              cursor: "pointer",
            }}
            src={
              user?.profile_picture ? `${storage}/${user.profile_picture}` : dog
            }
            roundedCircle
            onClick={handleOpenFileExplorer}
          />
          <Form.Control
            style={{ display: "none" }}
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handleUpload}
          />
          <h3>{user.first_name + " " + user.last_name}</h3>
        </Col>
        <Col sm={8}>
          {user.blogs?.map((blog, index) => {
            return (
              <Card key={index} className="mb-4">
                <Card.Body>
                  <Card.Title>
                    <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
                  </Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    By{" "}
                    <Link to={`/profile/${blog.user.id}`}>
                      {blog.user.full_name}
                    </Link>
                  </Card.Subtitle>
                  <Card.Text>{blog.subtitle}</Card.Text>
                </Card.Body>
              </Card>
            );
          })}
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
