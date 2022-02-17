import React, { useContext, useEffect, useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { FcFolder, FcOpenedFolder } from "react-icons/fc";
import { TiBackspaceOutline } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { actions } from "../../../store/reducers/FolderItems";
import { FolderContext } from "../FolderModalWindow";
import Container from "../styled/Container.styled";
import Icon from "../styled/Icon.styled";
import Title from "../styled/Title.styled";

const FolderTitle = styled(Title)`
  position: relative;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e5e5e5;
  padding-bottom: 0.5rem;
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
  grid-template-columns: repeat(4, auto);
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
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  column-gap: 0.7rem;

  visibility: ${(props) => (props.isSelected ? "visible" : "hidden")};
  opacity: ${(props) => (props.isSelected ? "1" : "0")};
  transition: 200ms;
`;

const IconEl = styled(Icon)``;

const FolderDisplay = ({ handleGetId }) => {
  const folders = useSelector((state) => state.folders.folders);
  const { selectedFolder, setSelectedFolder, setIsFolderPage } =
    useContext(FolderContext);

  const [isSelected, setIsSelected] = useState(false);

  // const folderItems = useSelector((state) => state.folderItems);

  const onClickFolder = (folder, e) => {
    if (folder?._id === selectedFolder?._id) {
      // click folder that is already selected
      setSelectedFolder();
    } else {
      // click folder that is not selected
      setSelectedFolder(folder);
    }
  };

  const onClickConfirm = () => {
    setIsFolderPage(false);
    handleGetId(selectedFolder.folderContents);
  };

  const onClickCancel = () => {
    setIsSelected(false);
    setSelectedFolder();
  };

  useEffect(() => {
    if (selectedFolder?._id === undefined) {
      setIsSelected(false);
    } else {
      setIsSelected(true);
    }
  }, [selectedFolder]);

  return (
    <FolderDisplayEl>
      <FolderTitle>
        전체폴더
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
      </FolderTitle>

      <ContentContainer>
        <FolderWrapper>
          {folders.map((folder) => {
            return (
              <Folder
                key={folder._id}
                folder={folder}
                selectedFolder={selectedFolder}
                onClick={onClickFolder}
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
    setIsOpen(selectedFolder?._id === folder._id);
  }, [selectedFolder]);
  return (
    <FolderEl
      key={folder._id}
      onClick={(e) => onClick(folder, e)}
      isOpen={isOpen}
    >
      {isOpen ? <FcOpenedFolder /> : <FcFolder />}
      <FolderName>{folder.folderName}</FolderName>
    </FolderEl>
  );
};

export default FolderDisplay;
