import React, { createContext, useState } from "react";
import { useEffect } from "react";
import { getAbort } from "../Api";
import "./AboutPage.css";
import PlayerModal from "./PlayerModal";

// 모달창 JS

const AboutPage = () => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      {openModal && <PlayerModal closeModal={setOpenModal} />}
      <>
        <div className="mainText">URurl About page</div>
        <div className="aboutMain">
          <div className="maindetail_one">
            <div className="text">
              원하는 <br></br> <b>URL</b>을 <br></br>추가하고 <br></br>
              검색하세요<br></br>
              <button
                className="playbutton"
                type="button"
                id="modal_btn"
                onClick={() => {
                  setOpenModal(true);
                }}
              >
                사용법 보기
              </button>
            </div>
            {/* <img className="slides" src="img/aboutsearch.gif" /> */}
            <img className="image" src="img/aboutImage.jpg" />
          </div>

          <div className="maindetail_two">
            <img className="image" src="img/abouthashtag.jpg" />
            {/* <div className="slides">페이지이미지</div> */}
            <div className="text">
              URL 마다 <br></br> <b>#해쉬태그</b>를 <br></br>
              설정하고 <br></br>
              <b>메모</b>를<br></br>작성할 수 있어요<br></br>
              <button className="playbutton" type="button" id="modal_btn">
                사용법 보기
              </button>
            </div>
          </div>

          <div className="maindetail_one">
            <div className="text">
              비슷한 카테고리의<br></br> URL 들은 <br></br>
              <b>폴더</b>로 <br></br>
              관리하세요<br></br>
              <button className="playbutton" type="button" id="modal_btn">
                사용법 보기
              </button>
            </div>
            {/* <div className="slides_m">
              1. # 버튼을 클릭<br></br>
              2. 슬라이드 우측으로 넘겨 폴더 생성<br></br>
              3. 폴더에서 슬라이드 우측으로 넘긴후 해쉬태그 추가<br></br>
            </div> */}
            <img className="image" src="img/aboutfolder.jpg" />
          </div>
          <div className="maindetail_two">
            <img className="image" src="img/aboutcomplete.jpg" />
            {/* <div className="slides">페이지이미지</div> */}
            <div className="text">
              <b>자동완성</b> <br></br>기능을 통해 <br></br>간편하게 <br></br>
              등록하세요<br></br>
              <button className="playbutton" type="button" id="modal_btn">
                사용법 보기
              </button>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default AboutPage;
