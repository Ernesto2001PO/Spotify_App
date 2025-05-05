import { Container, Tab, Tabs } from "react-bootstrap";
import SongCRUD from "../components/admin/SongCRUD";
import AlbumCRUD from "../components/admin//AlbumCRUD"
import ArtistCRUD from "../components/admin/ArtistCRUD";
import GenreCRUD from "../components/admin/GenresCRUD";

function Admin() {


  const styleContainer = {
    backgroundColor: "#ffffff",
    color: "#ffffff",
    padding: "10px",
  };
  return (
    <> 
      <Container className="mt-4" style={styleContainer}>
        <Tabs defaultActiveKey="songs" id="admin-tabs" className="mb-3">
          <Tab eventKey="songs" title="Canciones">
            <SongCRUD />
          </Tab>
          <Tab eventKey="albums" title="Álbumes">
            <AlbumCRUD />
          </Tab>
          <Tab eventKey="artists" title="Artistas">
            <ArtistCRUD />
          </Tab>
          <Tab eventKey="genres" title="Géneros">
            <GenreCRUD />
          </Tab>
        </Tabs>
      </Container>
    </>
  );
}

export default Admin;
