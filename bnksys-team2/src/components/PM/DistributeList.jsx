import React from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

import './DistributeList.scss';

const DistributeList = () => {
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
            <th>배포취소</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>테스트 저작물1, 테스트 저작물2</td>
            <td>부산은행-범내골점-세로FHD</td>
            <td>홍길동</td>
            <td>2022-08-18-11:00 ~ 2022-08-18-12:00</td>
            <td>
              <button className="cancelBtn">취소</button>
            </td>
          </tr>
          <tr>
            <td>테스트 저작물1, 테스트 저작물2</td>
            <td>부산은행-범내골점-세로FHD</td>
            <td>홍길동</td>
            <td>2022-08-18-11:00 ~ 2022-08-18-12:00</td>
            <td>
              <button className="cancelBtn">취소</button>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default DistributeList;
