import React, { useContext, useEffect, useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { FcFolder, FcOpenedFolder } from "react-icons/fc";
import { TiBackspaceOutline } from "react-icons/ti";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { FolderContext } from "./FolderModalWindow";
import Container from "./styled/Container.styled";
import Icon from "./styled/Icon.styled";
import Input from "./styled/Input.styled";
import InputWrapper from "./styled/InputWrapper.styled";
import Title from "./styled/Title.styled";

const FolderHeader = styled(Title)`
  border-radius: 0;
  position: relative;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e5e5e5;
  padding-bottom: 0.5rem;
`;

const FolderTitle = styled.span`
  padding-left: 1rem;
  font-weight: 100;
`;

const FolderDisplayEl = styled(Container)`
  width: 500px;
  height: 85%;
`;
const ContentContainer = styled.div`
  padding-top: 1rem;

  flex: 1;
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  overflow-y: scroll;
`;

const FolderWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 80px);
  grid-template-rows: auto;
  align-items: center;
  justify-content: center;
  grid-gap: 1.4rem;
  padding-bottom: 1rem;
`;

const FolderEl = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  /* background-color: #e0e8e7; */
  border-radius: 10px;
  cursor: pointer;
  font-weight: 100;
  transition: 300ms;
  > svg {
    font-size: 1.5rem;
    flex: 1;
  }

  > span {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    max-width: 80px;
    overflow-wrap: break-word;
  }
  :hover {
    background: #ffefd5;
  }
  box-shadow: ${(props) =>
    props.isOpen ? "rgba(0, 0, 0, 0.16) 0px 1px 4px" : ""};
  background: ${(props) => (props.isOpen ? "#ffefd5" : "#fff")};
  transition: 300ms;
`;

const FolderName = styled.span`
  font-weight: 100;
  text-align: center;
  pointer-events: none;
  color: #6c757d;
`;

const IconContainer = styled.div`
  display: flex;
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  column-gap: 0.7rem;

  visibility: ${(props) => (props.isSelected ? "visible" : "hidden")};
  opacity: ${(props) => (props.isSelected ? "1" : "0")};
  transition: 200ms;
`;

const IconEl = styled(Icon)``;

const InputWrapperEl = styled(InputWrapper)`
  > input {
    font-weight: 100;
    border: none;
    ::placeholder {
      color: orange;
    }
  }
`;

const FolderDisplay = ({ handleGetId }) => {
  const folders = useSelector((state) => state.folders.folders);
  const {
    selectedFolder,
    setSelectedFolder,
    setIsFolderPage,
    setKeyword,
    keyword,
    clickedSearch,
    selectMode,
    setSelectMode,
    handleClickMultiFoldersConfirm,
  } = useContext(FolderContext);

  const [isSelected, setIsSelected] = useState(false);

  // const folderItems = useSelector((state) => state.folderItems);

  const onClickFolder = (folder) => {
    if (folder?._id === selectedFolder?._id) {
      // click folder that is already selected
      setSelectedFolder();
    } else {
      // click folder that is not selected
      setSelectedFolder(folder);
    }
  };

  const onClickMultipleFolders = (folder) => {
    if (selectMode.items.includes(folder._id)) {
      // click folder that is already selected

      const newItems = selectMode.items.filter((item) => item !== folder._id);
      setSelectMode({ ...selectMode, items: newItems });
    } else {
      // click folder that is not selected
      const newItems = [...selectMode.items, folder._id];
      setSelectMode({ ...selectMode, items: newItems });
    }

    // console.log(selectMode.items);
  };

  // FIXME: 우측 체크버튼 클릭 //folderModalWindow 373번줄 참조
  const onClickConfirm = () => {
    const SelectModeFn = () => {
      handleClickMultiFoldersConfirm();
    };
    const NormalModeFn = () => {
      setIsFolderPage(false);
      handleGetId(selectedFolder.folder_contents);
    };
    selectMode.status && SelectModeFn();
    !selectMode.status && NormalModeFn();
  };

  // FIXME: 우측 해제버튼 클릭
  const onClickCancel = () => {
    const SelectModeFn = () => {
      setSelectMode({ status: false, mode: "", items: [] });
    };
    const NormalModeFn = () => {
      setIsSelected(false);
      setSelectedFolder({});
    };

    selectMode.status && SelectModeFn();
    !selectMode.status && NormalModeFn();
  };

  // FIXME: 검색 onchange
  const onChange = (e) => {
    setKeyword(e.target.value);
  };

  // FIXME: selectedFolder 없으면 isSelected false되서 우측 체크 안보이게 됨
  useEffect(() => {
    if (selectedFolder?._id === undefined) {
      setIsSelected(false);
    } else {
      setIsSelected(true);
    }
  }, [selectedFolder]);

  // selectMode일때 item들 tracking하기
  useEffect(() => {
    // console.log("selectMode Items: ", selectMode.items);
  }, [selectMode]);

  // FIXME: 삭제나 좋아요 클릭하면 우측 체크 아이콘 보이게하기
  useEffect(() => {
    // console.log("selectMode.status: ", selectMode.status);
    selectMode.status && setIsSelected(true);
    !selectMode.status && setIsSelected(false);
  }, [selectMode, clickedSearch]);

  return (
    <FolderDisplayEl>
      <FolderHeader>
        {!clickedSearch && (
          <FolderTitle>
            {selectMode.status ? "폴더를 선택해주세요" : "전체폴더"}
          </FolderTitle>
        )}
        <IconContainer isSelected={isSelected}>
          <IconEl onClick={onClickCancel}>
            <TiBackspaceOutline />
            {/* 취소 */}
          </IconEl>
          <IconEl onClick={onClickConfirm}>
            <AiOutlineCheck />
            {/* 확인 */}
          </IconEl>
        </IconContainer>
        {clickedSearch && (
          <InputWrapperEl>
            <Input value={keyword} onChange={onChange} placeholder="search" />
          </InputWrapperEl>
        )}
      </FolderHeader>

      <ContentContainer>
        <FolderWrapper>
          {!selectMode.status &&
            folders.map((folder) => {
              return (
                <Folder
                  key={folder._id}
                  folder={folder}
                  selectedFolder={selectedFolder}
                  onClick={onClickFolder}
                />
              );
            })}

          {selectMode.status &&
            folders.map((folder) => {
              return (
                <MultiFolder
                  key={folder._id}
                  folder={folder}
                  selectedFolderId={selectMode.items}
                  onClick={onClickMultipleFolders}
                />
              );
            })}
        </FolderWrapper>
      </ContentContainer>
    </FolderDisplayEl>
  );
};

const Folder = ({ folder, selectedFolder, onClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const isSelected = selectedFolder?._id === folder._id;
    setIsOpen(isSelected);
  }, [selectedFolder]);
  return (
    <FolderEl key={folder._id} onClick={() => onClick(folder)} isOpen={isOpen}>
      {isOpen ? <FcOpenedFolder /> : <FcFolder />}
      <FolderName>{folder.folder_name}</FolderName>
    </FolderEl>
  );
};

const MultiFolder = ({ folder, selectedFolderId, onClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  // FIXME: folderWindow에서 해결해야할듯 329번줄

  // useEffect(() => {
  //   console.log("folder.like: ", folder.like);
  //   selectMode.mode === LIKE && folder.like && getLikeModeInit();
  //   selectMode.mode === DELETE && getItemsEmpty();
  // }, [selectMode.mode, selectMode.status]);

  useEffect(() => {
    const isSelected = selectedFolderId?.includes(folder._id);
    setIsOpen(isSelected);
  }, [selectedFolderId]);
  return (
    <FolderEl key={folder._id} onClick={() => onClick(folder)} isOpen={isOpen}>
      {isOpen ? <FcOpenedFolder /> : <FcFolder />}
      <FolderName>{folder.folder_name}</FolderName>
    </FolderEl>
  );
};

export default FolderDisplay;
