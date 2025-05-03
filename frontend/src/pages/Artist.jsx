import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";



import CardComponent from "../components/CardComponent";
import { Row, Col, Container } from "react-bootstrap";
import ArtistRepository from "../repositories/Artistrepository";




function Artist() {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const BASEURL = "http://localhost:3000";
  const { idGenero } = useParams(); 

  
  useEffect(() => {
    const fetchArtists = async () => {
      console.log("Fetching artists with idGenero:", idGenero); 
      try {
        const data = await ArtistRepository.getAllartists(idGenero); 
        console.log("Data fetched from backend:", data); 
        setArtists(data); 
      } catch (error) {
        console.error("Error fetching artists:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchArtists();
  }
  , [idGenero]);
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
        <h1 style={{ color: "#ffffff" }}>Artist List</h1>
        <p style={{ color: "#ffffff" }}>
          List of artist will be displayed here.
        </p>
      </div>

      {/* Contenedor para las tarjetas */}
      <Container className="mt-4">
        <h1 className="text-dark">Welcome to the ARTIST Clone</h1>
        <Row className="mt-4">
          {artists.map((artist) => (
            <Col md={4} key={artist.id_artista}>
              <CardComponent
                title={artist.nombre}
                imageUrl={`${BASEURL}/${artist.imagen}`}
                buttonLink={`/artists/albums/${artist.id_artista}`} 
              />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default Artist;
