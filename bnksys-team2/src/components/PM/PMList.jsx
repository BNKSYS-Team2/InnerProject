import react, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PMList.scss';
import * as Api from '../../api';

const PMList = () => {

  const [data, setData] = useState({});
  const userNo = sessionStorage.getItem('userNo');
  
  useEffect(() => {
    Api.get(`/api/pm/list/${userNo}`).then((res) => {
      setData(res.data);
    });
  }, []);

  return (
    <div className="container pm">
      <h1>내 저작물 목록</h1>
      <div className="row">
        <div className="col-4 pmBox">
          <div className="pmImg">test</div>
          <div className="pmTitle">제목</div>
        </div>
        <div className="col-4 pmBox">
          <div className="pmImg">test</div>
          <div className="pmTitle">제목</div>
        </div>
        <div className="col-4 pmBox">
          <div className="pmImg">test</div>
          <div className="pmTitle">제목</div>
        </div>
        <div className="col-4 pmBox">
          <div className="pmImg">test</div>
          <div className="pmTitle">제목</div>
        </div>
        <div className="col-4 pmBox">
          <div className="pmImg">test</div>
          <div className="pmTitle">제목</div>
        </div>
        <div className="col-4 pmBox">
          <div className="pmImg">test</div>
          <div className="pmTitle">제목</div>
        </div>
      </div>
    </div>
  );
};

export default PMList;
