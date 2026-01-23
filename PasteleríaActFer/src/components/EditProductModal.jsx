// src/components/EditProductModal.jsx
import { Modal, Button, Form } from "react-bootstrap";
import { useEffect, useState } from "react";

export default function EditProductModal({ show, onClose, product, onSave }) {
  const [form, setForm] = useState(null);

  useEffect(() => {
    if (!product) {
      setForm(null);
      return;
    }

    setForm({
      ...product,
      imageUrl: product.imageCard || "",
    });
  }, [product]);

  if (!form) return null;

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    if (!form.name?.trim() || !form.price || !form.imageUrl?.trim() || form.stock === "") {
      alert("Todos los campos son obligatorios.");
      return;
    }

    if (Number(form.price) <= 0 || Number(form.stock) < 0) {
      alert("Precio y stock deben ser valores válidos.");
      return;
    }

    onSave({
      ...form,
      name: form.name.trim(),
      description: (form.description || "").trim(),
      price: Number(form.price),
      stock: Number(form.stock),
      imageCard: form.imageUrl.trim(),
      imageDetail: form.imageUrl.trim(),
    });

    onClose();
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Editar producto</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-2">
            <Form.Control
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Nombre"
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Control
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              placeholder="Precio"
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Control
              name="stock"
              type="number"
              value={form.stock}
              onChange={handleChange}
              placeholder="Stock"
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Control
              name="imageUrl"
              value={form.imageUrl}
              onChange={handleChange}
              placeholder="URL de imagen"
            />
          </Form.Group>

          <Form.Group>
            <Form.Control
              name="description"
              as="textarea"
              rows={3}
              value={form.description}
              onChange={handleChange}
              placeholder="Descripción"
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancelar
        </Button>
        <Button onClick={handleSubmit} style={{ backgroundColor: "#c06c84", border: "none" }}>
          Guardar cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
