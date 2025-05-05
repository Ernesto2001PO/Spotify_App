import React, { useState, useEffect } from "react";
import { Card, Col, Container, Row, Table, Button } from "react-bootstrap";
import ArtistaRepository from "../../repositories/Artistrepository";
import { useNavigate } from "react-router-dom";

const ArtistaCRUD = () => {
  console.log("ArtistaCRUD component rendered");
  const [artistas, setArtistas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  // const BASEURL = "http://localhost:3000";

  const handleCreate = () => {
    navigate("/admin/create-artista");
  };

  const handleEdit = (id) => {
    navigate(`/admin/edit-artista/${id}`);
  };

  useEffect(() => {
    const fetchArtistas = async () => {
      try {
        const data = await ArtistaRepository.getArtistas();
        console.log("Datos obtenidos:", data);
        setArtistas(data);
      } catch (error) {
        console.error("Error en fetchArtistas:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchArtistas();
  }, []);

  if (loading) {
    return <div style={{ color: "*#000000" }}>Loading...</div>;
  }
  if (error) {
    return <div style={{ color: "#000000" }}>Error: {error}</div>;
  }

  return (
    <div>
      <h1>CRUD de ARTISTAS</h1>
      <p>Esta sección permite gestionar los álbumes de la aplicación.</p>
      <h5>Gestión de Canciones</h5>
      <Button variant="success" className="mb-3" onClick={handleCreate}>
        Crear Artista
      </Button>
      u
      <div>
        <Container className="mt-3">
          <Row>
            <Col>
              <Card>
                <Card.Body>
                  <Table striped bordered hover size="sm" responsive>
                    <thead>
                      <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Imagen</th>
                        <th>Editar</th>
                      </tr>
                    </thead>

                    <tbody>
                      {artistas.length > 0 ? (
                        artistas.map((artista) => (
                          <tr key={artista.id_artista}>
                            <td>{artista.id_artista}</td>
                            <td>{artista.nombre}</td>
                            <td>{artista.imagen}</td>
                            <td>{artista.id_genero}</td>

                            <td>
                              <Button
                                variant="warning"
                                size="sm"
                                onClick={() => handleEdit(artista.id_artista)}
                              >
                                Editar
                              </Button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="3">No hay canciones disponibles</td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};
export default ArtistaCRUD;
