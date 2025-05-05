import React, { useState, useEffect } from "react";
import { Card, Col, Container, Row, Table, Button } from "react-bootstrap";
import GeneroRepository from "../../repositories/Genrerepository";
import { useNavigate } from "react-router-dom";

const GeneroCRUD = () => {
  console.log("GeneroCRUD component rendered");
  const [generos, setGeneros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  // const BASEURL = "http://localhost:3000";

  const handleCreate = () => {
    navigate("/admin/create-genero");
  };

  const handleEdit = (id) => {
    navigate(`/admin/edit-genero/${id}`);
  };

  useEffect(() => {
    const fetchGeneros = async () => {
      try {
        const data = await GeneroRepository.getAllGenres();
        console.log("Datos obtenidos:", data);
        setGeneros(data);
      } catch (error) {
        console.error("Error en fetchGeneros:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchGeneros();
  }, []);

  if (loading) {
    return <div style={{ color: "*#000000" }}>Loading...</div>;
  }
  if (error) {
    return <div style={{ color: "#000000" }}>Error: {error}</div>;
  }

  return (
    <div>
      <h1>CRUD de GENEROS</h1>
      <p>Esta sección permite gestionar los álbumes de la aplicación.</p>
      <h5>Gestión de Canciones</h5>
      <Button variant="success" className="mb-3" onClick={handleCreate}>
        Crear Genero
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
                      {generos.length > 0 ? (
                        generos.map((genero) => (
                            <tr key={genero.id_genero}>
                            <td>{genero.id_genero}</td>
                            <td>{genero.nombre}</td>
                            <td>{genero.imagen}</td>
                            <td>
                              <Button
                                variant="warning"
                                size="sm"
                                onClick={() => handleEdit(genero.id_genero)}
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
export default GeneroCRUD;
