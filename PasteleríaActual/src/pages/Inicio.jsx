import Carousel from 'react-bootstrap/Carousel';
import ProductCard from '../components/ProductCard';
import products from '../data/products.json';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Inicio = () => {
  return (
    <>
      {/* Añadimos la clase personalizada aquí */}
      <Carousel className="mb-5 carousel-pasteleria">
        
        <Carousel.Item>
          <img 
            className="d-block w-100" 
            src="https://images.unsplash.com/photo-1684436060012-db6da717e7c7?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            alt="Promoción Pastelería" 
            /* Eliminamos el style inline para que mande el CSS */
          />
          <Carousel.Caption style={{ background: 'rgba(192, 108, 132, 0.7)', borderRadius: '10px' }}>
            <h3>Nuestras Tortas Artesanales</h3>
            <p>Hechas con amor y los mejores ingredientes.</p>
          </Carousel.Caption>
        </Carousel.Item>

        {/* Ejemplo de un segundo ítem */}
        <Carousel.Item>
          <img 
            className="d-block w-100" 
            src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1089&auto=format&fit=crop" 
            alt="Tortas de Chocolate" 
          />
          <Carousel.Caption style={{ background: 'rgba(192, 108, 132, 0.7)', borderRadius: '10px' }}>
            <h3>Especialidad en Chocolate</h3>
            <p>El sabor que estabas buscando.</p>
          </Carousel.Caption>
        </Carousel.Item>

         <Carousel.Item>
          <img 
            className="d-block w-100" 
            src="https://images.unsplash.com/photo-1426869884541-df7117556757?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            alt="Tortas de Chocolate" 
          />
          <Carousel.Caption style={{ background: 'rgba(192, 108, 132, 0.7)', borderRadius: '10px' }}>
            <h3>Cupcakes Irresistibles</h3>
            <p>Ideales para compartir.</p>
          </Carousel.Caption>
        </Carousel.Item>


         <Carousel.Item>
          <img 
            className="d-block w-100" 
            src="https://images.unsplash.com/photo-1590400926865-1c70a2586bb5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            alt="Tortas de Chocolate" 
          />
          <Carousel.Caption style={{ background: 'rgba(192, 108, 132, 0.7)', borderRadius: '10px' }}>
            <h3>Galletas de la Abuela</h3>
            <p>Lo mejor para la hora del té.</p>
          </Carousel.Caption>
        </Carousel.Item>

      </Carousel>
    </>
  );
};

export default Inicio;