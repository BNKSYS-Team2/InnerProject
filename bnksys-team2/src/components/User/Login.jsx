import react, { useState, useEffect } from 'react';
import { Container, Col, Row, Form, Button, Modal, NavLink } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import * as Api from '../../api';

const Login = () => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const isIdValid = id.length >= 3 || id.length <= 20;
    const isPwValid = password.length >= 10 || password.length <= 20;

    const isFormValid = isIdValid && isPwValid;

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault(); 
        // 'user/login' 엔드포인트로 post요청함.
        const res = await Api.post('api/user/login', {
          id,
          password,
        }).then(res => {
          if(res.data.success=='True'){
            const user = res.data;
            const userNo = user.userNo;
            console.log(userNo);
            sessionStorage.setItem('userNo', userNo);
            navigate('/main');
            document.location.href = '/main';
            setId('');
            setPassword('');
          }else{
            setId('');
            setPassword('');
            e.target.reset();
            alert('로그인에 실패하였습니다.');
          }
        }).catch ((err)=>{
          console.log(err);
        });
  
      };

      return (
        <div>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
            <h2>Login</h2>
            <Row className="justify-content-md-center mt-5">
              <Col lg={8}>

            <Form onSubmit={handleSubmit}>
              <Form.Group>
              <Form.Label>아이디</Form.Label>
              <Form.Control
                type="id"
                autoComplete="on"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />

            {!isIdValid && (
                <Form.Text className="text-success">
                  아이디는 3자 이상 20자 이하로 입력해주세요.
                </Form.Text>
              )}

            </Form.Group>
            <br></br>
            <Form.Group>
            <Form.Label>비밀번호</Form.Label>
              <Form.Control
                type="password"
                autoComplete="on"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

            {!isPwValid && (
                <Form.Text className="text-success">
                  비밀번호는 10자 이상 20자 이하로 입력해주세요.
                </Form.Text>
              )}
            </Form.Group>
            <br></br>
            <Form.Group className="mt-3 text-center">
                <Button variant="primary" 
                type="submit"
                 disabled={!isFormValid}
                 style={{marginBottom: '30px'}}
                 >
                  로그인
                </Button>
            </Form.Group>

            </Form>
            </Col>
        </Row>

        </div>
      );
};

export default Login;