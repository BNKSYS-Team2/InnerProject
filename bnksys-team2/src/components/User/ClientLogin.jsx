import React, { useState, useEffect } from 'react';
import { Container, Col, Row, Form, Button, Modal, NavLink } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import * as Api from '../../api';

const ClientLogin = () => {
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [unit, setUnit] = useState('');

  const [companyList, setCompanyList] = useState([]);
  const [locationList, setLocationList] = useState([]);
  const [unitList, setUnitList] = useState([]);

  
  const navigate = useNavigate();

  
  // 은행 리스트 받아오기
  const getBank = () => {
    Api.get('api/client/company').then((res) => {
      let bankArr = res.data.company;
      setCompanyList(bankArr);
    });
  };

  // 지점 리스트 받아오기
  const getLocation = () => {
    Api.get(`api/client/location/${company}`)
      .then((res) => {
        let branchArr = res.data.loaction;
        setLocationList(branchArr);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 해상도 가져오기
  const getUnit = () => {
    Api.get(`api/client/unit/${company}/${location}`)
      .then((res) => {
        let unitArr = res.data.unit;
        // console.log('unitArr: ', unitArr);
        setUnitList(unitArr);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getBank();
  }, []);

  useEffect(() => {
    getLocation();
  }, [company]);

  useEffect(() => {
    getUnit();
  }, [location]);

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
              <Form.Select
                className="userInput"
                // type="text"
                autoComplete="on"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              >
                 <option>회사선택</option>
              {companyList.map((c,cidx) => {
                return (<option key={cidx}>{c}</option>);
              })}
                </Form.Select>
            </Form.Group>
            <br></br>
            <Form.Label>지점명</Form.Label>
            <Form.Group className="d-flex justify-content-center">
              <Form.Select
                className="userInput"
                // type="text"
                autoComplete="on"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                <option>지점선택</option>
                {locationList.map((l,lidx) => {
                return (<option key={lidx}>{l}</option>);
              })}
              </Form.Select>
            </Form.Group>
            <br></br>
            <Form.Label>단말기명</Form.Label>
            <Form.Group className="d-flex justify-content-center">
              <Form.Select
                className="userInput"
                // type="text"
                autoComplete="on"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
              >
                <option>단말기선택</option>
              {unitList.map((u,uidx) => {
              return (<option key={uidx}>{u.unit}</option>);
            })}
            </Form.Select>
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
