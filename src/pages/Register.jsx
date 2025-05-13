import { useState } from "react";
import { Form, Button, Container, Card, Row, Col, Alert } from "react-bootstrap";
import { useNavigate } from "react-router";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    name: "",
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
    // Handle signup logic here
    // Don't forget to handle errors, both for yourself (dev) and for the client (via a Bootstrap Alert)
    // Redirect to Login on success
    try {
      const response = await fetch("https://offers-api.digistos.com/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }

      const data = await response.json();
      console.log("User registered successfully:", data);
      navigate("/connexion");
    } catch (error) {
      console.error("Error during signup:", error);
      setError("Une erreur s'est produite lors de l'inscription. Veuillez réessayer.");
    }
    console.log("Form submitted:", formData);
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
              <h2 className="text-center mb-4">Créer un compte</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Nom</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="formPassword">
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
                  S'inscrire
                </Button>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Register;
