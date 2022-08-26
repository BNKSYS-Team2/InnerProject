import React, { useState, useEffect } from 'react';
import './PMList.scss';
import * as Api from '../../api';
import swal from 'sweetalert';

import DeleteIcon from '@mui/icons-material/Delete';

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

  const deletePromotionMaterial = async (userNo, pmNo) => {
    window.confirm('삭제하시겠습니까?');
    const res = await Api.post('api/pm/delete', {
      userNo,
      pmNo,
    })
      .then((p) => {
        if (p.data.success == 'True') {
          swal('저작물 삭제 완료', '  ', 'success', {
            buttons: false,
            timer: 1200,
          });
          getImageData();
        } else {
          swal(p.data.msg, '  ', 'error', {
            buttons: false,
            timer: 1200,
          });
        }
      })
      .catch((error) => {
        swal('저작물 삭제 실패', '  ', 'success', {
          buttons: false,
          timer: 1200,
        });
      });
  };

  return (
    <>
      <div className="container pm">
        <h1>내 저작물 목록</h1>
        <div className="row">
          {/* 이미지 카드 */}
          {imageList.map((image, index) => {
            return (
              <div className="col-4 pmBox" key={index}>
                <div className="box">
                  <img
                    key={index}
                    src={`${Api.getServerUrl()}api/pm/load/${userNo}/${image.pmNo}`}
                    className="pmImg"
                    onClick={() => {
                      clickTemplate(image.pmNo, image.utNo);
                    }}></img>
                  <DeleteIcon
                    className="deleteImg"
                    onClick={() => deletePromotionMaterial(userNo, image.pmNo)}
                  />
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
