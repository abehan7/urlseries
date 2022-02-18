import React, { useContext } from "react";
import styled from "styled-components";
import Icon from "./styled/Icon.styled";
import { IoIosAdd, IoIosArrowBack } from "react-icons/io";
import { AiOutlineCheck, AiOutlineHeart } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import { TiDocumentDelete } from "react-icons/ti";
import { IoSearchOutline } from "react-icons/io5";
import { FolderContext } from "./FolderModalWindow";
import { BsFolderCheck } from "react-icons/bs";
import { useSelector } from "react-redux";
import {
  RiCheckboxMultipleBlankLine,
  RiCheckboxMultipleFill,
} from "react-icons/ri";

const UrlSearchedIcon = styled(Icon)``;

const UrlConfirmIcon = styled(Icon)``;

const OnlyFolderContentsIcon = styled(UrlConfirmIcon)``;

const IconWrapper = styled.div`
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
`;

const EditorContainerEl = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  width: 50px;
  height: 85%;
  border-radius: 10px;

  ${UrlSearchedIcon} {
    display: ${({ isUrlEditing }) => (isUrlEditing ? "flex" : "none")};
  }
  ${UrlConfirmIcon} {
    display: ${({ isFolderContents }) => (!isFolderContents ? "flex" : "none")};
  }

  ${OnlyFolderContentsIcon} {
    ${({ isOnlyFolderContents }) => {
      if (isOnlyFolderContents) {
        return `
      background: orange;
      color: #fff;
      box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
      `;
      }
    }};
  }
`;

const SearchIcon = styled(Icon)`
  ${({ clickedSearch }) => {
    if (clickedSearch) {
      return `
      background: orange;
      color: #fff;
      box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
      `;
    }
  }};
`;

const EditorContainer = () => {
  const {
    isFolderPage,
    setIsFolderPage,
    setClickedSearch,
    clickedSearch,
    filterdItems,
    handleAddItems,
    handleSetFolderItems,
    setIsConfirmed,
    setModalInfo,
    isUrlEditing,
    setIsUrlEditing,
    handleClickAllExcept,
    CheckChanges,
    handleRemoveItems,
    setIsOnlyFolderContents,
    isOnlyFolderContents,
    handleClickAddFolder,
    handleClickDisplaySearchIcon,
  } = useContext(FolderContext);

  const { isFolderContents } = useSelector((state) => state.folderConditions);
  const { items } = useSelector((state) => state.folderItems);

  // #FIXME: 검색하기
  const onClickSearch = () => {
    setClickedSearch((prev) => !prev);
  };

  return (
    <EditorContainerEl
      isUrlEditing={isUrlEditing}
      isFolderContents={isFolderContents}
      isOnlyFolderContents={isOnlyFolderContents}
    >
      <IconWrapper>
        {isFolderPage ? (
          <EditorFolder
            handleClickAddFolder={handleClickAddFolder}
            handleClickDisplaySearchIcon={handleClickDisplaySearchIcon}
            clickedSearch={clickedSearch}
          />
        ) : (
          <EditorUrls
            setIsFolderPage={setIsFolderPage}
            setClickedSearch={setClickedSearch}
            clickedSearch={clickedSearch}
            filterdItems={filterdItems}
            handleAddItems={handleAddItems}
            handleSetFolderItems={handleSetFolderItems}
            setIsConfirmed={setIsConfirmed}
            setModalInfo={setModalInfo}
            handleClickAllExcept={handleClickAllExcept}
            items={items}
            CheckChanges={CheckChanges}
            handleRemoveItems={handleRemoveItems}
            setIsOnlyFolderContents={setIsOnlyFolderContents}
          />
        )}
      </IconWrapper>
    </EditorContainerEl>
  );
};

const EditorFolder = ({
  handleClickAddFolder,
  clickedSearch,
  handleClickDisplaySearchIcon,
}) => {
  const onClickAddFolder = () => {
    handleClickAddFolder();
  };

  const onClickSearchIcon = () => {
    handleClickDisplaySearchIcon();
  };

  return (
    <>
      <Icon onClick={onClickAddFolder}>
        <IoIosAdd />
        {/* <폴더> 추가 */}
      </Icon>

      <SearchIcon onClick={onClickSearchIcon} clickedSearch={clickedSearch}>
        <IoSearchOutline />
        {/* <url>  검색 */}
      </SearchIcon>

      <Icon>
        <FiEdit2 />
        {/* 폴더 편집 */}
      </Icon>

      <Icon>
        <AiOutlineHeart />
        {/* <폴더> 좋아요  */}
      </Icon>

      <Icon>
        <TiDocumentDelete />
        {/* <폴더> 삭제 */}
      </Icon>
    </>
  );
};

const EditorUrls = ({
  setIsFolderPage,
  setClickedSearch,
  clickedSearch,
  filterdItems,
  handleAddItems,
  handleSetFolderItems,
  setIsConfirmed,
  setModalInfo,
  handleClickAllExcept,
  items,
  CheckChanges,
  handleRemoveItems,
  setIsOnlyFolderContents,
  onClickSearch,
}) => {
  const { isFolderContents } = useSelector((state) => state.folderConditions);

  // #FIXME: 뒤로가기
  // isFolderContents일때는 모달 안나오게 하고싶어
  const onClickBack = () => {
    // console.log("isFolderContents from back", isFolderContents);
    // console.log("CheckChanges from back");
    // 사용자가 뭐 하나라도 클릭안해서 item이 안바뀐경우
    const isContentsSame = CheckChanges();
    const fn = () => {
      setIsFolderPage(true);
      setClickedSearch(false);

      // url클릭하는 페이지인 경우
      // 뒤로가기 버튼을 누르면 모달이 나오는 것을 방지하기 위해
      !isFolderContents &&
        setModalInfo({
          message: "",
          type: "",
          handleClickConfirm: () => {},
          isOpen: false,
        });
    };

    // 폴더컨텐츠인 경우
    isFolderContents && fn();
    // 폴더 컨텐츠는 아닌데 모달 안나오게 하고 싶은 경우
    !isFolderContents && isContentsSame && fn();
    // url클릭하는 페이지인 경우
    // 뒤로가기 버튼을 누르면 모달이 나오는 것을 방지하기 위해
    !isFolderContents &&
      !isContentsSame &&
      setModalInfo({
        message: "변경을 취소하시겠습니까?",
        type: "click",
        handleClickConfirm: fn,
        isOpen: true,
      });
  };

  const onClickCheckAll = () => {
    const filterd = filterdItems.map((item) => {
      return item._id;
    });
    // 여기서 한 번 더 확인해야돼
    // items안에 있는건지 없는건지
    // 그래서 없으면 넣기

    const getOffDuplicated = filterd.filter((rowItem) => {
      return !items.includes(rowItem);
    });

    console.log("getOffDuplicated", getOffDuplicated);
    filterd.length === 0 && handleClickAllExcept();

    filterd.length !== 0 && handleAddItems(getOffDuplicated);
    // 이제 이거를 item 리덕스에 넣기
  };

  const onClickCheckAllOff = () => {
    const filterd = filterdItems.map((item) => {
      return item._id;
    });
    filterd.length === 0 && handleClickAllExcept();
    filterd.length !== 0 && handleRemoveItems(filterd);
  };

  const ShowNoticeAlert = () => {
    setModalInfo({
      message: "저장되었습니다 :)",
      type: "confirm",
      handleClickConfirm: () => {},
      isOpen: true,
    });

    setTimeout(() => {
      setModalInfo({
        message: "",
        type: "",
        handleClickConfirm: () => {},
        isOpen: false,
      });
    }, 1000);

    // return (
    //   <Alert
    //     message="선택한 항목을 삭제하시겠습니까?"
    //     description="삭제하면 복구할 수 없습니다."
    //     type="warning"
    //     showIcon
    //   />
    // );
  };

  // #FIXME: 확인하기
  const onClickConfirm = () => {
    const fn = () => {
      handleSetFolderItems();
      setIsConfirmed(true);
      ShowNoticeAlert();
    };

    setModalInfo({
      message: "변경사항을 저장하시겠습니까?",
      description: "변경하신 후에는 복구할 수 없습니다.",
      type: "click",
      handleClickConfirm: fn,
      isOpen: true,
    });
  };

  const onClickFolderContents = () => {
    setIsOnlyFolderContents((prev) => !prev);
  };

  return (
    <>
      <Icon onClick={onClickBack}>
        <IoIosArrowBack />
        {/* 뒤로가기 */}
      </Icon>
      <SearchIcon onClick={onClickSearch} clickedSearch={clickedSearch}>
        <IoSearchOutline />
        {/* <url>  검색 */}
      </SearchIcon>

      {/* <Icon> */}
      {/* <FiEdit2 /> */}
      {/* 폴더 편집 */}
      {/* </Icon> */}

      <UrlConfirmIcon onClick={onClickConfirm}>
        <AiOutlineCheck />
        {/* <url> 저장 확인하기 */}
      </UrlConfirmIcon>

      <OnlyFolderContentsIcon onClick={onClickFolderContents}>
        <BsFolderCheck />
        {/* 체크된 <url>만 보여주기 */}
      </OnlyFolderContentsIcon>

      {/* url선택하기 클릭하면 여기 나오게 하기 */}
      <UrlSearchedIcon onClick={onClickCheckAll}>
        <RiCheckboxMultipleFill />
        {/* <url> 전체선택 */}
      </UrlSearchedIcon>
      <UrlSearchedIcon onClick={onClickCheckAllOff}>
        <RiCheckboxMultipleBlankLine />
        {/* <url> 전체해제 */}
      </UrlSearchedIcon>
    </>
  );
};

export default EditorContainer;
