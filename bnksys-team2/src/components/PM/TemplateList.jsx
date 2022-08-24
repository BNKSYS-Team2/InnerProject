import React, { useState, useEffect } from 'react';
import './UseTypeList.scss';
import * as Api from '../../api';
import './TemplateList.scss';

const TemplateList = (props) => {
  const [templateList, setTemplateList] = useState([]);


  useEffect(() => {
    getTemplateData();
  }, [props.utNo]);
  
  // 템플릿 선택
  const getTemplateData = async () => {
      const res = await Api.get(`api/template/list/${props.utNo.utNo}`);
      setTemplateList(res.data.temList);
    };

  const clickTemplate = (temNo) => {
    console.log(temNo)
    if (temNo == null)
      window.location.href = '/create?w='+props.utNo.w+'&h='+props.utNo.h+'&utNo='+props.utNo.utNo;
    else
      window.location.href = '/create?w='+props.utNo.w+'&h='+props.utNo.h+'&utNo='+props.utNo.utNo+'&temNo='+temNo;
  }
  
  return(
    <div className='pm container'>
      <h1>템플릿 목록</h1>
      <div className="row">
        {/* 이미지 카드 */}
        {templateList.map((template, index) => {
            return (
              <div className="col-4 pmBox" key={index} onClick={() => { clickTemplate(template.temNo) }}>
              <img
                key = {index}
                src={`${Api.getServerUrl()}api/template/load/${template.temNo}`} className="pmImg"
              ></img>
              <p>{template.title}</p>
            </div>
            );
        })}
        <div className="col-4 pmBox" onClick={() => { clickTemplate(null) }}>
          <img
            src={`${Api.getServerUrl()}/templates/empty_${props.utNo.w}_${props.utNo.h}.svg`}
            className="pmImg"
            ></img>
            <p>빈 템플릿</p>
          </div>
      </div>
      </div>
  );
};

export default TemplateList;