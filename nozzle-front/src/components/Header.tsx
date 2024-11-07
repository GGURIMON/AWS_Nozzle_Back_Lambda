import { Container, Nav, Navbar } from 'react-bootstrap';

const Header = () => {
  return (
    <Navbar className='header' expand="lg">
      <Container>
        <Navbar.Brand href="/">
          <img 
            src="logo.png" 
            alt="로고"
            className='logo-img' 
            style={{ width: '200px', height: '50px' }} 
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto fw-bold">
            <Nav.Link className="nav-text" href="#section1">1</Nav.Link>
            <Nav.Link className="nav-text" href="#section2">2</Nav.Link>
            <Nav.Link className="nav-text" href="#section3">3</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header;