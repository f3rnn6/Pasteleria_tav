import { Card, Button } from "react-bootstrap";

// Tarjeta reutilizable para mostrar un producto
function ProductCard({ name, price, description, imageCard, onDetails }) {
  return (
    <Card className="h-100 shadow-sm">
      {/* Imagen del producto (card) */}
      <Card.Img
        variant="top"
        src={imageCard}
        style={{ height: "180px", objectFit: "cover" }}
      />

      <Card.Body className="d-flex flex-column">
        {/* Nombre */}
        <Card.Title>{name}</Card.Title>

        {/* Texto (usted no está usando description aquí, pero podría) */}
        <Card.Text className="text-secondary flex-grow-1"></Card.Text>

        {/* Precio + botón */}
        <div className="d-flex justify-content-between align-items-center mt-3">
          <span className="fw-bold fs-5">${price}</span>

          {/* onDetails normalmente abre el modal en Productos.jsx */}
          <Button variant="outline-primary" size="sm" onClick={onDetails}>
            Detalles
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
