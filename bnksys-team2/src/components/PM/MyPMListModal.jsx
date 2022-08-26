import React, { useState } from 'react';
import { useEffect } from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './MyPMListModal.scss';
import * as Api from '../../api';

const MyPMListModal = (props) => {
  const [pmList, setPmList] = useState([]);

  const { unit } = props;
  const userNo = sessionStorage.getItem('userNo');

  const imgUrl =
    'https://media.istockphoto.com/vectors/default-image-icon-vector-missing-picture-page-for-website-design-or-vector-id1357365823?k=20&m=1357365823&s=612x612&w=0&h=ZH0MQpeUoSHM3G2AWzc8KkGYRg4uP_kuu0Za8GFxdFc=';

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    pauseOnHover: false,
  };

  const getUserPmList = () => {
    let utNo = unit.unitData.utNo;
    Api.get(`api/pm/list/${userNo}/${utNo}`)
      .then((res) => {
        let pmArr = res.data.pmList;
        setPmList(pmArr);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const selectPm = (imgUrl, pmNo) => {
    props.selPmNo.push(pmNo);
    props.setSelImg(imgUrl);
    props.setSelClick(false);
    props.setSelPmNo(props.selPmNo);
  };

  useEffect(() => {
    getUserPmList();
  }, []);

  return (
    <div className="myPMListModal">
      {console.log(unit)}
      <p className="explain">저작물을 선택해주세요.</p>
      <div className="myPMSel">
        {pmList ? (
          <Slider {...settings}>
            {pmList.map((pm) => (
              <div className="myPM" key={pm.pmNo}>
                <div
                  className="pmImg"
                  onClick={() =>
                    selectPm(
                      `http://192.168.0.124:8080/api/pm/load/${userNo}/${pm.pmNo}`,
                      String(pm.pmNo),
                    )
                  }>
                  <img src={`http://192.168.0.124:8080/api/pm/load/${userNo}/${pm.pmNo}`} alt="" />
                </div>
                <p className="pmTitle">{pm.pmTitle}</p>
              </div>
            ))}
          </Slider>
        ) : null}
      </div>
      <div className="buttons">
        {/* <button>완료</button> */}
        <button onClick={() => props.setSelClick(false)}>취소</button>
      </div>
    </div>
  );
};

export default MyPMListModal;
