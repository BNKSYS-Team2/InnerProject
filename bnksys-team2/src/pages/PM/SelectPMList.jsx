import React, { useEffect, useState } from 'react';
import PMListModal from '../../components/PM/MyPMListModal.jsx';

const SelectPMList = (props) => {
  const [selClick, setSelClick] = useState(false);
  const [selImg, setSelImg] = useState(null);

  const { unit } = props;
  

  const imgUrl =
    'https://media.istockphoto.com/vectors/default-image-icon-vector-missing-picture-page-for-website-design-or-vector-id1357365823?k=20&m=1357365823&s=612x612&w=0&h=ZH0MQpeUoSHM3G2AWzc8KkGYRg4uP_kuu0Za8GFxdFc=';


  console.log(props.selPmNo);
  return (
    <div className="pmArea col" key={unit.id}>
      <div className={selClick ? 'distributeWrap' : null}></div>
      <p className="device">{unit.unitData.utName}</p>
      <div className="pmImg d-flex justify-content-center">
        <img src={selImg ? selImg : imgUrl} alt="" />
      </div>
      <button className="selBtn" onClick={() => setSelClick(true)}>
        저작물 선택
      </button>
      {selClick ? (
        <PMListModal setSelClick={setSelClick} unit={unit} setSelImg={setSelImg} setSelPmNo={props.setSelPmNo} selPmNo={props.selPmNo} />
      ) : null}
    </div>
  );
};

export default SelectPMList;