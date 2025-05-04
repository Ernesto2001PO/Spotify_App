import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import CardComponent from "../components/CardComponent";
import { Row, Col, Container } from "react-bootstrap";
import AlbumRepository from "../repositories/Albumrepository";

function Albums() {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const BASEURL = "http://localhost:3000";
  const { idArtista } = useParams();

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const data = await AlbumRepository.getAllAlbums(idArtista);
        console.log("Data fetched:", data);
        setAlbums(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAlbums();
  }, [idArtista]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

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
        <h1 style={{ color: "#ffffff" }}>Albums List</h1>
        <p style={{ color: "#ffffff" }}>
          List of albums will be displayed here.
        </p>
      </div>

      {/* Contenedor para las tarjetas */}
      <Container className="mt-4">
        <h1 className="text-dark">Welcome to the Spotify Clone</h1>
        <Row className="mt-4">
          {albums.map((album) => (
            <Col md={4} key={album.id_album}>
              <CardComponent
                title={album.nombre}
                imageUrl={`${BASEURL}/${album.imagen}`}
                songs={album.canciones}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default Albums;
