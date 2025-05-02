import CardComponent from "../components/CardComponent";
import { Row, Col, Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import GenreRepository from "../repositories/Genrerepository";
function Genres() {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const BASEURL = "http://localhost:3000";

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const data = await GenreRepository.getAllGenres();
        console.log("Data fetched:", data);
        setGenres(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error o apagado el servidor: {error}</div>;
  }

  const songListStyle = {
    backgroundColor: "#000000",
    padding: "20px",
    borderRadius: "5px",
    margin: "20px 0",
  };
  return (
    <div>
      <div style={songListStyle}>
        <h1 style={{ color: "#ffffff" }}>Genres List</h1>
        <p style={{ color: "#ffffff" }}>
          List of genres will be displayed here.
        </p>
      </div>

      <Container className="mt-4">
        <h1 className="text-dark">Welcome to the GENRES Clone</h1>
        <Row className="mt-4">
          {genres.map((genre) => (
            <Col md={4} key={genre.id_genero}>
              <CardComponent
                title={genre.nombre}
                imageUrl={`${BASEURL}/${genre.imagen}`}
                buttonLink={`/albums/${genre.id_genero}/artists`}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default Genres;
