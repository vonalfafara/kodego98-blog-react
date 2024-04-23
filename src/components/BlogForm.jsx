import Form from "react-bootstrap/Form";
import { Editor } from "@tinymce/tinymce-react";
import { Button } from "react-bootstrap";
import { useState, useRef, useEffect } from "react";

const key = import.meta.env.VITE_TINYMCE_KEY;

const BlogForm = ({ updateTitle, updateSubtitle, updateBody, submitBlog }) => {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const editorRef = useRef(null);

  useEffect(() => {
    setTitle(updateTitle || "");
    setSubtitle(updateSubtitle || "");
    return () => {};
  }, [editorRef.current]);

  function handleSubmitBlog(e) {
    e.preventDefault();
    submitBlog(title, subtitle, editorRef.current.getContent());
    setTitle("");
    setSubtitle("");
    editorRef.current.resetContent();
  }

  return (
    <Form onSubmit={handleSubmitBlog}>
      <Form.Group className="mb-3" controlId="title">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter Title"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="subtitle">
        <Form.Label>Subtitle</Form.Label>
        <Form.Control
          type="text"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          placeholder="Enter Subtitle"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="body">
        <Editor
          apiKey={key}
          onInit={(_evt, editor) => (editorRef.current = editor)}
          init={{
            plugins:
              "anchor autolink charmap codesample link lists searchreplace table visualblocks wordcount checklist casechange formatpainter linkchecker powerpaste advtable advcode advtemplate tableofcontents footnotes autocorrect",
            toolbar:
              "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link table | align lineheight | checklist numlist bullist indent outdent",
            tinycomments_mode: "embedded",
            tinycomments_author: "Author name",
            mergetags_list: [
              { value: "First.Name", title: "First Name" },
              { value: "Email", title: "Email" },
            ],
          }}
          initialValue={updateBody}
        />
      </Form.Group>
      <div className="d-flex justify-content-end">
        <Button type="submit">Submit Blog</Button>
      </div>
    </Form>
  );
};

export default BlogForm;
