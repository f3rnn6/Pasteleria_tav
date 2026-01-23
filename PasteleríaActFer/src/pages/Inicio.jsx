// src/pages/Inicio.jsx
import { useMemo } from "react";
import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";

import ProductCard from "../components/ProductCard.jsx";
import { useProducts } from "../context/ProductsContext.jsx";

const Inicio = () => {
  const navigate = useNavigate();
  const { products } = useProducts();

  // useMemo: calcula los 4 productos al azar cada vez que cambie products
  const destacados = useMemo(() => {
    const copy = [...products]; // copia para no alterar el original
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]]; // barajar
    }
    return copy.slice(0, 4); // toma 4
  }, [products]);

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

        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://images.unsplash.com/photo-1599599810769-bcde5a160d32?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Pastelería"
          />
          <Carousel.Caption
            style={{ background: "rgba(192, 108, 132, 0.7)", borderRadius: "10px" }}
          >
            <h3>Nuestras Deliciosas Galletas</h3>
            <p>Reales y deliciosas.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://images.unsplash.com/photo-1640806354740-d47c98c190ea?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Pastelería"
          />
          <Carousel.Caption
            style={{ background: "rgba(192, 108, 132, 0.7)", borderRadius: "10px" }}
          >
            <h3>Nuestros Mejores Cupcakes</h3>
            <p>Con los sabores más irresistibles.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://images.unsplash.com/photo-1561339405-e1dd0d129449?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Pastelería"
          />
          <Carousel.Caption
            style={{ background: "rgba(192, 108, 132, 0.7)", borderRadius: "10px" }}
          >
            <h3>Nuestras Tartas Frutales</h3>
            <p>Con las frutas más frescas y deliciosas.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      {/* Sección de destacados */}
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