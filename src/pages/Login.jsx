import { useState } from "react";
import { Form, Button, Container, Card, Row, Col, Alert } from "react-bootstrap";
import { useNavigate } from "react-router";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const [error, setError] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle login logic here
    // Don't forget to handle errors, both for yourself (dev) and for the client (via a Bootstrap Alert):
    //   - Show an error if credentials are invalid
    //   - Show a generic error for all other cases
    // On success, redirect to the Pro Offers page

    try {
      const response = await fetch("https://offers-api.digistos.com/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        const data = await response.json();
        if(response.status === 401) {
          setError("Identifiants invalides. Veuillez réessayer.");
          throw new Error("Invalid credentials");
        } else {
          setError("Une erreur s'est produite. Veuillez réessayer.");
          throw new Error(data.message);
        }
        
      }

      const data = await response.json();
      console.log("User logged in successfully:", data);
      navigate("/pro-offers");
    } catch (error) {
      console.error("Error during login:", error);
    }
    console.log("Login submitted:", formData);
  };

  return (
    <> 
      {error && (
        <Alert variant="danger" className="w-100">
          <Alert.Heading>Erreur</Alert.Heading>
          <p>{error}</p>
        </Alert>
      )}
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Row className="w-100 justify-content-center">
          <Col xs={12} sm={8} md={6} lg={4}>
            <Card className="p-4 shadow-lg">
              <h2 className="text-center mb-4">Se connecter</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="loginEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="loginPassword">
                  <Form.Label>Mot de passe</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                  Se connecter
                </Button>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default LoginPage;
