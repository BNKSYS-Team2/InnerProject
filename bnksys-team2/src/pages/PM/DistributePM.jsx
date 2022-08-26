import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import './DistributePM.scss';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { setHours, setMinutes, getDay, getMinutes, addMonths } from 'date-fns';
import { ko } from 'date-fns/esm/locale';
import 'react-datepicker/dist/react-datepicker.css';
import PMListModal from '../../components/PM/MyPMListModal.jsx';
import SelectPMList from './SelectPMList.jsx';
import swal from 'sweetalert';

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
        // console.log('unitArr: ', unitArr);
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
    // console.log(unit.utNo);
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

  /* *********************select time********************* */
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [booked, setBooked] = useState([]);
  const [time, setTime] = useState([]);

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  // 시작 시간
  const [startTime, setStartTime] = useState(null);
  // 종료 시간
  const [endTime, setEndTime] = useState(null);
  // 시작 시간을 선택했는지
  const [isSelected, setIsSelected] = useState(false);

  // 시작 시간이 선택되면 해당 시간 적용 및 isSelected를 true, endTime을 null로
  const onSelect = (time) => {
    setStartTime(time);
    setIsSelected(true);
    setEndTime(null);
  };

  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };

  const [selPmNo, setSelPmNo] = useState([]);

  useEffect(() => {
    isBookable();
  }, [startDate]);

  // console.log('startDate', startDate);
  const isBookable = async () => {
    const startDateD = startDate.toISOString().substring(0, 8) + startDate.getDate().toString();
    const startDt =
      startDateD.substring(0, 4) + startDateD.substring(5, 7) + startDateD.substring(8, 10);
    const clientNo = [];
    for (let i = 0; i < distUnit.length; i++) {
      clientNo.push(String(distUnit[i].id));
    }
    console.log('startDt', startDt);
    console.log('clientNo', distUnit.id);
    const res = await Api.post('api/schedule/timeList', {
      startDt,
      clientNo,
    });
    setBooked(res.data.list);
  };

  const bookableFalse = [];
  for (var i in booked) {
    if (booked[i].bookable === false) {
      bookableFalse.push(booked[i].time);
    }
  }

  const excludeB = [];
  const excludeTimes = () => {
    for (let i = 0; i < bookableFalse.length; i++) {
      excludeB.push(setHours(setMinutes(new Date(), 0), bookableFalse[i]));
    }
  };
  excludeTimes();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const startDateD = startDate.toISOString().substring(0, 8) + startDate.getDate().toString();
      const endDateD = endDate.toISOString().substring(0, 8) + endDate.getDate().toString();
      const startTimeT = ('' + startTime).substring(16, 21);
      const endTimeT = ('' + endTime).substring(16, 21);
      const startDt =
        startDateD.substring(0, 4) +
        startDateD.substring(5, 7) +
        startDateD.substring(8, 10) +
        startTimeT.substring(0, 2);
      const endDt =
        endDateD.substring(0, 4) +
        endDateD.substring(5, 7) +
        endDateD.substring(8, 10) +
        endTimeT.substring(0, 2);

      console.log('startDt: ', startDt);

      const userNo = sessionStorage.getItem('userNo');

      const clientNo = [];
      for (let i = 0; i < distUnit.length; i++) {
        clientNo.push(String(distUnit[i].id));
      }

      const pmNo = selPmNo;

      const res = await Api.post('api/schedule/save', {
        pmNo,
        userNo,
        startDt,
        endDt,
        clientNo,
        pmNo,
      })
        .then(() => {
          swal('일정 등록 완료', '  ', 'success', {
            buttons: false,
            timer: 1000,
          });
          navigate('/mypm');
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      if (err.response) {
        setStartDate('');
        setEndDate('');
        setStartTime('');
        setEndTime('');
        setIsSelected('');
        e.target.reset();
        alert('선택에 실패하였습니다.');
      }
    }
  };

  return (
    <>
      {console.log(distUnit)}
      {/* <div className={selClick ? 'distributeWrap' : null}></div> */}
      {/* {selClick ? <PMListModal setSelClick={setSelClick} /> : null} */}
      <div className="distribute container">
        <h1>저작물 배포</h1>
        <Form onSubmit={handleSubmit}>
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
              {distUnit
                ? distUnit.map((unit) => (
                    <SelectPMList
                      key={unit.id}
                      unit={unit}
                      setSelPmNo={setSelPmNo}
                      selPmNo={selPmNo}
                    />
                  ))
                : null}
            </div>
          </div>
          {/* 예약 날짜 선택 */}
          <div className="row">
            {distUnit.length != 0 ? (
              <>
                <div className="label">예약 날짜 선택</div>
                <br></br>
                <div>
                  <DatePicker
                    filterTime={filterPassedTime}
                    selected={startDate}
                    onChange={onChange}
                    startDate={startDate}
                    endDate={endDate}
                    selectsRange
                    inline
                    showDisabledMonthNavigation
                    minDate={new Date()}
                    maxDate={addMonths(new Date(), 3)}
                  />
                </div>
                <div>
                  <DatePicker
                    selected={startTime}
                    onChange={onSelect}
                    locale={ko}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={60}
                    minTime={setHours(setMinutes(new Date(), 60), 9)}
                    maxTime={setHours(setMinutes(new Date(), 60), 17)}
                    timeCaption="Time"
                    dateFormat="aa h:mm 시작"
                    placeholderText="시작 시간"
                    className="mt-4"
                    excludeTimes={excludeB}
                  />
                </div>

                {isSelected ? ( // 시작 시간을 선택해야 종료 시간 선택 가능
                  <div>
                    <DatePicker
                      selected={endTime}
                      onChange={(time) => setEndTime(time)}
                      locale={ko}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={60}
                      minTime={startTime}
                      maxTime={setHours(setMinutes(new Date(), 60), 18)}
                      excludeTimes={[
                        // 시작 시간 제외
                        startTime,
                        // 오후 5:00 선택 기준 최대 오후 6:00까지 예외처리
                        setHours(setMinutes(new Date(), 0), 19),
                        excludeB,
                      ]}
                      timeCaption="Time"
                      dateFormat="aa h:mm 종료"
                      placeholderText="종료 시간"
                      className="mt-3"
                    />
                  </div>
                ) : null}
                <br></br>
                <Form.Group className="mt-3 text-center">
                  <div className="buttons">
                    <Button variant="primary" type="submit">
                      적용
                    </Button>
                    <Button>리셋</Button>
                  </div>
                </Form.Group>
              </>
            ) : null}
          </div>
        </Form>
      </div>
    </>
  );
};

export default DistributePM;
