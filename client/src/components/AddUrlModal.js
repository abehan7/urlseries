import React from "react";
import "./AddUrlModal.css";
import { IoArrowBack } from "react-icons/io5";

const AddUrlModal = () => {
  return (
    <>
      <div id="modal" className="modal-overlay">
        <div className="modal-window">
          <div className="header-Container">
            <div
              className="close-area"
              onClick={() => {
                document.querySelector(".addUrl-container").style.display =
                  "none";
              }}
            >
              <IoArrowBack />
            </div>
            <div className="title">
              <h2>URL추가</h2>
            </div>
          </div>

          <div className="content">
            <div className="put-url">
              <input placeholder="URL을 추가해주세요" />
            </div>
            <div className="put-title">
              <input placeholder="제목을 추가해주세요" />
            </div>
            <div className="put-hashTag">
              <input placeholder="해쉬태그를 추가해주세요" />
            </div>
            <div className="addUrl-btn">
              <button>추가하기</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddUrlModal;
