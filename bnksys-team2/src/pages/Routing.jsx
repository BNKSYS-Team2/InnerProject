import React, { useEffect, useState } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Header from '../components/Header';
import Login from './User/Login';
import Main from './User/Main';

export const Routing = () => {

  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if(sessionStorage.getItem('userNo') === null || sessionStorage.getItem('userNo') === 'undefined'){
    // sessionStorage 에 userNo 라는 key 값으로 저장된 값이 없다면
      console.log('isLogin ?? :: ', isLogin);
    } else {
    // sessionStorage 에 userNo 라는 key 값으로 저장된 값이 있다면
    // 로그인 상태 변경
      setIsLogin(true);
      console.log('isLogin ?? :: ', isLogin);
    }
  },[]);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
          {isLogin ? 
            // Main 컴포넌트 호출 시 isLogin 이라는 props 값을 전달
            <Route path="/main" element = {<Main isLogin={isLogin} />}/> : 
            <Route path="/" element={<Login />} />}
      </Routes>
    </BrowserRouter>
  );
};
