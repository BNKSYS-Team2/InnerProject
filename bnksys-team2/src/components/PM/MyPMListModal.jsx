import React, { useState } from 'react';
import { useEffect } from 'react';
import './MyPMListModal.scss';
import * as Api from '../../api';

const MyPMListModal = (props) => {
  const [pmList, setPmList] = useState([]);

  const { unit } = props;
  const userNo = sessionStorage.getItem('userNo');

  const getUserPmList = () => {
    let utNo = unit.unitData.utNo;
    Api.get(`api/pm/list/${userNo}/${utNo}`)
      .then((res) => {
        let pmArr = res.data.pmList;
        console.log(pmArr);
        setPmList(pmArr);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const selectPm = (imgUrl) => {
    props.setSelImg(imgUrl);
    props.setSelClick(false);
  };

  useEffect(() => {
    getUserPmList();
  }, []);

  return (
    <div className="myPMListModal">
      {console.log(unit)}
      <p className="explain">저작물을 선택해주세요.</p>
      <div className="myPMSel">
        <ul className="d-flex justify-content-center">
          {pmList
            ? pmList.map((pm) => (
                <li className="myPM" key={pm.pmNo}>
                  <div
                    className="pmImg"
                    onClick={() =>
                      selectPm(`${Api.getServerUrl()}api/pm/load/${userNo}/${pm.pmNo}`)
                    }>
                    <img
                      src={`${Api.getServerUrl()}api/pm/load/${userNo}/${pm.pmNo}`}
                      alt=""
                    />
                  </div>
                  <p className="pmTitle">{pm.pmTitle}</p>
                </li>
              ))
            : null}
        </ul>
      </div>
      <div className="buttons">
        {/* <button>완료</button> */}
        <button onClick={() => props.setSelClick(false)}>취소</button>
      </div>
    </div>
  );
};

export default MyPMListModal;
