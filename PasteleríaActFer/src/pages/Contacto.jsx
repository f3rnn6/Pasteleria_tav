import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const Contacto = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("¡Mensaje enviado con éxito! Te contactaremos pronto.");
  };

  return (
    <Container className="py-5 flex-grow-1">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <div className="contact-card p-4 p-md-5 shadow-sm border-0 rounded-4 bg-white">
            <div className="text-center mb-4">
              <div className="contact-icon mx-auto mb-3" style={{ fontSize: '2rem' }}>
                ✉️
              </div>
              <h1 className="h4 fw-bold mb-1" style={{ color: '#c06c84' }}>
                Contáctanos por correo
              </h1>
              <p className="text-muted mb-0">
                Respondiendo lo antes posible. Cuéntanos tu solicitud.
              </p>
            </div>

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="correo">
                <Form.Label className="fw-semibold">Correo Electrónico</Form.Label>
                <Form.Control 
                  type="email" 
                  size="lg" 
                  placeholder="nombre@ejemplo.com" 
                  required 
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="mensaje">
                <Form.Label className="fw-semibold">Déjanos tu comentario</Form.Label>
                <Form.Control 
                  as="textarea" 
                  rows={4} 
                  placeholder="Escribe tu mensaje aquí..." 
                  required 
                />
                <Form.Text className="text-muted">
                  Evita incluir datos sensibles. Te responderemos al correo indicado.
                </Form.Text>
              </Form.Group>

              <Button 
                type="submit" 
                className="w-100 btn-lg border-0"
                style={{ backgroundColor: '#c06c84' }}
              >
                Enviar mensaje
              </Button>

              <div className="contact-card p-4 p-md-5">
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