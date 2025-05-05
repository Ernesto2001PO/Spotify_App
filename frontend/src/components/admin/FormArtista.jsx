import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Artistarepository from "../../repositories/Artistrepository";

const FormArtista = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [nombre, setNombre] = useState("");
  const [imagen, setImagen] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [id_genero, setIdGenero] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const BASEURL = "http://localhost:3000";

  useEffect(() => {
    if (id) {
      setIsEdit(true);
      const fetchArtista = async () => {
        try {
          const data = await Artistarepository.getArtistasById(id);
          setNombre(data.nombre);
          setIdGenero(data.id_genero);

          setPreviewUrl(`${BASEURL}/${data.imagen}`);
          setImagen(null);
        } catch (error) {
          console.error("Error al cargar la canción:", error);
        }
      };
      fetchArtista();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("id_genero", id_genero);

    if (imagen instanceof File) {
      formData.append("imagen", imagen);
    }

    try {
      if (isEdit) {
        // Si es edición, actualizamos la canción
        await Artistarepository.updateArtistas(id, formData);
      } else {
        // Si es creación, creamos la canción
        await Artistarepository.createArtistas(formData);
      }
      navigate("/admin");
    } catch (error) {
      console.error(
        isEdit ? "Error al editar canción:" : "Error al crear canción:",
        error
      );
    }
  };
  const handleDelete = async (id) => {
    try {
      await Artistarepository.deleteArtistas(id);
      navigate("/admin");
    } catch (error) {
      console.error("Error al eliminar canción:", error);
    }
  };

  return (
    <Container className="mt-3">
      <Row>
        <Col xs={6}>
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label>Nombre</label>
                  <FormControl
                    required
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label>Imagen</label>
                  {previewUrl && (
                    <div className="mb-2">
                      <img
                        src={previewUrl}
                        alt="Vista previa"
                        style={{
                          width: "100%",
                          maxHeight: "200px",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  )}
                  <FormControl
                    name="imagen"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setImagen(file);
                        setPreviewUrl(URL.createObjectURL(file));
                      }
                    }}
                  />
                </div>

                <div className="mb-3">
                  <label>ID del Genero</label>
                  <FormControl
                    required
                    type="number"
                    value={id_genero}
                    onChange={(e) => setIdGenero(e.target.value)}
                  />
                </div>

                <div className="mt-2">
                  <Button variant="primary" type="submit">
                    {isEdit ? "Actualizar" : "Crear"}
                  </Button>
                </div>

                {isEdit && (
                  <div className="mt-2">
                    <Button variant="danger" onClick={() => handleDelete(id)}>
                      Eliminar
                    </Button>
                  </div>
                )}

                <div className="mt-2">
                  <Button variant="warning" onClick={() => navigate("/admin")}>
                    Volver
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default FormArtista;
