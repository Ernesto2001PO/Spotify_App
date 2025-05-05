import React, { useState, useEffect } from "react";
import { Card, Col, Container, Row, Table, Button } from "react-bootstrap";
import SongRepository from "../../repositories/Songrepository";
import { useNavigate } from "react-router-dom";

const SongCRUD = () => {
  console.log("SongCRUD component rendered");
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
    // const BASEURL = "http://localhost:3000";
    
    
  const handleCreate = () => {
    navigate("/admin/create-song");
  };

  const handleEdit = (id) => {
    navigate(`/admin/edit-song/${id}`);
  };

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const data = await SongRepository.getAllSongs();
        console.log("Datos obtenidos:", data);
        setSongs(data);
      } catch (error) {
        console.error("Error en fetchSongs:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSongs();
  }, []);

  if (loading) {
    return <div style={{ color: "*#000000" }}>Loading...</div>;
  }
  if (error) {
    return <div style={{ color: "#000000" }}>Error: {error}</div>;
  }

  return (
    <div>
      <h1>CRUD de CANCIONES</h1>
      <p>Esta sección permite gestionar los álbumes de la aplicación.</p>
      <p>Funcionalidad no implementada.</p>
      <h5>Gestión de Canciones</h5>
      <Button variant="success" className="mb-3" onClick={handleCreate}>
        Crear Canción
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
                        <th>Audio</th>
                        <th>Editar</th>
                      </tr>
                    </thead>

                    <tbody>
                      {songs.length > 0 ? (
                        songs.map((song) => (
                          <tr key={song.id_cancion}>
                            <td>{song.id_cancion}</td>
                            <td>{song.nombre}</td>
                            <td>{song.audio}</td>
                            <td>
                              <Button
                                variant="warning"
                                size="sm"
                                onClick={() => handleEdit(song.id_cancion)}
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
export default SongCRUD;
