import CardComponent from "../components/CardComponent";
import { Row, Col, Container } from "react-bootstrap"; // Asegúrate de importar Container

function Artist() {
  const songListStyle = {
    backgroundColor: "#000000",
    padding: "20px",
    borderRadius: "5px",
    margin: "20px 0",
  };

  return (
    <div>
      {/* Contenedor para la lista de canciones */}
      <div style={songListStyle}>
        <h1 style={{ color: "#ffffff" }}>Artist List</h1>
        <p style={{ color: "#ffffff" }}>
          List of artist will be displayed here.
        </p>
      </div>

      {/* Contenedor para las tarjetas */}
      <Container className="mt-4">
        <h1 className="text-dark">Welcome to the ARTIST Clone</h1>
        <Row className="mt-4">
          <Col md={4}>
            <CardComponent />
          </Col>
          <Col md={4}>
            <CardComponent />
          </Col>
          <Col md={4}>
            <CardComponent />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Artist;
