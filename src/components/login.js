import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const Login = ({ logIn }) => {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const navigate = useNavigate();

  const onChangeName = (e) => {
    const name1 = e.target.value;
    setName(name1);
  };

  const onChangeId = (e) => {
    const id1 = e.target.value;
    setId(id1);
  };

  const login = () => {
    logIn(name, id);
    navigate("/");
  };

  return (
    <div>
      <Form className="login-form">
        <Form.Group controlId="formBasicEmail">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            onChange={onChangeName}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>User ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter ID"
            onChange={onChangeId}
          />
        </Form.Group>
        <Button variant="primary" type="button" onClick={login}>
          Login
        </Button>
      </Form>
    </div>
  );
};

export default Login;
