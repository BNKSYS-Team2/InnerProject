import React, { useState, useEffect } from 'react';
import { Container, Col, Row, Form, Button, Modal, NavLink } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import * as Api from '../../api';

const ClientLogin = () => {
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [unit, setUnit] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await Api.post('api/client/login', {
      company,
      location,
      unit,
    })
      .then((res) => {
        console.log(res);
        if (res.data.success == 'True') {
          let clientNo = res.data.clientNo;
          sessionStorage.setItem('clientNo', clientNo);
          alert('로그인에 성공하였습니다.');
          document.location.href = '/digitalpicture';
        } else {
          alert('로그인에 실패하였습니다.');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container userLogin">
      <br></br>
      <br></br>
      <br></br>
      <h1>CLIENT LOGIN</h1>
      <Row className="justify-content-md-center mt-5">
        <Col lg={8}>
          <Form onSubmit={handleSubmit}>
            <Form.Label>회사명</Form.Label>
            <Form.Group className="d-flex justify-content-center">
              <Form.Control
                className="userInput"
                type="text"
                autoComplete="on"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </Form.Group>
            <br></br>
            <Form.Label>지점명</Form.Label>
            <Form.Group className="d-flex justify-content-center">
              <Form.Control
                className="userInput"
                type="text"
                autoComplete="on"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </Form.Group>
            <br></br>
            <Form.Label>단말기명</Form.Label>
            <Form.Group className="d-flex justify-content-center">
              <Form.Control
                className="userInput"
                type="text"
                autoComplete="on"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
              />
            </Form.Group>
            <br></br>
            <div className="loginMove" onClick={() => navigate('/')}>
              유저로 로그인
            </div>
            <Form.Group className="text-center">
              <Button
                variant="primary"
                type="submit"
                // disabled={!isFormValid}
                style={{ marginBottom: '30px' }}>
                로그인
              </Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default ClientLogin;
