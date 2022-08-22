import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './Header.scss';

const Header = () => {

  const [isLogin, setIsLogin] = useState(false);

  const s = sessionStorage.getItem('userNo');

  useEffect(() => {
    if(sessionStorage.getItem('userNo') === null || sessionStorage.getItem('userNo') === 'undefined'){
    // sessionStorage 에 userNo 라는 key 값으로 저장된 값이 없다면
      console.log('f');
      setIsLogin(false);
    } else {
    // sessionStorage 에 userNo 라는 key 값으로 저장된 값이 있다면
    // 로그인 상태 변경
      console.log('t');
      setIsLogin(true);
      // console.log('isLogin ?? :: ', isLogin);
    }
  },[s]);

  const onLogout = () => {
    // sessionStorage 에 user_id 로 저장되어있는 아이템을 삭제한다.
      sessionStorage.removeItem('userNo');
      // App 으로 이동(새로고침)
      document.location.href = '/';
  };

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
          {isLogin ? (
            <>
          <Nav className="me-auto">
            <Nav.Link href="#">저작물 생성</Nav.Link>
            <Nav.Link href="#">저작물 배포</Nav.Link>
            <Nav.Link href="#">내 저작물</Nav.Link>
          </Nav>
          <Nav.Link href="/" onClick={onLogout}>로그아웃</Nav.Link>
          </>) : null }
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
