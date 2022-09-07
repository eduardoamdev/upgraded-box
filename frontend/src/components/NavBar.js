import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand className="navbar-title">Upgraded Box</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link
              to="/"
              className="decoration-none margin-l-2 fc-white navbar-link"
            >
              Home
            </Link>
            <Link
              to="/retrieveContent"
              className="decoration-none margin-l-2 fc-white navbar-link"
            >
              Retrieve content
            </Link>
            <Link
              to="/incrementContent"
              className="decoration-none margin-l-2 fc-white navbar-link"
            >
              Increment content
            </Link>
            <Link
              to="/getName"
              className="decoration-none margin-l-2 fc-white navbar-link"
            >
              Get name
            </Link>
            <Link
              to="/setName"
              className="decoration-none margin-l-2 fc-white navbar-link"
            >
              Set name
            </Link>
            <Link
              to="/getV4Name"
              className="decoration-none margin-l-2 fc-white navbar-link"
            >
              Get V4 name
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
