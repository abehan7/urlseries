import React, { useEffect, useState } from "react";
import "./EditUrlModal.css";
import { IoArrowBack } from "react-icons/io5";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useSelector } from "react-redux";
import TextArea from "../styled/TextArea.styled";
import { DeleteUrlAPI, EditUrlAPI } from "../Api";
import { PopupDisable } from "../../functions/stopScroll";
import modalCloseClickOutside from "../../functions/ModalCloseClickOutside";

const EditUrlModal = ({
  myFav,
  setMyFav,
  getUrls,
  setGetUrls,
  likedUrls,
  setLikedUrls,
  setMostClickedUrls,
  mostClickedUrls,
  realTotalUrls,
  setRealTotalUrls,
}) => {
  const [Memo, setMemo] = useState("");

  const { ClickedUrl } = useSelector((state) => state);
  useEffect(() => {
    console.log(ClickedUrl);
    setMemo(ClickedUrl.memo);
  }, [ClickedUrl]);

  // FIXME: 수정하기

  // 바뀐 state들 업데이트
  const setChnagedValues = (data) => {
    // 전체 수정에서 사용할 함수
    const setMethod = (setState, state) => {
      setState(
        state.map((val) => {
          return val._id === document.querySelector(".url_id").innerText
            ? data
            : val;
        })
      );
    };

    // getUrls,realTotalUrls,mostClickedUrls 업데이트
    for (const element of [
      [setGetUrls, getUrls],
      [setRealTotalUrls, realTotalUrls],
      [setMostClickedUrls, mostClickedUrls],
    ]) {
      setMethod(element[0], element[1]);
    }

    var likedUrls_id = likedUrls.map((val) => {
      return val._id;
    });

    console.log(likedUrls_id.includes(data._id));

    // 좋아요 업데이트
    if (data.url_likedUrl === 1 && !likedUrls_id.includes(data._id)) {
      console.log("setLikedUrls DONE");
      setLikedUrls([data, ...likedUrls]);
    } else {
      setMethod(setLikedUrls, likedUrls);
    }

    likedUrls.forEach((val) => {
      if (val._id === data._id && data.url_likedUrl === 0) {
        setLikedUrls(
          likedUrls.filter((val2) => {
            return val2 !== val;
          })
        );
      }
    });
  };

  // 해쉬태그 전처리
  const ProcessedHashtag = () => {
    var totalHashes = [];
    var filterdHashes = [];
    var hashTag = document.querySelector(
      ".editUrl-container .put-hashTag > input"
    ).value;

    totalHashes = hashTag.split("#");
    totalHashes.forEach((tag) => {
      if (tag.length !== 0) {
        filterdHashes.push("#" + tag.replace(/\s/g, ""));
      }
    });
    return filterdHashes;
  };

  // handler
  const handleEditBtn = async () => {
    const filterdHashes = ProcessedHashtag();
    var newLikedUrl = 0;

    if (myFav) {
      newLikedUrl = 1;
    }

    document.querySelector(".editUrl-container").style.display = "none";
    PopupDisable();

    const { data } = await EditUrlAPI({
      _id: document.querySelector(".url_id").innerText,
      newUrl: document.querySelector(".editUrl-container .put-url > input")
        .value,
      newTitle: document.querySelector(".editUrl-container .put-title > input")
        .value,
      newHashTags: filterdHashes,
      newMemo: document.querySelector(".editUrl-container .put-memo > textarea")
        .value,
      newLikedUrl: newLikedUrl,
    });

    setChnagedValues(data);
    console.log("업데이트 완료");
  };

  // FIXME: 삭제하기
  const handleDeleteBtn = async () => {
    const _id = document.querySelector(".url_id").innerText;
    document.querySelector(".editUrl-container").style.display = "none";
    PopupDisable();
    await DeleteUrlAPI(_id);

    const method = (state, setState) => {
      setState(
        state.filter((val) => {
          return val._id !== _id;
        })
      );
    };

    method(getUrls, setGetUrls);
    method(realTotalUrls, setRealTotalUrls);
  };

  // FIXME: 뒤로가기
  const handleClose = () => {
    document.querySelector(".editUrl-container").style.display = "none";
    PopupDisable();
  };

  const handleCloseOutside = (e) => {
    let isContained = modalCloseClickOutside(e);
    isContained && handleClose();
  };

  //FIXME: 좋아요 클릭
  const handleLike = () => {
    setMyFav(!myFav);
  };

  // FIXME: style

  const height = 37;
  const defaultHeight = {
    height: `${height}px`,
    transition: "1s",
  };
  return (
    <>
      <div id="modal" className="modal-overlay" onClick={handleCloseOutside}>
        <div
          className="modal-window"
          style={
            Memo.length < 25
              ? { transition: "1s" }
              : { height: "410px", transition: "1s" }
          }
        >
          <div className="header-Container">
            <div className="close-area" onClick={handleClose}>
              <IoArrowBack />
            </div>
            <div className="title">
              <h2>에디터모드</h2>
            </div>

            <div className="Myfav" onClick={handleLike}>
              {myFav ? <AiFillStar /> : <AiOutlineStar />}
            </div>
          </div>

          <div className="content">
            <div className="put-url">
              <input placeholder="URL을 추가해주세요" style={defaultHeight} />
            </div>
            <div className="put-title">
              <input placeholder="제목을 추가해주세요" style={defaultHeight} />
            </div>
            <div className="put-hashTag">
              <input
                placeholder="해쉬태그를 추가해주세요 #집밥 #인스타그램 #유튜브"
                style={defaultHeight}
              />
            </div>
            <div className="put-memo">
              <TextArea memo={Memo} setMemo={setMemo} />
            </div>
            <div className="addUrl-btn editUrl-btn">
              <button onClick={handleDeleteBtn}>삭제하기</button>
              <button onClick={handleEditBtn}>수정하기</button>
            </div>
          </div>
        </div>
      </div>
      <div className="urlInfoes">
        <div className="url_id"></div>
        <div className="url_likedUrl">0</div>
      </div>
    </>
  );
};

export default EditUrlModal;
