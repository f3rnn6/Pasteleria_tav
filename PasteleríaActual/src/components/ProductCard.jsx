import { Card, Button } from 'react-bootstrap';

function ProductCard({ name, price, description, imageCard,onDetails }) {
  return (
    <Card className="h-100 shadow-sm">
      <Card.Img variant="top" src={imageCard} style={{ height: '180px', objectFit: 'cover' }} />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{name}</Card.Title>
        <Card.Text className="text-secondary flex-grow-1">
        </Card.Text>
        <div className="d-flex justify-content-between align-items-center mt-3">
          <span className="fw-bold fs-5">${price}</span>
          <Button variant="outline-primary" size="sm" onClick={onDetails}>
            Detalles
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;