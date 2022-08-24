import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import './DistributePM.scss';
import { useNavigate } from 'react-router-dom';
import PMListModal from '../../components/PM/MyPMListModal.jsx';
import SelectPMList from './SelectPMList.jsx';

import * as Api from '../../api';

const DistributePM = () => {
  const [selClick, setSelClick] = useState(false);
  const [bank, setBank] = useState([]);
  const [selBank, setSelBank] = useState(null);
  const [branch, setBranch] = useState([]);
  const [selBranch, setSelBranch] = useState('');
  const [unit, setUnit] = useState([]);
  const [selUnit, setSelUnit] = useState([]);

  const [distUnit, setDistUnit] = useState([]);

  const navigate = useNavigate();
  const imgUrl =
    'https://media.istockphoto.com/vectors/default-image-icon-vector-missing-picture-page-for-website-design-or-vector-id1357365823?k=20&m=1357365823&s=612x612&w=0&h=ZH0MQpeUoSHM3G2AWzc8KkGYRg4uP_kuu0Za8GFxdFc=';

  // 은행 리스트 받아오기
  const getBank = () => {
    Api.get('api/client/company').then((res) => {
      let bankArr = res.data.company;
      setBank(bankArr);
    });
  };

  // 지점 리스트 받아오기
  const getBranch = () => {
    Api.get(`api/client/location/${selBank}`)
      .then((res) => {
        let branchArr = res.data.loaction;
        setBranch(branchArr);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 해상도 가져오기
  const getUnit = () => {
    Api.get(`api/client/unit/${selBank}/${selBranch}`)
      .then((res) => {
        let unitArr = res.data.unit;
        console.log(unitArr);
        setUnit(unitArr);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const bankSelect = (e) => {
    setSelBank(e.target.value);
  };

  const branchSelect = (e) => {
    setSelBranch(e.target.value);
  };

  const unitCheck = (e, unit) => {
    let checked = e.target.checked;
    let value = e.target.value;
    let id = unit.clientNo;
    console.log(unit.utNo);
    if (checked) {
      const unitInfo = {
        id: id,
        unitData: unit.utNo,
      };
      setDistUnit(distUnit.concat(unitInfo));
    } else {
      setDistUnit(distUnit.filter((unit) => unit.id !== id));
    }
  };

  const selBtnClick = (unit) => {
    setSelClick(true);
    setSelUnit(unit);
  };

  useEffect(() => {
    getBank();
  }, []);

  useEffect(() => {
    getBranch();
  }, [selBank]);

  useEffect(() => {
    getUnit();
  }, [selBranch]);

  return (
    <>
      {console.log(distUnit)}
      {/* <div className={selClick ? 'distributeWrap' : null}></div> */}
      {/* {selClick ? <PMListModal setSelClick={setSelClick} /> : null} */}
      <div className="distribute container">
        <h1>저작물 배포</h1>
        {/* 은행, 지점 선택 */}
        <div className="placeSelect d-flex">
          <Form.Select aria-label="Default select example" onChange={bankSelect}>
            <option value="null">은행 선택</option>
            {bank.map((options, index) => (
              <option key={index} value={options}>
                {options}
              </option>
            ))}
          </Form.Select>
          <Form.Select aria-label="Default select example" onChange={branchSelect}>
            <option>지점 선택</option>
            {branch &&
              branch.map((options, index) => (
                <option key={index} value={options}>
                  {options}
                </option>
              ))}
          </Form.Select>
        </div>
        {/* 해상도 선택 */}
        <div className="label">해상도 선택</div>
        <div className="d-flex justify-content-center">
          <div className="checkboxWrap d-flex justify-content-center">
            {unit
              ? unit.map((unit) => (
                  <div className="checkDevice" key={unit.clientNo}>
                    <input
                      type="checkbox"
                      id={`check${unit.clientNo}`}
                      value={unit.utNo.utName}
                      onChange={(e) => {
                        unitCheck(e, unit);
                      }}
                    />
                    <label htmlFor={`check${unit.clientNo}`}></label>
                    <span>{unit.utNo.utName}</span>
                  </div>
                ))
              : null}
          </div>
        </div>
        {/* 선택 결과 문자열 표시 */}
        <div className="label">지점 단말기 목록</div>
        <div className="d-flex justify-content-center">
          <div className="deviceResult">
            {distUnit
              ? distUnit.map((unit) => (
                  <p key={unit.id}>
                    {selBank}-{selBranch}-{unit.unitData.utName}
                  </p>
                ))
              : null}
          </div>
        </div>
        {/* 저작물 선택 */}
        <div className="selectPM d-flex justify-content-center">
          <div className="row">
            {distUnit ? distUnit.map((unit) => <SelectPMList key={unit.id} unit={unit} />) : null}
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
