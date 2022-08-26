import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import * as Api from '../../api';
import swal from 'sweetalert';

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

  const deleteDistribute = async (psNo) => {
    const res = await Api.get(`api/schedule/delete/${psNo}`).then(() => {
      swal('배포 취소 완료', '  ', 'success', {
        buttons: false,
        timer: 1200,
      });
    });
    getDistributeData();
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
            <th>배포상태</th>
            <th>배포취소</th>
          </tr>
        </thead>

        {distributeList.map((distribute, index) => {
          return (
            <tbody key={index}>
              <tr>
                <td>
                  {distribute.promotionMaterials.map((pm, pmIndex) => {
                    return <p key={pmIndex}>{pm.pmTitle}</p>;
                  })}
                </td>
                <td>
                  {distribute.clients.map((client, clientIndex) => {
                    return (
                      <p key={clientIndex}>
                        {client.company}-{client.location}-{client.utNo.utName}
                      </p>
                    );
                  })}
                </td>
                <td>
                  {distribute.startDt.substring(0, 4)}-{distribute.startDt.substring(4, 6)}-
                  {distribute.startDt.substring(6, 8)}-{distribute.startDt.substring(8, 10)}:00 ~{' '}
                  {distribute.endDt.substring(0, 4)}-{distribute.endDt.substring(4, 6)}-
                  {distribute.endDt.substring(6, 8)}-{distribute.endDt.substring(8, 10)}:00
                </td>
                <td>{distribute.scheduleState}</td>
                <td>
                  <button
                    className="cancelBtn1"
                    onClick={() => {
                      deleteDistribute(distribute.psNo);
                    }}>
                    취소
                  </button>
                </td>
              </tr>
            </tbody>
          );
        })}
      </Table>
    </div>
  );
};

export default DistributeList;
