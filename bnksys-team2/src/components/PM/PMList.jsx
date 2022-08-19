import React from 'react';
import './PMList.scss';

const PMList = () => {
  return (
    <div className="container pm">
      <h1>내 저작물 목록</h1>
      <div className="row">
        <div className="col-4 pmBox">
          <div className="pmImg">test</div>
          <div className="pmTitle">제목</div>
        </div>
        <div className="col-4 pmBox">
          <div className="pmImg">test</div>
          <div className="pmTitle">제목</div>
        </div>
        <div className="col-4 pmBox">
          <div className="pmImg">test</div>
          <div className="pmTitle">제목</div>
        </div>
        <div className="col-4 pmBox">
          <div className="pmImg">test</div>
          <div className="pmTitle">제목</div>
        </div>
        <div className="col-4 pmBox">
          <div className="pmImg">test</div>
          <div className="pmTitle">제목</div>
        </div>
        <div className="col-4 pmBox">
          <div className="pmImg">test</div>
          <div className="pmTitle">제목</div>
        </div>
      </div>
    </div>
  );
};

export default PMList;
