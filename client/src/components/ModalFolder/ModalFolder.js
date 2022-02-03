import React, { createContext, useCallback, useRef, useState } from "react";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";

import styled from "styled-components";
import { PopupDisable } from "../../Hooks/stopScroll";
import { Page3Actions } from "../../store/reducers/editModalP3";
import ModalContent from "./ModalContent";
import ModalContentHashtag from "./ModalContentHashtag";
import ModalContentUrl from "./ModalContentUrl";

const ModalFolderEl = styled.div`
  .tagFolder-window {
    overflow: hidden;
  }

  .tagFolder-window > .folder-content {
    height: auto;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .header-Container {
    position: relative;
  }

  .hash-btns {
    position: absolute;
    display: flex;
    width: auto;
    height: auto;
    right: 15px;
    gap: 2px;
  }

  /* 아이콘 2개 */
  .editFolder-left-Icons div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1px;
    width: 42px;
    height: 42px;
    border-radius: 35%;
    cursor: pointer;
  }

  /* 위에 아이콘 3개 허버이벤트 */
  .editFolder-left-Icons div:hover,
  .editFolder:hover {
    background-color: rgba(0, 0, 0, 0.05);
    transition: 200ms;
  }

  /* 아이콘 3개 클릭하면 더 찐해지게 */
  .editFolder-left-Icons div:active,
  .editFolder:active {
    background-color: rgba(0, 0, 0, 0.1);
    transition: 200ms;
  }

  .editFolder-one-ment {
    font-size: 13px;
    pointer-events: none;
  }
  .editFolder-one-icon {
    pointer-events: none;
  }

  /* 오른쪽 한 개 */

  .editFolder {
    width: 39px;
    height: 39px;
  }

  .hash-btns > div {
    display: flex;
    align-items: center;
    justify-content: center;
    /* width: 32px; */
    border-radius: 35%;
  }

  .hash-btns svg {
    /* font-size: 20px; */
    padding-right: 5px;
    cursor: pointer;
    padding: 0;
  }

  .hash-btns > .editFolder {
    font-size: 25px;
  }
  .editFolder svg {
    border-radius: 35%;
  }

  .folder-content .tagFolder-grid {
    position: relative;
    display: grid;
    height: 100%;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: 100px;
  }

  .tagFolder-grid > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    cursor: pointer;
  }

  .tagFolder-grid .addItem {
    display: none;
  }

  .tempModal {
    position: absolute;
    cursor: default;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: grey;
    color: #fff;
    top: 0;
    width: 90%;
    left: 5%;
    border-radius: 6px;
  }

  .folder-clicked {
    color: #fbb917;
  }

  .tagFolder-grid .closed {
    display: none;
  }

  .tagFolder-grid .back {
    display: none;
    transition: 200ms;
  }
  .tagFolder-grid .open {
    display: flex;
    transition: 200ms;
  }

  .Page2GridItem,
  .addFolder-icon,
  .back {
    border-radius: 35%;
  }

  .Page2GridItem:hover,
  .addFolder-icon:hover,
  .back:hover {
    background-color: rgba(0, 0, 0, 0.03);
    transition: 200ms;
  }

  .Page2GridItem:active,
  .addFolder-icon:active,
  .back:active {
    background-color: rgba(0, 0, 0, 0.05);
    transition: 500ms;
  }

  .Page2GridItem:active {
    opacity: 1;
  }
  flex-direction: row;
  column-gap: 2rem;
`;

const Icon = styled.div`
  color: #fff;
  cursor: pointer;
  font-size: 3.4rem;
  display: flex;
`;

const BackIcon = styled(Icon)`
  visibility: ${(props) => (props.page > 1 ? "visible" : "hidden")};
`;
const ForwardIcon = styled(Icon)`
  visibility: ${(props) => (props.page < 3 ? "visible" : "hidden")};
`;

export const ModalFolderContents = createContext(null);

const ModalFolder = () => {
  const [DeleteM, setDeleteM] = useState(false);
  const [DList, setDList] = useState([]);
  const [LList, setLList] = useState([]);
  const [LikeM, setLikeM] = useState(false);
  const [page, setPage] = useState(1);

  const InitialStates = {
    DeleteM,
    DList,
    LList,
    LikeM,
    setDeleteM,
    setDList,
    setLList,
    setLikeM,
  };

  const outSideRef = useRef(null);

  const dispatch = useDispatch();
  const SetReduxNowFolder = (folder2) => {
    dispatch(Page3Actions.SetNowFolder(folder2));
  };

  // FIXME: handler
  const onClickClose = useCallback(() => {
    document.querySelector(".folderModal-container").style.display = "none";
    SetReduxNowFolder({});
    setPage(1);
    PopupDisable();
  }, []);

  const onClick = (e) => {
    if (e.target === outSideRef.current) {
      onClickClose();
    }
  };

  const onClickBack = () => {
    page > 1 && setPage((page) => page - 1);
  };
  const onClickForward = () => {
    page < 3 && setPage((page) => page + 1);
  };

  return (
    <ModalFolderContents.Provider value={InitialStates}>
      <ModalFolderEl
        id="modal"
        className="modal-overlay hash-overlay"
        ref={outSideRef}
        onClick={onClick}
      >
        <BackIcon page={page}>
          <IoChevronBackOutline onClick={onClickBack} />
        </BackIcon>
        {page === 1 && <ModalContent onClickClose={onClickClose} />}
        {page === 2 && <ModalContentUrl />}
        {page === 3 && <ModalContentHashtag />}
        <ForwardIcon page={page}>
          <IoChevronForwardOutline onClick={onClickForward} />
        </ForwardIcon>
      </ModalFolderEl>
    </ModalFolderContents.Provider>
  );
};

export default ModalFolder;
