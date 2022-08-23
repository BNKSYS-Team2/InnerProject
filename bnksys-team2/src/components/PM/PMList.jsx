import react, { useState, useEffect } from 'react';
import './PMList.scss';
import * as Api from '../../api';

const PMList = () => {

  // const [data, setData] = useState(null);
  const userNo = sessionStorage.getItem('userNo');
  
  const abcd = useEffect(() => {
    getData();
   },[]);
   
   const getData = async() => {
    const res = await Api.get(`api/pm/list/${userNo}`);
    const pmNo = res.data.pmList[0].pmNo;
    const preview = `http://192.168.0.124:8080/api/pm/load/${userNo}/${pmNo}`;
    // await Api.get(`api/pm/load/${userNo}/${pmNo}`);

   };
   
  return (
    <>
    <div className = "container pm">
      <h1>내 저작물 목록</h1>
      <div className = "row">
        <div className="col-4 pmBox">
          <img src = {'http://192.168.0.124:8080/api/pm/load/6/7'} className = "pmImg"></img>
          <div className="pmTitle">고양이</div>
        </div>
        <div className="col-4 pmBox">
          <img src = {'http://192.168.0.124:8080/api/pm/load/6/7'} className = "pmImg"></img>
          <div className="pmTitle">제목</div>
        </div>
        <div className="col-4 pmBox">
          <img src = {'http://192.168.0.124:8080/api/pm/load/6/7'} className = "pmImg"></img>
          <div className="pmTitle">고양이</div>
        </div>
        <div className="col-4 pmBox">
          <img src = {'http://192.168.0.124:8080/api/pm/load/6/7'} className = "pmImg"></img>
          <div className="pmTitle">제목</div>
        </div>
        <div className="col-4 pmBox">
          <img src = {'http://192.168.0.124:8080/api/pm/load/6/7'} className = "pmImg"></img>
          <div className="pmTitle">고양이</div>
        </div>
        <div className="col-4 pmBox">
          <img src = {'http://192.168.0.124:8080/api/pm/load/6/7'} className = "pmImg"></img>
          <div className="pmTitle">제목</div>
        </div>
      </div>
    </div>
    </>
  );
};

export default PMList;
