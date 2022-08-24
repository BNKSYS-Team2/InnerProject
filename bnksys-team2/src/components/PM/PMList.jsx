import react, { useState, useEffect } from 'react';
import './PMList.scss';
import * as Api from '../../api';

const PMList = () => {
  const [imageList, setImageList] = useState([]);

  const userNo = sessionStorage.getItem('userNo');

  useEffect(() => {
    getImageData();
  }, []);

  const getImageData = async () => {
    const res = await Api.get(`api/pm/list/${userNo}`);
    setImageList(res.data.pmList);
  };

  return (
    <>
    <div className = "container pm">
      <h1>내 저작물 목록</h1>
      <div className="row">
          {/* 이미지 카드 */}
          {imageList.map((image, index) => {
            return (
              <div className = "col-4 pmBox" key = {index}>
                <img
                  key = {index}
                  src={`http://192.168.0.124:8080/api/pm/load/${userNo}/${image.pmNo}`} className="pmImg"
                ></img>
                <p>{image.pmTitle}</p>
              </div>
            );
          })}
      </div>
      </div>
    </>
  );
};

export default PMList;