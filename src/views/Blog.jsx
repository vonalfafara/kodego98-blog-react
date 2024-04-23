import { Button, Container, Form, Card, Modal } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import dog from "../assets/dog.jpg";
import useApi from "../utilities/http";
import { useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import CommentForm from "../components/CommentForm";

const storage = import.meta.env.VITE_IMAGES;

const Blog = () => {
  const { getItem } = useLocalStorage();
  const token = getItem("token");
  const user = JSON.parse(getItem("user"));
  const api = useApi(token);
  const { blog_id } = useParams();
  const [blog, setBlog] = useState(null);
  const [comment, setComment] = useState("");
  const [comment_id, setCommentId] = useState(null);
  const [commentIdToReplyTo, setCommentIdToReplyTo] = useState(null);
  const [showUpdateCommentModal, setShowUpdateCommentModal] = useState(false);

  useEffect(() => {
    getBlog();
    return () => {};
  }, []);

  async function getBlog() {
    const { data } = await api.get(`/blogs/blog/${blog_id}`);
    setBlog(data);
  }

  async function handleSubmitComment(newComment) {
    try {
      const body = {
        body: newComment,
        comment_id: commentIdToReplyTo,
      };

      const { data } = await api.post(`/blogs/${blog.id}/comment`, body);
      toast.success(data.message);
      setComment("");
      setCommentIdToReplyTo(null);
      getBlog();
    } catch (e) {
      console.log(e);
    }
  }

  async function handleUpdateComment(newComment) {
    try {
      const body = {
        body: newComment,
        comment_id: null,
      };

      const { data } = await api.put(
        `/blogs/${blog.id}/comment/${comment_id}`,
        body
      );
      toast.success(data.message);
      setComment("");
      setCommentId(null);
      setShowUpdateCommentModal(false);
      getBlog();
    } catch (e) {
      console.log(e);
    }
  }

  function handleShowUpdateModal(comment) {
    setComment(comment.body);
    setCommentId(comment.id);
    setShowUpdateCommentModal(true);
  }

  function handleSetReply(comment) {
    setCommentIdToReplyTo(comment.id);
  }

  function displayComment(comment, index) {
    return (
      <div key={index}>
        <div className="d-flex gap-2 align-items-center">
          <img
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "100%",
              objectFit: "cover",
            }}
            src={
              comment.user.profile_picture
                ? `${storage}/${comment.user.profile_picture}`
                : dog
            }
            alt=""
          />
          <b>{comment.user.first_name + " " + comment.user.last_name}</b>
        </div>
        <div className="d-flex gap-2 align-items-center">
          <div
            style={{
              width: "50px",
            }}
          ></div>
          <div style={{ flex: 1 }}>
            <p>{comment.body}</p>
            {token ? (
              <div className="d-flex justify-content-end gap-2 mb-4">
                {user?.id === comment.user.id ? (
                  <Button onClick={() => handleShowUpdateModal(comment)}>
                    Update Comment
                  </Button>
                ) : null}
                <Button
                  variant="outline-primary"
                  onClick={() => handleSetReply(comment)}
                >
                  Reply
                </Button>
              </div>
            ) : null}
            {commentIdToReplyTo === comment.id ? (
              <CommentForm submitComment={handleSubmitComment} />
            ) : null}
            {comment.replies?.length ? (
              <>
                <p>Replies:</p>
                {comment.replies.map((reply, index) => {
                  return displayComment(reply, index);
                })}
              </>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      {blog ? (
        <>
          <ToastContainer />
          <Modal
            show={showUpdateCommentModal}
            onHide={() => setShowUpdateCommentModal(false)}
          >
            <Modal.Header closeButton>
              <Modal.Title>Update comment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <CommentForm
                commentToUpdate={comment}
                submitComment={handleUpdateComment}
              />
            </Modal.Body>
          </Modal>
          <Container
            className="mx-auto mb-5"
            style={{ maxWidth: "700px", width: "100%" }}
          >
            <h3 className="text-center">{blog.title}</h3>
            <h6 className="text-center">
              By{" "}
              <Link to={`/profile/${blog.user?.id}`}>
                {blog.user?.first_name + " " + blog.user?.last_name}
              </Link>
            </h6>
            <p className="my-4" style={{ fontSize: ".8rem" }}>
              <i>{blog.subtitle}</i>
            </p>
            <div dangerouslySetInnerHTML={{ __html: blog.body }}></div>
          </Container>
          <Container
            style={{ maxWidth: "600px", width: "100%", marginLeft: "0" }}
          >
            <h6>Comments</h6>
            {token ? <CommentForm submitComment={handleSubmitComment} /> : null}
            {blog?.comments?.length
              ? blog.comments.map((comment, index) => {
                  return (
                    <Card key={index} className="mb-4">
                      <Card.Body>{displayComment(comment)}</Card.Body>
                    </Card>
                  );
                })
              : null}
          </Container>
        </>
      ) : (
        <p>Fetching blog...</p>
      )}
    </>
  );
};

export default Blog;
