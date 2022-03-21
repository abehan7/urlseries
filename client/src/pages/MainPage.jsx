import { useEffect } from "react";
import "./MainPage.css";

// API
import styled from "styled-components";
import SideBar from "../components/SideBar/SideBar";
import UrlContainer from "../components/UrlContainer/UrlContainer";
import Modals from "../components/Modal/Modals";
import { constants, useMode } from "../contexts/ModeContext";
import { Toaster } from "react-hot-toast";
import AlertModal from "../components/AlertModal/AlertModal";
import { useSelector } from "react-redux";
import { getToken } from "../redux/ReducersT/tokenReducer";
import { addUrls } from "../components/Api";

const MainEl = styled.div`
  position: inherit;
  z-index: 1;
  height: calc(100vh - 100px);
  display: flex;
  /* max-width: 100%; */
`;

const modalWhiteList = [
  constants.SHARE,
  constants.ADD,
  constants.HASHTAG,
  constants.EDIT_MODAL_UP,
  constants.FOLDER_ADD,
  constants.FOLDER_EDIT_MODAL_UP,
];

const MainPage = () => {
  const modalMode = useMode().modalMode;
  const containerStyle = { top: 100 };
  const token = useSelector(getToken);
  // const bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

  useEffect(() => {
    const fn = async () => {
      const bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
      console.log("bookmarks from mainPage: ", bookmarks);
      //url 넣기
      bookmarks.length !== 0 && (await addUrls(bookmarks));
      //아이템 지우기
      localStorage.removeItem("bookmarks");
    };
    token && fn();
  }, [token]);

  return (
    <MainEl>
      {/* 사이드바 */}
      <SideBar />
      {/* 그리드 컨테이너 */}
      <UrlContainer />
      {/* 모달 */}
      {modalWhiteList.includes(modalMode) && <Modals modalMode={modalMode} />}
      {/* 토스트 */}
      <Toaster containerStyle={containerStyle} />
      {/* 얼럴트 모달 */}
      <AlertModal />
    </MainEl>
  );
};

export default MainPage;
