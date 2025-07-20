import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const token=localStorage.getItem("token");
  const handleGetStarted = () => {
    if(!token){
      navigate("/login");
    }
    else{

      navigate("/createnotes"); 
    }
  };

  return (
    <div className="bg-light min-vh-100 d-flex align-items-center">
      <Container>
        <Row className="justify-content-center text-center">
          <Col md={10} lg={8}>
            <h1 className="display-3 fw-bold text-primary">
              Welcome to Your Notes
            </h1>
            <p className="lead text-muted my-4">
              Organize your thoughts, save your ideas, and manage your daily
              tasks securely. Your Notes is a smart and simple note-taking web
              application .
            </p>
            <Button variant="success" size="lg" onClick={handleGetStarted}>

              {token ? "Create Note" : "Get Started"}
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
