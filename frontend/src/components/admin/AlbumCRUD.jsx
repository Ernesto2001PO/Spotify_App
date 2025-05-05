import React, { useState, useEffect } from "react";
import { Card, Col, Container, Row, Table, Button } from "react-bootstrap";
import AlbumRepository from "../../repositories/Albumrepository";
import { useNavigate } from "react-router-dom";

const AlbumCRUD = () => {
  console.log("AlbumCRUD component rendered");
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  // const BASEURL = "http://localhost:3000";

  const handleCreate = () => {
    navigate("/admin/create-album");
  };

  const handleEdit = (id) => {
    navigate(`/admin/edit-album/${id}`);
  };

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const data = await AlbumRepository.getAlbumes();
        console.log("Datos obtenidos:", data);
        setAlbums(data);
      } catch (error) {
        console.error("Error en fetchAlbums:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAlbums();
  }, []);

  if (loading) {
    return <div style={{ color: "*#000000" }}>Loading...</div>;
  }
  if (error) {
    return <div style={{ color: "#000000" }}>Error: {error}</div>;
  }

  return (
    <div>
      <h1>CRUD de ALBUMES</h1>
      <p>Esta sección permite gestionar los álbumes de la aplicación.</p>
      <h5>Gestión de Canciones</h5>
      <Button variant="success" className="mb-3" onClick={handleCreate}>
        Crear Album
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
                      {albums.length > 0 ? (
                        albums.map((album) => (
                          <tr key={album.id_album}>
                            <td>{album.id_album}</td>
                            <td>{album.nombre}</td>
                            <td>{album.imagen}</td>
                            <td>{album.id_artista}</td>

                            <td>
                              <Button
                                variant="warning"
                                size="sm"
                                onClick={() => handleEdit(album.id_album)}
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
export default AlbumCRUD;
