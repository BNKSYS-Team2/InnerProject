import React, { useState, useEffect } from 'react';
import './UseTypeList.scss';
import * as Api from '../../api';
import './TemplateList.scss';

const TemplateList = () => {
  const [templateList, setTemplateList] = useState([]);


  useEffect(() => {
    getTemplateData();
  }, []);
  
  // 용도타입 선택
  const getTemplateData = async () => {
      const res = await Api.get('api/template/allList');
      setTemplateList(res.data.temList);
    console.log(res.data);
    };
  // 템플릿 선택

  return(
    <div className='pm container'>
      <h1>템플릿 목록</h1>
      <div className="row">
        {/* 이미지 카드 */}
        {templateList.map((template, index) => {
            return (
              <div className = "col-4 pmBox" key = {index}>
              <img
                key = {index}
                src={`http://192.168.0.124:8080/api/template/load/${template.temNo}`} className="pmImg"
              ></img>
              <p>{template.title}</p>
            </div>
            );
          })}
      </div>
      </div>
  );
};

export default TemplateList;