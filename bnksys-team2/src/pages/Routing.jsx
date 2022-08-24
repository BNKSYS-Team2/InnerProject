import React, { useState, useEffect } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Header from '../components/Header.jsx';
import MyPM from './PM/MyPM.jsx';
import Login from './User/Login.jsx';
import Distribute from './PM/DistributePM.jsx';
// import Create from './PM/CreatePM.tsx';

export const Routing = () => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (
      sessionStorage.getItem('userNo') === null ||
      sessionStorage.getItem('userNo') === 'undefined'
    ) {
      // sessionStorage 에 userNo 라는 key 값으로 저장된 값이 없다면
      console.log('isLogin ?? :: ', isLogin);
    } else {
      // sessionStorage 에 userNo 라는 key 값으로 저장된 값이 있다면
      // 로그인 상태 변경
      setIsLogin(true);
      console.log('isLogin ?? :: ', isLogin);
    }
  }, [isLogin]);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="mypm" element={<MyPM />} />
        <Route path="distribute" element={<Distribute />} />
        {/* <Route path="create" element={<Create />} /> */}
        {isLogin ? (
          // Main 컴포넌트 호출 시 isLogin 이라는 props 값을 전달
          <Route path="mypm" element={<MyPM />} />
        ) : (
          <Route path="/" element={<Login />} />
        )}
      </Routes>
    </BrowserRouter>
  );
};
