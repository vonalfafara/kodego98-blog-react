import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Card } from "react-bootstrap";
import { useState } from "react";
import useApi from "../utilities/http";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import useLocalStorage from "../hooks/useLocalStorage";

function Register() {
  const { setItem } = useLocalStorage();
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email_address, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const api = useApi();
  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();
    try {
      const body = {
        first_name,
        last_name,
        email_address,
        password,
        password_confirmation,
      };
      const { data } = await api.post("/register", body);
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
            <h3 className="text-center">Register</h3>
          </Card.Title>
          <Form onSubmit={handleRegister}>
            <Form.Group
              className="mb-3"
              value={first_name}
              onChange={(e) => setFirstName(e.target.value)}
            >
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" placeholder="First Name" />
            </Form.Group>
            <Form.Group
              className="mb-3"
              value={last_name}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
            >
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" placeholder="Last Name" />
            </Form.Group>
            <Form.Group
              className="mb-3"
              value={email_address}
              onChange={(e) => setEmailAddress(e.target.value)}
            >
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group
              className="mb-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            >
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group
              className="mb-3"
              value={password_confirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            >
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Confirm Password" />
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

export default Register;
