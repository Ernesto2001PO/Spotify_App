import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button"; // Faltaba esta importación
import defaultAlbumImage from "./../../assets/vite.svg"; // Asegúrate de tener esta imagen en tu proyecto
import { Link } from "react-router-dom";

const CardComponent = ({ title, imageUrl, buttonLink }) => {
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

      </Card.Body>
    </Card>
  );
};

export default CardComponent;
