import React, { useContext, useState } from "react";
import "./AddUrlModal.css";
import { IoArrowBack } from "react-icons/io5";
import { PopupDisable } from "../../functions/stopScroll";
import { AddUrl, CrawlingAPI, StopAPI } from "../Api";
import styled from "styled-components";
import { debounce } from "lodash";
import { MainStates } from "../../routers/MainPage";

// FIXME: 여기서 문제점1
//        1. 디바운스 되면 모달 닫아도 글자가 남아있어
//           그거를 useState넣어서 수정해야 할 듯
//        2. 그리고 로그인창처럼 검색기록 나오는데 그거 없애야해
//           없앨려면 styled components사용해야 할 듯

const AddTextArea = styled.textarea`
  transition: 1s;
`;

const debounceCrawling = debounce(async ({ setUrlInfo, urlInfo, grabUrl }) => {
  // setUrlInfo({
  //   ...urlInfo,
  //   url: grabUrl,
  //   title: "잠시만 기다려주세요...",
  //   hashTag: "잠시만 기다려주세요...",
  // });

  const {
    data: { title, hashtags },
  } = await CrawlingAPI(grabUrl);

  console.log(hashtags);

  setUrlInfo({
    ...urlInfo,
    url: grabUrl,
    title: title,
    hashTag: hashtags.join(""),
  });
}, 1000);

// 리액트 컴포넌트 시작
const AddUrlModal = ({ setGetUrls, getUrls }) => {
  const InitialStates = {
    url: "",
    title: "",
    hashTag: "",
    memo: "",
  };

  // FIXME: useContext
  const { realTotalUrls, setRealTotalUrls } = useContext(MainStates);

  const [urlInfo, setUrlInfo] = useState(InitialStates);

  // FIXME: 해쉬태그 전처리
  const processdHashTag = () => {
    var totalHashes = [];
    var filterdHashes = [];
    totalHashes = urlInfo.hashTag.split("#");
    totalHashes.forEach((tag) => {
      if (tag.length !== 0) {
        filterdHashes.push("#" + tag.replace(/\s/g, ""));
        console.log("#" + tag);
      }
    });
    return filterdHashes;
  };

  const processdHashTagInputTrue = (hashTag) => {
    var totalHashes = [];
    var filterdHashes = [];
    totalHashes = hashTag.split("#");
    totalHashes.forEach((tag) => {
      if (tag.length !== 0) {
        filterdHashes.push("#" + tag.replace(/\s/g, ""));
        console.log("#" + tag);
      }
    });
    return filterdHashes;
  };

  // FIXME: add버튼
  const handleAddBtn = async () => {
    const filterdHashes = processdHashTag();

    document.querySelector(".addUrl-container").style.display = "none";
    PopupDisable();

    const { data } = await AddUrl(
      urlInfo.url,
      urlInfo.title,
      filterdHashes,
      urlInfo.memo
    );

    setRealTotalUrls([data, ...realTotalUrls]);
    setGetUrls([data, ...getUrls]);

    setUrlInfo(InitialStates);
  };

  // FIXME: useState변경
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUrlInfo({
      ...urlInfo,
      [name]: value,
    });
  };

  // FIXME: 크롤링
  const handleCrawling = async (e) => {
    const grabUrl = urlInfo.url;
    if (grabUrl.length > 5) {
      await debounceCrawling({ setUrlInfo, urlInfo, grabUrl });
    }
  };

  // FIXME: 모달 닫기
  const handleClose = () => {
    PopupDisable();
    document.querySelector(".addUrl-container").style.display = "none";
    setUrlInfo(InitialStates);
  };

  // FIXME: 자동완성

  // 해쉬태그 띄어쓰기 없애기
  const GetHashTagsProcessed = (tagList) => {
    const processedTags = tagList.map((tag) => {
      return tag.replace(" ", "");
    });
    return processedTags;
  };

  const handleAutoComplete = async (e) => {
    document.querySelector(".addUrl-container").style.display = "none";
    PopupDisable();

    const {
      data: { title, hashtags },
    } = await CrawlingAPI(urlInfo.url);

    console.log(hashtags);

    const { data } = await AddUrl(
      urlInfo.url,
      title,
      GetHashTagsProcessed(hashtags),
      urlInfo.memo
    );

    setRealTotalUrls([data, ...realTotalUrls]);
    setGetUrls([data, ...getUrls]);
    setUrlInfo(InitialStates);
  };

  // FIXME: 스타일
  const height = 37;
  const defaultHeight = {
    height: `${height}px`,
    transition: "1s",
  };

  return (
    <>
      <div id="modal" className="modal-overlay">
        <div
          className="modal-window"
          style={
            urlInfo.memo.length < 25
              ? { transition: "1s" }
              : { height: "410px", transition: "1s" }
          }
        >
          <div className="header-Container">
            <div className="close-area" onClick={handleClose}>
              <IoArrowBack />
            </div>
            <div className="title">
              <h2>URL추가</h2>
            </div>
          </div>

          <div className="content">
            <div className="put-url">
              <input
                autocomplete="off"
                name="url"
                style={defaultHeight}
                value={urlInfo.url}
                placeholder="URL을 추가해주세요"
                onChange={handleChange}

                // onChange={handleCrawling}
              />
            </div>
            <div className="put-title">
              <input
                autocomplete="off"
                name="title"
                value={urlInfo.title}
                style={defaultHeight}
                placeholder="제목을 추가해주세요"
                onChange={handleChange}
              />
            </div>
            <div className="put-hashTag">
              <input
                autocomplete="off"
                name="hashTag"
                value={urlInfo.hashTag}
                style={defaultHeight}
                placeholder="해쉬태그를 추가해주세요 #집밥 #인스타그램 #유튜브"
                onChange={handleChange}
              />
            </div>
            <div className="put-memo">
              <AddTextArea
                autocomplete="off"
                value={urlInfo.memo}
                name="memo"
                style={
                  urlInfo.memo.length < 25
                    ? { height: "37px" }
                    : { height: "160px" }
                }
                placeholder="메모할 내용을 입력해주세요"
                onChange={handleChange}
              />
            </div>
            <div className="addUrl-btn">
              <button style={{ height: "43px" }} onClick={handleAddBtn}>
                추가하기
              </button>
              {urlInfo.url.length !== 0 && (
                <button onClick={handleAutoComplete}>자동완성</button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddUrlModal;
