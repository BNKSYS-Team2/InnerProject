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
  // 이 부분만 수정하면 됨
   
  return (
    <>
    <img src = {'http://192.168.0.124:8080/api/pm/load/6/7'}></img>
    <img src = {'http://192.168.0.124:8080/api/pm/load/6/7'}></img>
    </>
  );
};

export default PMList;
