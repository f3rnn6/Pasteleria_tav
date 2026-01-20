import { useMemo } from "react";
import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";

import ProductCard from "../components/ProductCard.jsx";
import products from "../data/Products.json";

const Inicio = () => {
  const navigate = useNavigate();

  // useMemo: calcula 1 vez (en este montaje) los 4 productos al azar
  const destacados = useMemo(() => {
    const copy = [...products]; // copia para no alterar el original
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]]; // “barajar”
    }
    return copy.slice(0, 4); // toma 4
  }, []);

  return (
    <>
      {/* Carrusel principal */}
      <Carousel className="mb-5 carousel-pasteleria">
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://images.unsplash.com/photo-1684436060012-db6da717e7c7?q=80&w=1171&auto=format&fit=crop"
            alt="Pastelería"
          />
          <Carousel.Caption
            style={{ background: "rgba(192, 108, 132, 0.7)", borderRadius: "10px" }}
          >
            <h3>Nuestras Tortas Artesanales</h3>
            <p>Hechas con amor y los mejores ingredientes.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      {/* Sección de destacados (id usado por el link del navbar) */}
      <Container className="ProdDestacados" id="ProdDestacados">
        <div className="text-start mb-3">
          <h2 className="h4 fw-bold mb-1">Productos destacados</h2>
          <p className="text-muted mb-0">Se muestran 4 productos al azar.</p>
        </div>

        <Row xs={1} sm={2} md={4} className="g-3">
          {destacados.map((p) => (
            <Col key={p.id}>
              <ProductCard
                name={p.name}
                price={p.price}
                description={p.description}
                imageCard={p.imageCard}
                // aquí lo envía a /productos para ver el catálogo completo
                onDetails={() => navigate("/productos")}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Inicio;
