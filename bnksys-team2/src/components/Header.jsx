import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './Header.scss';

const Header = () => {
  return (
    // <Navbar collapseOnSelect expand="lg">
    //   <Container>
    //     <div className="logo">로고</div>
    //     <Navbar.Collapse id="responsive-navbar-nav" style={{ textAlign: 'center' }}>
    //       <Nav className="nav-menu ms-auto">
    //         <Link to="/">저작물 생성</Link>
    //         <Link to="/">저작물 배포</Link>
    //         <Link to="/">내 저작물</Link>
    //       </Nav>
    //     </Navbar.Collapse>
    //   </Container>
    // </Navbar>
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand href="#home">LOGO</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#">저작물 생성</Nav.Link>
            <Nav.Link href="#">저작물 배포</Nav.Link>
            <Nav.Link href="#">내 저작물</Nav.Link>
          </Nav>
          <Nav.Link href="#">로그아웃</Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
