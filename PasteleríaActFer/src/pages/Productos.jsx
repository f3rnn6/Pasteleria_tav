import { useState } from "react";
import { Container, Row, Col, Modal, Button, Form, InputGroup } from "react-bootstrap";
import ProductCard from "../components/ProductCard.jsx";
import { useCart } from "../context/logicform.jsx";
import { useProducts } from "../context/ProductsContext.jsx";

const Productos = () => {
  const { addToCart } = useCart();
  const { products, loading } = useProducts();

  // --- FILTROS ---
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("default");
  const [categoryFilter, setCategoryFilter] = useState("Todos");

  // --- MODAL ---
  const [show, setShow] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleClose = () => setShow(false);

  const handleShow = (product) => {
    setSelectedProduct(product);
    setShow(true);
  };

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    handleClose();
  };

  if (loading) {
    return (
      <Container className="my-5 text-center">
        <p className="text-muted">Cargando productos...</p>
      </Container>
    );
  }

  const safeProducts = Array.isArray(products) ? products : [];

  const categories = ["Todos", ...new Set(safeProducts.map((p) => p.category).filter(Boolean))];

  const filteredProducts = safeProducts
    .filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === "Todos" || product.category === categoryFilter;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortOrder === "priceDesc") return b.price - a.price;
      if (sortOrder === "priceAsc") return a.price - b.price;
      return 0;
    });

  return (
    <Container className="my-5">
      {/* --- FILTROS --- */}
      <Row className="mb-4 g-3">
        <Col xs={12} md={4}>
          <InputGroup>
            <InputGroup.Text className="bg-white border-end-0">
              <i className="bi bi-search"></i>
            </InputGroup.Text>
            <Form.Control
              placeholder="Buscar por nombre..."
              className="border-start-0 ps-0"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </Col>

        <Col xs={12} md={4}>
          <Form.Select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="default">Ordenar por...</option>
            <option value="priceAsc">Precio: Menor a Mayor</option>
            <option value="priceDesc">Precio: Mayor a Menor</option>
          </Form.Select>
        </Col>

        <Col xs={12} md={4}>
          <Form.Select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>

      {/* --- GRILLA --- */}
      <Row xs={1} sm={2} md={3} className="g-3">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Col key={product.id}>
              <ProductCard
                name={product.name}
                price={product.price}
                description={product.description}
                imageCard={product.imageCard}
                onDetails={() => handleShow(product)}
              />
            </Col>
          ))
        ) : (
          <Col xs={12} className="text-center py-5">
            <p className="text-muted fs-5">No se encontraron productos con esos filtros.</p>
          </Col>
        )}
      </Row>

      {/* --- MODAL --- */}
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

                  <div className="d-flex align-items-center justify-content-between mt-3">
                    <div className="fw-semibold">
                      Stock: <span className="text-muted">{Number(selectedProduct.stock ?? 0)}</span>
                    </div>
                    <h3 style={{ color: "#1e7dff" }} className="mb-0">
                      ${selectedProduct.price}
                    </h3>
                  </div>
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
                disabled={Number(selectedProduct.stock ?? 0) <= 0}
              >
                {Number(selectedProduct.stock ?? 0) <= 0 ? "Sin stock" : "Agregar al Carrito"}
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </Container>
  );
};

export default Productos;
