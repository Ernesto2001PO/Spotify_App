import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button"; // Faltaba esta importación
import defaultAlbumImage from "./../../assets/vite.svg"; // Asegúrate de tener esta imagen en tu proyecto
import { Link } from "react-router-dom";

const CardComponent = ({ title, imageUrl, songs, buttonLink }) => {

  return (
    <Card style={{ width: "18rem" }} className="mb-4">
      <Link to={buttonLink}>
        <Card.Img
          variant="top"
          src={imageUrl}
          style={{ height: "180px", objectFit: "cover" }}
          onError={(e) => {
            e.target.src = defaultAlbumImage;
            console.log("Error loading image:", imageUrl);
          }}
        />
      </Link>
      <Card.Body>
        <Card.Title> {title} </Card.Title>
        <Card.Text>
          <strong style={{ color: "#000000" }}>Songs:</strong>
          <ul
            style={{ listStyleType: "none", paddingLeft: 0, color: "#000000" }}
          >
            {songs && songs.length > 0 ? (
              songs.map((song) => (
                <li style={{ color: "#000000" }} key={song.id_cancion}>
                  {song.nombre}{" "}
                </li>
              ))
            ) : (
              <li>No songs available</li>
            )}
          </ul>
        </Card.Text>
        <Link to={buttonLink}>
          <Button variant="primary">Go to {title}</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default CardComponent;
