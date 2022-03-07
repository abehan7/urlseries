import React, { useContext, useEffect, useRef, useState } from "react";
import "./AddUrlModal.css";
import { IoArrowBack } from "react-icons/io5";
import { PopupDisable } from "../../Hooks/stopScroll";
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
  const overlayRef = useRef(null);
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
    const regex = / /gi;
    const processedTags = tagList.map((tag) => {
      return tag.replace(regex, "");
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

  // FIXME: 바깥쪽 클릭시 닫기 기능
  const onClickOutside = (e) => {
    e.target === overlayRef.current && handleClose();
  };

  // FIXME: 해쉬태그 전체
  useEffect(() => {}, [urlInfo]);

  // FIXME: 스타일
  const height = 37;
  const defaultHeight = {
    height: `${height}px`,
    transition: "1s",
  };

  return (
    <>
      <div
        id="modal"
        className="modal-overlay"
        ref={overlayRef}
        onMouseDown={onClickOutside}
      >
        <div
          className="modal-window"
          style={
            urlInfo.memo.length < 25
              ? { transition: "1s" }
              : { height: "405px", transition: "1s" }
          }
        >
          <div className="header-Container">
            <div className="close-area" onClick={handleClose}>
              <IoArrowBack color="gray" />
            </div>
            <div className="title">
              <h2>URL추가</h2>
            </div>
          </div>

          <div className="content">
            <div className="input-group">
              <input
                type="text"
                autoComplete="off"
                name="url"
                value={urlInfo.url}
                onChange={handleChange}
                id="URL"
                placeholder=" "
              />
              <label htmlFor="text1">URL</label>
            </div>

            <div className="input-group">
              <input
                type="text"
                autoComplete="off"
                name="title"
                value={urlInfo.title}
                placeholder=" "
                onChange={handleChange}
              />
              <label htmlFor="text2">TITLE</label>
            </div>

            <div className="input-group">
              <input
                type="text"
                autoComplete="off"
                name="hashTag"
                value={urlInfo.hashTag}
                placeholder=" "
                onChange={handleChange}
              />
              <label htmlFor="text2">#HASHTAG</label>
            </div>

            <div className="input-group">
              <input
                type="textarea"
                autoComplete="off"
                value={urlInfo.memo}
                name="memo"
                style={
                  urlInfo.memo.length < 25
                    ? {
                        height: "20px",
                        padding: "16px 24px",
                      }
                    : { height: "20px" }
                }
                placeholder=" "
                onChange={handleChange}
              />
              <label htmlFor="text2">MEMO</label>
            </div>

            <div className="addUrl-btn">
              <button style={{ height: "43px" }} onClick={handleAddBtn}>
                추가하기
              </button>
              {urlInfo.url.length !== 0 && (
                <button style={{ height: "43px" }} onClick={handleAutoComplete}>
                  자동완성
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddUrlModal;
