import React from "react";
import { IoArrowBack } from "react-icons/io5";
import styled from "styled-components";
import TagModalBar from "../searchBar/TagModalBar";
import "./HashTagModal.css";

const HashTagModal = ({}) => {
  const ModalContainer = styled.div``;
  const values = [
    "#안녕",
    "#일단",
    "#이건",
    "#예시",
    "#안녕",
    "#일단",
    "#이건",
    "#예시",
    "#안녕",
    "#일단",
    "#이건",
    "#예시",
    "#안녕",
    "#일단",
    "#이건",
    "#예시",
    "#안녕",
    "#일단",
    "#이건",
    "#예시",
    "#안녕",
    "#일단",
    "#이건",
    "#예시",
    "#안녕",
    "#일단",
    "#이건",
    "#예시",
    "#안녕",
    "#일단",
    "#이건",
    "#예시",
    "#안녕",
    "#일단",
    "#이건",
    "#예시",
    "#예시",
    "#안녕",
    "#일단",
    "#이건",
    "#예시",
    "#안녕",
    "#일단",
    "#이건",
    "#예시",
    "#안녕",
    "#일단",
    "#이건",
    "#예시",
    "#예시",
    "#안녕",
    "#일단",
    "#이건",
    "#예시",
    "#안녕",
    "#일단",
    "#이건",
    "#예시",
    "#안녕",
    "#일단",
    "#이건",
    "#예시",
    "#예시",
    "#안녕",
    "#일단",
    "#이건",
    "#예시",
    "#안녕",
    "#일단",
    "#이건",
    "#예시",
    "#안녕",
    "#일단",
    "#이건",
    "#예시",
  ];
  return (
    <>
      <div id="modal" className="modal-overlay">
        <div className="modal-window">
          <div className="header-Container HashTag-header-Container">
            <div
              className="close-area"
              onClick={() => {
                document.querySelector(
                  ".hashtagModal-container"
                ).style.display = "none";
              }}
            >
              <IoArrowBack />
            </div>
            <div className="title">
              <h2>HashTags</h2>
            </div>
          </div>
          <div className="searchTags-Container">
            <input className="tag-searchBar" />
          </div>
          <div className="content hashtag-content">
            <div className="flexWrapBox">
              {values.map((val) => {
                return <div className="oneHash">{val}</div>;
              })}
            </div>
            <div className="editHash-btn">
              <button onClick={() => {}}>수정하기</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HashTagModal;
