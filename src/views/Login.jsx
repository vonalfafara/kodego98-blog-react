import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Card } from "react-bootstrap";
import { useState } from "react";
import useApi from "../utilities/http";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import useLocalStorage from "../hooks/useLocalStorage";

function Login() {
  const { setItem } = useLocalStorage();
  const [email_address, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const api = useApi();
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const body = {
        email_address,
        password,
      };
      const { data } = await api.post("/login", body);
      setItem("token", data.token);
      setItem("user", JSON.stringify(data.user));
      navigate("/");
      navigate(0);
    } catch (e) {
      toast.error(e.response.data.message);
    }
  }

  return (
    <>
      <Card className="mx-auto" style={{ maxWidth: "600px", width: "100%" }}>
        <Card.Body>
          <Card.Title>
            <h3 className="text-center">Login</h3>
          </Card.Title>
          <Form onSubmit={handleLogin}>
            <Form.Group
              className="mb-3"
              value={email_address}
              onChange={(e) => setEmailAddress(e.target.value)}
              controlId="formBasicEmail"
            >
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group
              className="mb-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              controlId="formBasicPassword"
            >
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <ToastContainer />
    </>
  );
}

export default Login;
