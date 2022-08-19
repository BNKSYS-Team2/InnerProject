import React from 'react';
import './MyPMListModal.scss';

const MyPMListModal = (props) => {
  return (
    <div className="myPMListModal">
      {console.log(props)}
      <p className="explain">저작물을 선택해주세요.</p>
      <div className="myPMSel">
        <ul className="d-flex justify-content-center">
          <li className="myPM">
            <div className="pmImg"></div>
            <p className="pmTitle">제목</p>
          </li>
          <li className="myPM">
            <div className="pmImg"></div>
            <p className="pmTitle">제목</p>
          </li>
          <li className="myPM">
            <div className="pmImg"></div>
            <p className="pmTitle">제목</p>
          </li>
        </ul>
      </div>
      <div className="buttons">
        <button>완료</button>
        <button onClick={() => props.setSelClick(false)}>취소</button>
      </div>
    </div>
  );
};

export default MyPMListModal;
