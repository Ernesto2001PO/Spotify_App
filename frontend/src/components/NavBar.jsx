import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
  const navbarStyle = {
    // green spotify color
    backgroundColor: "#1DB954",
    color: "#ffffff",
    padding: "10px",
  };
  const linkStyle = {
    // black  color
    color: "#000000",
    textDecoration: "none",
  };
  const spotifyIconStyle = {
    width: "30px",
    height: "30px",
    marginRight: "10px",
  };

  return (
    <Navbar style={navbarStyle} className="navbar-custom">
      <img
        style={spotifyIconStyle}
        src="../public/Spotify-icon.png"
        alt="Spotify"
      />
      <Container>
        <Navbar.Brand href="/" style={linkStyle} className="nav-link">
          Home
        </Navbar.Brand>
        <Nav className="ml-auto">
          <NavLink to="/genres" style={linkStyle} className="nav-link">
            Genres
          </NavLink>
        </Nav>
        <Nav className="ml-auto">
          <NavLink to="/album" style={linkStyle} className="nav-link">
            Albums
          </NavLink>
        </Nav>
        <Nav className="ml-auto">
          <NavLink to="/artist" style={linkStyle} className="nav-link">
            Artist
          </NavLink>
        </Nav>
        <Nav className="me-auto">
          <NavLink to="/songs" style={linkStyle} className="nav-link">
            Songs
          </NavLink>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
