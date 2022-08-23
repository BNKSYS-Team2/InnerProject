import React from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';

import './DistributeList.scss';

const DistributeList = () => {
  const [change1, setChange1] = useState('취소 가능');
  const [change2, setChange2] = useState('취소 가능');
  const [change3, setChange3] = useState('취소 가능');

  const cancelCheck1 = () => {
    if(window.confirm('정말로 취소하시겠습니까?')){
      alert('취소가 완료되었습니다.');
      setChange1('취소 완료');
    }
  };
  const cancelCheck2 = () => {
    if(window.confirm('정말로 취소하시겠습니까?')){
      alert('취소가 완료되었습니다.');
      setChange2('취소 완료');
    }
  };
  const cancelCheck3 = () => {
    if(window.confirm('정말로 취소하시겠습니까?')){
      alert('취소가 완료되었습니다.');
      setChange3('취소 완료');
    }
  };

  const tobbleBtn1 = () => {
    const btn1 = document.getElementById('btn1');
    if(btn1.style.display !== 'none') {
      btn1.style.display = 'none';
    }
  };
  const tobbleBtn2 = () => {
    const btn2 = document.getElementById('btn2');
    if(btn2.style.display !== 'none') {
      btn2.style.display = 'none';
    }
  };
  const tobbleBtn3 = () => {
    const btn3 = document.getElementById('btn3');
    if(btn3.style.display !== 'none') {
      btn3.style.display = 'none';
    }
  };

  return (
    <div className="container distribute">
      <h1>배포 현황</h1>
      <Table striped="columns">
        <thead>
          <tr>
            <th>저작물 제목</th>
            <th>배포지점</th>
            <th>등록자</th>
            <th>배포일시</th>
            <th>취소여부</th>
            <th>배포취소</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>test, test2</td>
            <td>부산은행-범내골점-가로FHD</td>
            <td>홍길동</td>
            <td>2022-08-18-11:00 ~ 2022-08-18-12:00</td>
            <td>{change1}</td>
            <td>
              <button className="cancelBtn1" id='btn1' onClick ={ () => {
                cancelCheck1();
                tobbleBtn1();
              }}>취소</button>
            </td>
          </tr>
          <tr>
            <td>test</td>
            <td>부산은행-본점-세로FHD</td>
            <td>홍길동</td>
            <td>2022-08-23-11:00 ~ 2022-08-24-12:00</td>
            <td>{change2}</td>
            <td>
              <button className="cancelBtn2" id='btn2' onClick ={ () => {
                  cancelCheck2();
                  tobbleBtn2();
                }}>취소</button>
            </td>
          </tr>
          <tr>
            <td>test2</td>
            <td>부산은행-강서산단지점-세로FHD</td>
            <td>홍길동</td>
            <td>2022-08-24-13:00 ~ 2022-08-25-17:00</td>
            <td>{change3}</td>
            <td>
              <button className="cancelBtn3" id='btn3' onClick ={ () => {
                  cancelCheck3();
                  tobbleBtn3();
                }}>취소</button>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default DistributeList;
