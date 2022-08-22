import react, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PMList.scss';
import * as Api from '../../api';

const PMList = async () => {

  const [data, setData] = useState({});
  const userNo = sessionStorage.getItem('userNo');

  useEffect(() => {
    Api.get(`api/pm/list/${userNo}`).then((res) => {
      setData(res.data);
    });
  }, []);

  console.log(data);
  // const pmNo = data.pmList[0].pmNo;

  // const preview = await Api.get(`api/pm/load/${userNo}/${pmNo}`);
  // console.log('preview:', preview);
  // 이 부분만 수정하면 됨
  return (
    
    <p>{data.pmCount}</p>
  );
};

export default PMList;
