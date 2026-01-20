import { useState } from 'react';
import { Container, Row, Col, Modal, Button } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';
import products from '../data/Products.json';

const Productos = () => {
    // 1. Estados para controlar el Modal
    const [show, setShow] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    // 2. Funciones para abrir y cerrar
    const handleClose = () => setShow(false);
    const handleShow = (product) => {
        setSelectedProduct(product);
        setShow(true);
    };

    const handleAddToCart = (product) => {
        console.log("Producto agregado:", product.name);
        // Aquí la lógica de carrito más adelante
        handleClose();
    };

    return (
        <Container className="my-5">
            <Row xs={1} sm={2} md={3} className="g-3">
                {products.map((product) => (
                    <Col key={product.id}>
                        <ProductCard
                            name={product.name}
                            price={product.price}
                            imageCard={product.imageCard}    
                            onDetails={() => handleShow(product)}
                        />
                    </Col>
                ))}
            </Row>
            
            <Modal show={show} onHide={handleClose} size="lg" centered>
                {selectedProduct && (
                    <>
                        <Modal.Header closeButton>
                            <Modal.Title>{selectedProduct.name}</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <Row>
                                <Col md={6}>
                                    <img
                                        src={selectedProduct.imageDetail}
                                        alt={selectedProduct.name}
                                        className="img-fluid rounded"
                                    />
                                </Col>

                                <Col md={6}>
                                    <h5>Descripción</h5>
                                    <p>{selectedProduct.description}</p>
                                    <h3 style={{ color: '#1e7dff' }} className="mt-4">
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
                                style={{ backgroundColor: '#c06c84', border: 'none' }} 
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