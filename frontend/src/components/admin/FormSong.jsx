import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  FormControl,
  Button,
  FormSelect,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import SongRepository from "../../repositories/Songrepository";
import AlbumRepository from "../../repositories/Albumrepository";

const FormSong = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [nombre, setNombre] = useState("");
  const [audio, setAudio] = useState(null);
  const [id_album, setIdAlbum] = useState("");
  const [albums, setAlbums] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const data = await AlbumRepository.getAlbumes();
        setAlbums(data);
      } catch (error) {
        console.error("Error al cargar los álbumes:", error);
      }
    };
    fetchAlbums();

    if (id) {
      setIsEdit(true);
      const fetchSong = async () => {
        try {
          const data = await SongRepository.getSongById(id);
          setNombre(data.nombre);
          setAudio(data.audio);
          setIdAlbum(data.id_album);
        } catch (error) {
          console.error("Error al cargar la canción:", error);
        }
      };
      fetchSong();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("audio", audio);
    formData.append("id_album", id_album);

    try {
      if (isEdit) {
        // Si es edición, actualizamos la canción
        await SongRepository.updateSong(id, formData);
      } else {
        // Si es creación, creamos la canción
        await SongRepository.createSong(formData);
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
      await SongRepository.deleteSong(id);
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
            <Card.Header></Card.Header>
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
                  <label>Audio (archivo MP3)</label>
                  <FormControl
                    name="audio"
                    type="file"
                    accept=".mp3"
                    onChange={(e) => setAudio(e.target.files[0])}
                  />
                </div>
                <div className="mb-3">
                  <label>Albumes</label>
                  <FormSelect>
                    <option value="">Selecciona un álbum</option>
                    {albums.map((album) => (
                      <option key={album.id} value={album.id}>
                        {album.nombre}
                      </option>
                    ))}
                  </FormSelect>
                </div>
                <div className="mt-2">
                  <Button variant="primary" type="submit">
                    {isEdit ? "Actualizar" : "Crear"}
                  </Button>
                </div>

                <div>
                  {isEdit && (
                    <Button variant="danger" onClick={() => handleDelete(id)}>
                      Eliminar
                    </Button>
                  )}
                </div>
                <div>
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

export default FormSong;
