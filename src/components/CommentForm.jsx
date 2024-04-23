import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";

const CommentForm = ({ commentToUpdate, submitComment }) => {
  const [comment, setComment] = useState("");

  useEffect(() => {
    setComment(commentToUpdate);
    return () => {};
  }, []);

  function handleSubmitComment(e) {
    e.preventDefault();
    submitComment(comment);
  }

  return (
    <Form onSubmit={handleSubmitComment} className="mb-4">
      <Form.Group className="mb-4">
        <Form.Control
          as="textarea"
          row={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </Form.Group>
      <div className="d-flex justify-content-end">
        <Button type="submit">Submit</Button>
      </div>
    </Form>
  );
};

export default CommentForm;
