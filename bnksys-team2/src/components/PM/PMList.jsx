import react, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PMList.scss';
import * as Api from '../../api';

const PMList = () => {

  const [data, setData] = useState({});
  const userNo = sessionStorage.getItem('userNo');

  useEffect(() => {
    Api.get(`api/pm/list/${userNo}`).then((res) => {
      setData(res.data);
    });
  }, []);

  console.log(data);

  // 이 부분만 수정하면 됨
  return (
    <div>
      <p>gddd</p>
      <span>{data}</span>
    </div>
  );
};

export default PMList;
