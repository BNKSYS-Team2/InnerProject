import React, { useState, useEffect } from 'react';
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

  const clickTemplate = (pmNo, utNo) => {
    window.location.href =
      '/create?w=' + utNo.width + '&h=' + utNo.height + '&utNo=' + utNo.utNo + '&pmNo=' + pmNo;
  };

  return (
    <>
      <div className="container pm">
        <h1>내 저작물 목록</h1>
        <div className="row">
          {/* 이미지 카드 */}
          {imageList.map((image, index) => {
            return (
              <div
                className="col-4 pmBox"
                key={index}
                onClick={() => {
                  clickTemplate(image.pmNo, image.utNo);
                }}>
                <div className="box">
                  <img
                    key={index}
                    src={`${Api.getServerUrl()}api/pm/load/${userNo}/${image.pmNo}`}
                    className="pmImg"></img>
                </div>
                <div className="title">{image.pmTitle}</div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default PMList;
