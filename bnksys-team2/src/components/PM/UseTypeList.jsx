import React, { useState, useEffect } from 'react';
import './UseTypeList.scss';
import * as Api from '../../api';
import Table from 'react-bootstrap/Table';

const UseTypeList = (props) => {
  const [useTypeList, setUeTypeList] = useState([]);


  useEffect(() => {
    getUseTypeData();
  }, []);
  
  // 용도타입 선택
  const getUseTypeData = async () => {
      const res = await Api.get('api/useType/list');
    setUeTypeList(res.data.useTypeList);
    };
  // 템플릿 선택

  const tableElementClick = (utNo) => {    
    props.setSelectedUseType(utNo);
  }

  return(
    <div className='pm container'>
      <h1>템플릿 사이즈 선택</h1>
        <Table striped="columns" id = 'useTypeTable' hover>
          <thead>
            <tr>
              <th>용도타입이름</th>
              <th>너비</th>
              <th>높이</th>
            </tr>
          </thead>          
          {useTypeList.map((useType, index) => {
            return (
              <tbody key={index} onClick={() => { tableElementClick(useType.utNo) }}>
                  <tr>
                    <td>{useType.utName}</td>
                    <td>{useType.width}</td>
                    <td>{useType.height}</td>
                  </tr>
                </tbody>
            );
          })}
        </Table>
      </div>
  );
};

export default UseTypeList;