import { useState, useContext } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import UserContext from "../UserContext";
import { Navigate } from "react-router-dom";
import { Eye, EyeSlash } from "react-bootstrap-icons";

export default function Register() {
  const { user } = useContext(UserContext);

  let [firstName, setFirstName] = useState("");
  let [middleName, setMiddleName] = useState("");
  let [lastName, setLastName] = useState("");
  let [email, setEmail] = useState("");
  let [contactNumber, setContactNumber] = useState("");
  let [password, setPassword] = useState("");
  let [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  function register(e) {
    e.preventDefault();

    fetch("http://localhost:4000/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: firstName,
        middleName: middleName,
        lastName: lastName,
        email: email,
        contactNumber: contactNumber,
        password: password,
      }),
    })
      .then((result) => result.json())
      .then((result) => {
        if (result.code === "REGISTRATION-SUCCESS") {
          Swal.fire({
            title: "SUCCESS!",
            text: result.message,
            icon: "success",
          });
          setFirstName("");
          setMiddleName("");
          setLastName("");
          setEmail("");
          setContactNumber("");
          setPassword("");
        } else {
          Swal.fire({
            title: "SOMETHING WENT WRONG!",
            text: "Please try again",
            icon: "error",
          });
        }
      });
  }

  return user.id !== null ? (
    <Navigate to="/" />
  ) : (
    <Container fluid className="vh-100">
      <Row>
        <Col className="vh-100 bg-warning col-6 d-flex flex-column align-items-center justify-content-center">
          <h1 className="display-5 fw-bold">REGISTER NOW!</h1>
          <p className="display-6">Your Bright Future Begins Here!</p>
        </Col>

        <Col className="vh-100 col-6">
          <Container fluid className="p-5 d-flex flex-column align-items-center justify-content-center">
            <h1 className="display-5 fw-bold mb-5">REGISTER</h1>

            <Form
              className="w-100 p-5 shadow rounded-3 border-bottom border-3 border-warning"
              onSubmit={(e) => register(e)}
            >
              <Form.Group className="mb-3" controlId="firstName">
                <Form.Control
                  type="text"
                  className="txt"
                  placeholder="Enter your first name"
                  required
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstName}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="middleName">
                <Form.Control
                  type="text"
                  className="txt"
                  placeholder="Enter your middle name"
                  required
                  onChange={(e) => setMiddleName(e.target.value)}
                  value={middleName}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="lastName">
                <Form.Control
                  type="text"
                  className="txt"
                  placeholder="Enter your last name"
                  required
                  onChange={(e) => setLastName(e.target.value)}
                  value={lastName}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="email">
                <Form.Control
                  type="email"
                  className="txt"
                  placeholder="Enter your email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="contactNumber">
                <Form.Control
                  type="number"
                  className="txt"
                  placeholder="Enter your mobile number"
                  required
                  onChange={(e) => setContactNumber(e.target.value)}
                  value={contactNumber}
                />
              </Form.Group>

              <Form.Group className="mb-3 position-relative" controlId="password">
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  className="txt"
                  placeholder="Enter your password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
                {showPassword ? (
                  <EyeSlash
                    onClick={togglePasswordVisibility}
                    className="position-absolute end-0 top-50 translate-middle-y me-3 cursor-pointer"
                    size={20}
                    style={{ cursor: "pointer" }}
                  />
                ) : (
                  <Eye
                    onClick={togglePasswordVisibility}
                    className="position-absolute end-0 top-50 translate-middle-y me-3 cursor-pointer"
                    size={20}
                    style={{ cursor: "pointer" }}
                  />
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="submit">
                <Button
                  variant="warning"
                  className="w-100 rounded-pill"
                  type="submit"
                >
                  Register
                </Button>
              </Form.Group>
            </Form>
          </Container>
        </Col>
      </Row>
    </Container>
  );
}
