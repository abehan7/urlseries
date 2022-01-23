import React, { createContext, useState } from "react";
import "./AboutPage.css";

const AboutPage = () => {
  return (
    <>
      <div className="mainText">URurl About page</div>
      <>
        <div className="aboutMain">
          <div className="maindetail_one">
            <div className="text">
              원하는 <br></br> <b>URL</b>을 <br></br>추가하고 <br></br>
              검색하세요
            </div>
            <div className="image">사진</div>
          </div>
          <div className="maindetail_two">
            <div className="image">사진</div>
            <div className="text">
              URL 마다 <br></br> <b>#해쉬태그</b>를 <br></br>
              설정하고 <br></br>
              <b>메모</b>를<br></br>작성할 수 있어요
            </div>
          </div>

          <div className="maindetail_one">
            <div className="text">
              비슷한 카테고리의<br></br> URL 들은 <br></br>
              <b>폴더</b>로 <br></br>
              관리하세요
            </div>
            <div className="image">사진</div>
          </div>
          <div className="maindetail_two">
            <div className="image">사진</div>
            <div className="text">
              <b>자동완성</b> <br></br>기능을 통해 <br></br>간편하게 <br></br>
              등록하세요
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default AboutPage;
