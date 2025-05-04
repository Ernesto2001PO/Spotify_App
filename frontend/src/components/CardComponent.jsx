import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import defaultAlbumImage from "./../../assets/vite.svg";
import { Link } from "react-router-dom";

const CardComponent = ({ title, imageUrl, songs, buttonLink }) => {
  const BASEURL = "http://localhost:3000";
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
        <div>
          <strong style={{ color: "#000000" }}>Songs:</strong>
          <ul
            style={{ listStyleType: "none", paddingLeft: 0, color: "#000000" }}
          >
            {songs && songs.length > 0 ? (
              songs.map((song) => (
                <li style={{ color: "#000000" }} key={song.id_cancion}>
                  <div>
                    <span>{song.nombre}</span>
                    <audio
                      controls
                      style={{ display: "block", marginTop: "5px" }}
                    >
                      <source
                        src={`${BASEURL}/${song.audio}`}
                        type="audio/mpeg"
                      />
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                </li>
              ))
            ) : (
              <li>No songs available</li>
            )}
          </ul>
        </div>
        <Link to={buttonLink}>
          <Button variant="primary">Go to {title}</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default CardComponent;
