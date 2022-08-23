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
            <td>test, test2</td>
            <td>부산은행-범내골점-가로FHD</td>
            <td>홍길동</td>
            <td>2022-08-18-11:00 ~ 2022-08-18-12:00</td>
            <td>
              <button className="cancelBtn">취소</button>
            </td>
          </tr>
          <tr>
            <td>test</td>
            <td>부산은행-본점-세로FHD</td>
            <td>홍길동</td>
            <td>2022-08-23-11:00 ~ 2022-08-24-12:00</td>
            <td>
              <button className="cancelBtn">취소</button>
            </td>
          </tr>
          <tr>
            <td>test2</td>
            <td>부산은행-강서산단지점-세로FHD</td>
            <td>홍길동</td>
            <td>2022-08-24-13:00 ~ 2022-08-25-17:00</td>
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
