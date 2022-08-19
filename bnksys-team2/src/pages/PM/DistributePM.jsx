import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import './DistributePM.scss';
import { useNavigate } from 'react-router-dom';

import PMListModal from '../../components/PM/MyPMListModal';

const DistributePM = () => {
  const [selClick, setSelClick] = useState(false);
  const navigate = useNavigate();
  const imgUrl =
    'https://media.istockphoto.com/vectors/default-image-icon-vector-missing-picture-page-for-website-design-or-vector-id1357365823?k=20&m=1357365823&s=612x612&w=0&h=ZH0MQpeUoSHM3G2AWzc8KkGYRg4uP_kuu0Za8GFxdFc=';

  return (
    <>
      <div className={selClick ? 'distributeWrap' : null}></div>
      {selClick ? <PMListModal setSelClick={setSelClick} /> : null}
      <div className="distribute container">
        <h1>저작물 배포</h1>
        {/* 은행, 지점 선택 */}
        <div className="placeSelect d-flex">
          <Form.Select aria-label="Default select example">
            <option>은행 선택</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select>
          <Form.Select aria-label="Default select example">
            <option>지점 선택</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select>
        </div>
        {/* 해상도 선택 */}
        <div className="d-flex justify-content-center">
          <div className="checkboxWrap d-flex justify-content-center">
            <div className="checkDevice">
              <input type="checkbox" id="check1" />
              <label htmlFor="check1"></label>
              <span>가로FHD</span>
            </div>
            <div className="checkDevice">
              <input type="checkbox" id="check2" />
              <label htmlFor="check2"></label>
              <span>세로FHD</span>
            </div>
          </div>
        </div>
        {/* 선택 결과 문자열 표시 */}
        <div className="d-flex justify-content-center">
          <div className="deviceResult"></div>
        </div>
        {/* 저작물 선택 */}
        <div className="selectPM d-flex justify-content-center">
          <div className="row">
            <div className="pmArea col">
              <p className="device">가로FHD</p>
              <div className="pmImg d-flex justify-content-center">
                <img src={imgUrl} alt="" />
              </div>
              <button className="selBtn" onClick={() => setSelClick(true)}>
                저작물 선택
              </button>
            </div>
            <div className="pmArea col">
              <p className="device">세로FHD</p>
              <div className="pmImg d-flex justify-content-center">
                <img src={imgUrl} alt="" />
              </div>
              <button className="selBtn">저작물 선택</button>
            </div>
          </div>
        </div>
        <div className="buttons">
          <button>적용</button>
          <button>리셋</button>
        </div>
      </div>
    </>
  );
};

export default DistributePM;
