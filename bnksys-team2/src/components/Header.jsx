import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './Header.scss';

import * as Api from '../api';

const Header = () => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (
      sessionStorage.getItem('userNo') === null ||
      sessionStorage.getItem('userNo') === 'undefined'
    ) {
      // sessionStorage 에 userNo 라는 key 값으로 저장된 값이 없다면
      setIsLogin(false);
    } else {
      // sessionStorage 에 userNo 라는 key 값으로 저장된 값이 있다면
      // 로그인 상태 변경
      setIsLogin(true);
    }
  });

  const onLogout = () => {
    // sessionStorage 에 user_id 로 저장되어있는 아이템을 삭제한다.
    sessionStorage.removeItem('userNo');
    // App 으로 이동(새로고침)
    document.location.href = '/';
  };

  const deleteUser = async () => {
    const userNo = sessionStorage.getItem('userNo');
    if (window.confirm('정말로 탈퇴하시겠습니까?')) {
      const res = await Api.post('api/user/delete', {
        userNo,
      })
        .then((res) => {
          sessionStorage.clear();
          alert('탈퇴가 완료되었습니다. 이용해주셔서 감사합니다.');
          window.location.href = '/';
        })
        .catch((error) => {
          alert('탈퇴에 실패하였습니다. 다시 시도해주세요.', error);
        });
    }
  };

  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand href="#home">LOGO</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {isLogin ? (
            <>
              <Nav className="me-auto">
                <Link to="/create" className="nav-link" style={{ color: 'white' }}>
                  저작물 생성
                </Link>
                <Link to="/distribute" className="nav-link" style={{ color: 'white' }}>
                  저작물 배포
                </Link>
                {/* <Nav.Link href="/mypm">내 저작물</Nav.Link> */}
                <Link to="/mypm" className="nav-link" style={{ color: 'white' }}>
                  내 저작물
                </Link>
              </Nav>
              <Nav.Link href="/" onClick={onLogout}>
                로그아웃
              </Nav.Link>
              <Nav.Link href="#" onClick={deleteUser}>
                회원 탈퇴
              </Nav.Link>
            </>
          ) : null}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
