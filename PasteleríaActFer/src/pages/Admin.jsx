import { useState } from "react";
import { Container, Form, Button, Table, Modal, Row, Col } from "react-bootstrap";
import { useProducts } from "../context/ProductsContext.jsx";

const emptyProduct = {
  name: "",
  price: "",
  description: "",
  imageCard: "",
  imageDetail: "",
  category: "Tortas",
  stock: "",
};

export default function Admin() {
  const { products, addProduct, deleteProduct, updateProduct } = useProducts();

  const [form, setForm] = useState(emptyProduct);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = (p) => {
    if (!p.name || !p.price || !p.description || !p.imageCard || !p.stock) return false;
    if (Number(p.price) <= 0) return false;
    if (Number(p.stock) < 0) return false;
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate(form)) {
      alert("Completa bien los campos (precio > 0, stock >= 0).");
      return;
    }

    addProduct({
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
      // si no escriben imageDetail, usamos la misma imagen
      imageDetail: form.imageDetail?.trim() ? form.imageDetail : form.imageCard,
    });

    setForm(emptyProduct);
  };

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleUpdate = () => {
    if (!selectedProduct) return;

    if (!validate(selectedProduct)) {
      alert("Completa bien los campos (precio > 0, stock >= 0).");
      return;
    }

    updateProduct({
      ...selectedProduct,
      price: Number(selectedProduct.price),
      stock: Number(selectedProduct.stock),
      imageDetail: selectedProduct.imageDetail?.trim()
        ? selectedProduct.imageDetail
        : selectedProduct.imageCard,
    });

    setShowModal(false);
  };

  const handleDelete = (p) => {
    const confirm = window.confirm(`¿Eliminar "${p.name}"?`);
    if (confirm) deleteProduct(p.id);
  };

  return (
    <Container className="my-5">
      <h1 className="mb-4">Administración de Productos</h1>

      {/* CREAR */}
      <Form onSubmit={handleSubmit} className="mb-4">
        <Row className="g-3">
          <Col md={6}>
            <Form.Control
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Nombre"
              required
            />
          </Col>

          <Col md={3}>
            <Form.Control
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              placeholder="Precio"
              required
            />
          </Col>

          <Col md={3}>
            <Form.Control
              name="stock"
              type="number"
              value={form.stock}
              onChange={handleChange}
              placeholder="Stock"
              required
            />
          </Col>

          <Col md={6}>
            <Form.Control
              name="category"
              value={form.category}
              onChange={handleChange}
              placeholder="Categoría (Tortas, Tartas...)"
            />
          </Col>

          <Col md={6}>
            <Form.Control
              name="imageCard"
              value={form.imageCard}
              onChange={handleChange}
              placeholder="URL imagen (card)"
              required
            />
          </Col>

          <Col md={12}>
            <Form.Control
              name="imageDetail"
              value={form.imageDetail}
              onChange={handleChange}
              placeholder="URL imagen (detalle) (opcional, si lo dejas vacío se usa la misma)"
            />
          </Col>

          <Col md={12}>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Descripción"
              required
            />
          </Col>
        </Row>

        <Button type="submit" className="mt-3" style={{ backgroundColor: "#c06c84", border: "none" }}>
          Agregar producto
        </Button>
      </Form>

      {/* LISTADO */}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Categoría</th>
            <th style={{ width: 160 }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>${Number(p.price).toLocaleString("es-CL")}</td>
              <td>{p.stock}</td>
              <td>{p.category}</td>
              <td>
                <Button size="sm" className="me-2" onClick={() => handleEditClick(p)}>
                  Editar
                </Button>
                <Button size="sm" variant="danger" onClick={() => handleDelete(p)}>
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* MODAL EDITAR */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Editar producto</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {!selectedProduct ? null : (
            <Row className="g-3">
              <Col md={6}>
                <Form.Control
                  value={selectedProduct.name}
                  onChange={(e) =>
                    setSelectedProduct((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="Nombre"
                />
              </Col>

              <Col md={3}>
                <Form.Control
                  type="number"
                  value={selectedProduct.price}
                  onChange={(e) =>
                    setSelectedProduct((prev) => ({ ...prev, price: e.target.value }))
                  }
                  placeholder="Precio"
                />
              </Col>

              <Col md={3}>
                <Form.Control
                  type="number"
                  value={selectedProduct.stock}
                  onChange={(e) =>
                    setSelectedProduct((prev) => ({ ...prev, stock: e.target.value }))
                  }
                  placeholder="Stock"
                />
              </Col>

              <Col md={6}>
                <Form.Control
                  value={selectedProduct.category || ""}
                  onChange={(e) =>
                    setSelectedProduct((prev) => ({ ...prev, category: e.target.value }))
                  }
                  placeholder="Categoría"
                />
              </Col>

              <Col md={6}>
                <Form.Control
                  value={selectedProduct.imageCard || ""}
                  onChange={(e) =>
                    setSelectedProduct((prev) => ({ ...prev, imageCard: e.target.value }))
                  }
                  placeholder="URL imagen (card)"
                />
              </Col>

              <Col md={12}>
                <Form.Control
                  value={selectedProduct.imageDetail || ""}
                  onChange={(e) =>
                    setSelectedProduct((prev) => ({ ...prev, imageDetail: e.target.value }))
                  }
                  placeholder="URL imagen (detalle) (opcional)"
                />
              </Col>

              <Col md={12}>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={selectedProduct.description || ""}
                  onChange={(e) =>
                    setSelectedProduct((prev) => ({ ...prev, description: e.target.value }))
                  }
                  placeholder="Descripción"
                />
              </Col>
            </Row>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button onClick={handleUpdate} style={{ backgroundColor: "#c06c84", border: "none" }}>
            Guardar cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
