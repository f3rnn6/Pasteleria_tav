import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useContact } from '../context/ContactContext'; // Importamos el hook

const Contacto = () => {
  // Extraemos todo del contexto
  const { email, setEmail, mensaje, setMensaje, error, success, validateAndSend } = useContact();

  const handleSubmit = (e) => {
    e.preventDefault();
    const isSent = validateAndSend();
    if (isSent) {
      alert("¡Mensaje enviado con éxito!");
    }
  };

  return (
    <Container className="py-5 flex-grow-1">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <div className="contact-card p-4 p-md-5 shadow-sm border-0 rounded-4 bg-white">
            <h1 className="h4 fw-bold mb-4 text-center" style={{ color: '#c06c84' }}>
              Contáctanos
            </h1>

            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">Mensaje enviado correctamente.</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Correo Electrónico</Form.Label>
                <Form.Control 
                  type="email" 
                  placeholder="nombre@duocuc.cl" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Mensaje</Form.Label>
                <Form.Control 
                  as="textarea" 
                  rows={4} 
                  value={mensaje}
                  onChange={(e) => setMensaje(e.target.value)}
                  required 
                />
              </Form.Group>

              <Button type="submit" className="w-100 border-0" style={{ backgroundColor: '#c06c84' }}>
                Enviar mensaje
              </Button>
              
              <div className="text-center mt-3">
                <Link to="/" className="small text-decoration-none" style={{ color: '#c06c84' }}>
                  Volver al inicio
                </Link>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Contacto;