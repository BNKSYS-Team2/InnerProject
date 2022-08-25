import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import * as Api from '../../api';

import './DistributeList.scss';

const DistributeList = () => {

  const [distributeList, setDistributeList] = useState([]);

  const userNo = sessionStorage.getItem('userNo');

  useEffect(() => {
    getDistributeData();
  }, []);

  const getDistributeData = async () => {
    const res = await Api.get(`api/schedule/list/${userNo}`);
    setDistributeList(res.data.list);
  };

  return (
    <div className="container distribute">
      <h1>배포 현황</h1>
      <Table striped="columns">
        <thead>
          <tr>
            <th>저작물 제목</th>
            <th>배포지점</th>
            <th>배포일시</th>
            <th>배보상태</th>
            <th>배포취소</th>
          </tr>
        </thead>
        
          {distributeList.map((distribute, index) => {
              return(
                <tbody key = {index}>
                  <tr>
                    <td>
                      {distribute.promotionMaterials.map((pm, pmIndex) => {
                        return (<p key={ pmIndex}>{pm.pmTitle}</p>);
                      })}
                    </td>
                    <td>
                      {distribute.clients.map((client,clientIndex) => {
                        return(<p key={ clientIndex}>{client.company}-{client.location}-{client.utNo.utName}</p>)
                      }) }
                    </td>
                    <td>{distribute.startDt.substring(0, 4)}-{distribute.startDt.substring(4,6)}-{distribute.startDt.substring(6, 8)}-{distribute.startDt.substring(8, 10)}:00 ~ {distribute.endDt.substring(0, 4)}-{distribute.endDt.substring(4,6)}-{distribute.endDt.substring(6, 8)}-{distribute.endDt.substring(8, 10)}:00</td>
                    <td>{distribute.scheduleState}</td>
                    <td>
                      <button className="cancelBtn1">취소</button>
                    </td>
                  </tr>
                </tbody>
              );
            })}

        {/* <tbody>
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
        </tbody> */}
      </Table>
    </div>
  );
};

export default DistributeList;
