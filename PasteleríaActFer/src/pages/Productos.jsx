import { useState } from "react";
// 1. Añadimos Form e InputGroup a los imports
import { Container, Row, Col, Modal, Button, Form, InputGroup } from "react-bootstrap";
import ProductCard from "../components/ProductCard.jsx";
import products from "../data/Products.json";
import { useCart } from "../context/logicform.jsx";

const Productos = () => {
  const { addToCart } = useCart();

  // --- ESTADOS PARA EL FILTRADO ---
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("default");
  const [categoryFilter, setCategoryFilter] = useState("Todos");

  // Control del modal
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

  // --- LÓGICA DE FILTRADO ---
  // Obtenemos las categorías únicas para el dropdown
  const categories = ["Todos","Tortas", "Galletas","Cupcakes","Tartas", ...new Set(products.map((p) => p.category))];

  // Filtramos la lista de productos antes de hacer el .map()
const filteredProducts = products
  .filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "Todos" || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  })
  .sort((a, b) => {
    if (sortOrder === "priceDesc") return b.price - a.price;
    if (sortOrder === "priceAsc") return a.price - b.price;
    return 0; // Orden por defecto (como viene en el JSON)
  });

  return (
    <Container className="my-5">
      
      {/* --- SECCIÓN DE FILTROS (Añadida) --- */}
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
          <Form.Select 
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="default">Ordenar por...</option>
            <option value="priceAsc">Precio: Menor a Mayor</option>
            <option value="priceDesc">Precio: Mayor a Menor</option>
          </Form.Select>
        </Col>

        <Col xs={12} md={4}>
          <Form.Select 
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>

      {/* --- GRILLA DE PRODUCTOS --- */}
      <Row xs={1} sm={2} md={3} className="g-3">
        {/* Cambiamos "products" por "filteredProducts" */}
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

      {/* --- MODAL DE DETALLE --- */}
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