import { useState } from "react";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import ProductCard from "../components/ProductCard.jsx";
import products from "../data/Products.json";
import { useCart } from "../context/logicform.jsx";

const Productos = () => {
  // Función para agregar al carrito (viene del context)
  const { addToCart } = useCart();

  // Control del modal
  const [show, setShow] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleClose = () => setShow(false);

  // Abre el modal y guarda el producto seleccionado
  const handleShow = (product) => {
    setSelectedProduct(product);
    setShow(true);
  };

  // Agrega el producto al carrito
  const handleAddToCart = (product) => {
    addToCart(product, 1);
    //alert("Agregado al carrito: " + product.name); // solo prueba
    handleClose();
  };

  return (
    <Container className="my-5">
      {/* Grilla de productos */}
      <Row xs={1} sm={2} md={3} className="g-3">
        {products.map((product) => (
          <Col key={product.id}>
            <ProductCard
              name={product.name}
              price={product.price}
              description={product.description}
              imageCard={product.imageCard}
              // abre modal con el producto
              onDetails={() => handleShow(product)}
            />
          </Col>
        ))}
      </Row>

      {/* Modal de detalle */}
      <Modal show={show} onHide={handleClose} size="lg" centered>
        {selectedProduct && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>{selectedProduct.name}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <Row className="g-3">
                <Col md={6}>
                  <img
                    src={selectedProduct.imageDetail}
                    alt={selectedProduct.name}
                    className="img-fluid rounded"
                  />
                </Col>

                <Col md={6}>
                  <h5>Descripción</h5>
                  <p className="text-muted">{selectedProduct.description}</p>

                  <h3 style={{ color: "#1e7dff" }} className="mt-4">
                    ${selectedProduct.price}
                  </h3>
                </Col>
              </Row>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Volver
              </Button>

              <Button
                style={{ backgroundColor: "#c06c84", border: "none" }}
                onClick={() => handleAddToCart(selectedProduct)}
              >
                Agregar al Carrito
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </Container>
  );
};

export default Productos;
