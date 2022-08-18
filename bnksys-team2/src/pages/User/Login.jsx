import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

import * as Api from '../../api';
 
function Login() {
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');

    const isIdValid = id.length >= 3 || id.length <= 20;
    const isPwValid = pw.length >= 10 || pw.length <= 20;

    const isFormValid = isIdValid && isPwValid;
 
	// input data 의 변화가 있을 때마다 value 값을 변경해서 useState 해준다
    const handleid = (e) => {
      setId(e.target.value);
    };
 
    const handlepw = (e) => {
      setPw(e.target.value);
    };
 
	// login 버튼 클릭 이벤트
    const onClickLogin = () => {
        console.log('click login');
    };

    const handleSubmit = async (e) => {
      e.preventDefault(); 
      try {
        // 'user/login' 엔드포인트로 post요청함.
        const res = await Api.post('api/user/login', {
          id,
          pw,
        });
  
        // 기본 페이지로 이동함
        navigate('/', { replace: true });
        e.target.reset();
        handleClose(false);
        setId('');
        setPw('');
      } catch (err)
       {
         if(err.response){
          setId('');
          setPw('');
          e.target.reset();
          alert('로그인에 실패하였습니다.');
         }
      }
  
    };
  
 
    return(
        <div>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
            <h2>Login</h2>
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
                value={pw}
                onChange={(e) => setPw(e.target.value)}
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
        </div>
        
    );
}
 
export default Login;