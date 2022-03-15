import React from "react";
import styled from "styled-components";
import {
  HiOutlineDocumentAdd,
  HiOutlineDocumentRemove,
  HiOutlineFolder,
  HiOutlineFolderAdd,
  HiOutlineFolderRemove,
} from "react-icons/hi";
import { FcFolder } from "react-icons/fc";

import { CgBackspace, CgEditBlackPoint, CgHashtag } from "react-icons/cg";
import Footer from "../Footer/Footer.jsx";
import {
  constants,
  sidebarEditModeList,
  sidebarNormalModeList,
  useMode,
} from "../../contexts/ModeContext.jsx";
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from "react-icons/md";
import { useUrl } from "../../contexts/UrlContext.jsx";
import { useSelector } from "react-redux";
import { getToken } from "../../redux/ReducersT/tokenReducer.js";
import { useFolder } from "../../contexts/FolderContext.jsx";

// import {} from "react-icons"

const SideBarEl = styled.div`
  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: translateX(-50%);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  z-index: 2;
  height: 100%;
  width: 200px;
  background-color: #fff;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  display: flex;
  flex-direction: column;
`;

const Button = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background-color: #fff;
  color: #c4c4c4;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  position: relative;

  ::before {
    background-color: #fff;
    left: 0;
    content: "";
    height: 100%;
    width: 2px;
    position: absolute;
    transition: all 0.2s ease-in-out;
  }

  :hover {
    background-color: #a597fe1a;
    color: black;
    ::before {
      background-color: #a597fe;
    }
  }
`;

const IconWrapper = styled.div``;
const TextWrapper = styled.div``;
const Text = styled.span``;
const Icon = styled.div`
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 1rem;
  padding-right: 0.5rem;
`;

const TagWrapper = styled.div`
  padding-left: 2rem;
  position: relative;
  > div {
    ::before {
      transition: all 0.2s ease-in-out;
      background-color: #ddd;
      left: 0;
      content: "";
      height: 100%;
      width: 2px;
      position: absolute;
    }
  }
`;
const Img = styled.img`
  width: 40px;
  filter: drop-shadow(15px 5px 5px rgba(0, 0, 0, 0.5));
  padding-bottom: 0.5rem;
`;

const FaviconWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const FaviconContainer = styled.div`
  border-bottom: 1px solid #e9ecef;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70%;
`;

const ImgWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 0;

  width: 80%;
  height: 100%;
  flex-direction: column;
`;
const Ment = styled.span`
  font-size: 1.1rem;
  color: gray;
  padding-top: 0.3rem;
`;

const TapsWrapper = styled.div`
  animation: fadeIn 0.5s ease-in-out;
`;
const DeleteWrapper = styled(TapsWrapper)`
  > div:last-child {
    pointer-events: none;
  }
  > div:nth-child(2) {
    :hover {
      background-color: #ffcccb7a;
      ::before {
        background-color: tomato;
      }
    }
  }
`;

const NormalWrapper = styled.div`
  animation: ${({ count }) => (count === 1 ? "fadeIn 0.5s ease-in-out;" : "")};
  pointer-events: ${({ token }) => (token ? "auto" : "none")};
`;

const EditWrapper = styled(TapsWrapper)``;

const FolderWrapper = styled(TapsWrapper)`
  > div {
    :hover {
      background-color: #e6c7b675;
      ::before {
        background-color: #e6c7b6;
      }
    }
    ::before {
      transition: all 0.2s ease-in-out;
      left: 0;
      content: "";
      height: 100%;
      width: 2px;
      position: absolute;
    }
  }
`;

const FolderIcon = styled.div`
  font-size: 1.7rem;
`;

const SideBar = () => {
  const mode = useMode().mode;

  // const currentFolder = useFolder().currentFolder;
  const folderTitle = useFolder().currentFolder?.folder_name;

  // console.log(currentFolder);

  const NormalModeTaps = () =>
    sidebarNormalModeList.includes(mode) && <NormalModeItems />;

  const DeleteModeTaps = () => constants.DELETE === mode && <DeleteModeItems />;

  const EditModeTaps = () =>
    sidebarEditModeList.includes(mode) && <EditModeItems />;

  const FolderTaps = () => constants.FOLDER === mode && <FolderModeItems />;

  const FolderEditUrlTaps = () =>
    constants.FOLDER_EDIT_URL === mode && <FolderEditModeItems />;

  const folderIconList = [constants.FOLDER, constants.FOLDER_EDIT_URL];
  const FolderIconImg = () =>
    folderIconList.includes(mode) && (
      <FolderIcon>
        <FcFolder />
      </FolderIcon>
    );

  const FaviconImg = () =>
    !folderIconList.includes(mode) && (
      <Img src="img/logotest2.png" alt="logoImage" />
    );

  return (
    <SideBarEl>
      <FaviconWrapper>
        <FaviconContainer>
          <ImgWrapper>
            {FolderIconImg()}
            {FaviconImg()}
            <Ment>
              {constants.FOLDER === mode && "Folder"}
              {constants.FOLDER_EDIT_URL === mode && folderTitle}
              {!folderIconList.includes(mode) && "Welcome!"}
            </Ment>
          </ImgWrapper>
        </FaviconContainer>
      </FaviconWrapper>
      {/* 탭 맵핑 */}
      {NormalModeTaps()}
      {DeleteModeTaps()}
      {EditModeTaps()}
      {FolderTaps()}
      {FolderEditUrlTaps()}
      <Footer />
    </SideBarEl>
  );
};

export default SideBar;

//  Q space => git branch -a 탈출하는 방법

const Item = ({ children, name, onClick }) => {
  return (
    <Button onClick={onClick}>
      <IconWrapper>
        <Icon>{children}</Icon>
      </IconWrapper>
      <TextWrapper>
        <Text>{name}</Text>
      </TextWrapper>
    </Button>
  );
};

const NormalModeItems = () => {
  const setMode = useMode().setMode;
  const onClickAdd = () => setMode(constants.ADD);
  const onClickDelete = () => setMode(constants.DELETE);
  const onClickHashtag = () => setMode(constants.HASHTAG);
  const onClickEdit = () => setMode(constants.EDIT);
  const onClickFolder = () => setMode(constants.FOLDER);
  const sidebarAnimeCount = useMode().count.sidebarAnimeCount;
  const token = useSelector(getToken);

  return (
    <NormalWrapper token={token} count={sidebarAnimeCount}>
      <Item name="추가하기" onClick={onClickAdd}>
        <HiOutlineDocumentAdd />
      </Item>
      <Item name="삭제하기" onClick={onClickDelete}>
        <HiOutlineDocumentRemove />
      </Item>
      <Item name="수정하기" onClick={onClickEdit}>
        <CgEditBlackPoint />
      </Item>
      <TagWrapper onClick={onClickFolder}>
        <Item name="폴더설정">
          <HiOutlineFolder />
        </Item>
      </TagWrapper>

      <TagWrapper onClick={onClickHashtag}>
        <Item name="해시태그설정">
          <CgHashtag />
        </Item>
      </TagWrapper>
    </NormalWrapper>
  );
};

const DeleteModeItems = () => {
  const setMode = useMode().setMode;
  const filterdUrls = useUrl().url.filterdUrls;
  const handleAddDeleteUrlList = useUrl().handleAddDeleteUrlList;
  const handleResetDeleteUrl = useUrl().handleResetDeleteUrl;
  const totalUrls = useUrl().url.totalUrls;

  const onClickBack = () => setMode(constants.NORMAL);
  const onClickAll = () => {
    console.log(filterdUrls);
    // 검색 하나라도 했을 때만 실행
    filterdUrls.length !== 0 && handleAddDeleteUrlList(filterdUrls);
    // 검색도 안하고 태그도 클릭 안했을 때
    filterdUrls.length === 0 && handleAddDeleteUrlList(totalUrls);
  };
  const onUnClickAll = () => handleResetDeleteUrl();

  return (
    <DeleteWrapper>
      <Item name="뒤로가기" onClick={onClickBack}>
        <CgBackspace />
      </Item>
      <Item name="삭제하기">
        <HiOutlineDocumentRemove />
      </Item>
      <TagWrapper>
        <Item name="전체선택" onClick={onClickAll}>
          <MdRadioButtonChecked />
        </Item>
      </TagWrapper>

      <TagWrapper>
        <Item name="전체해제" onClick={onUnClickAll}>
          <MdRadioButtonUnchecked />
        </Item>
      </TagWrapper>
      <Item name=""></Item>
    </DeleteWrapper>
  );
};

const EditModeItems = () => {
  const setMode = useMode().setMode;

  const onClickBack = () => setMode(constants.NORMAL);

  return (
    <EditWrapper>
      <Item name="뒤로가기" onClick={onClickBack}>
        <CgBackspace />
      </Item>
    </EditWrapper>
  );
};

const FolderModeItems = () => {
  const setMode = useMode().setMode;

  const onClickBack = () => setMode(constants.NORMAL);
  const onClickEdit = () => {};

  return (
    <TapsWrapper>
      <Item name="뒤로가기" onClick={onClickBack}>
        <CgBackspace />
      </Item>
      <Item name="추가하기">
        <HiOutlineFolderAdd />
      </Item>
      <Item name="삭제하기">
        <HiOutlineFolderRemove />
      </Item>
      <Item name="수정하기">
        <CgEditBlackPoint />
      </Item>
    </TapsWrapper>
  );
};

const FolderEditModeItems = () => {
  const setMode = useMode().setMode;
  const handleAddFolderEditUrlList = useFolder().handleAddFolderEditUrlList;
  const handleResetFolderEditUrl = useFolder().handleResetFolderEditUrl;
  const filterdUrls = useUrl().url.filterdUrls;
  const totalUrls = useUrl().url.totalUrls;
  const onClickBack = () => setMode(constants.FOLDER);
  const onClickEdit = () => {};
  const onClickAll = () => {
    // console.log(filterdUrls);
    // 검색 하나라도 했을 때만 실행
    filterdUrls.length !== 0 && handleAddFolderEditUrlList(filterdUrls);
    // 검색도 안하고 태그도 클릭 안했을 때
    filterdUrls.length === 0 && handleAddFolderEditUrlList(totalUrls);
  };
  const onUnClickAll = () => handleResetFolderEditUrl();
  return (
    <TapsWrapper>
      <Item name="뒤로가기" onClick={onClickBack}>
        <CgBackspace />
      </Item>
      <Item name="수정하기" onClick={onClickEdit}>
        <CgEditBlackPoint />
      </Item>
      <TagWrapper>
        <Item name="전체선택" onClick={onClickAll}>
          <MdRadioButtonChecked />
        </Item>
      </TagWrapper>
      <TagWrapper>
        <Item name="전체해제" onClick={onUnClickAll}>
          <MdRadioButtonUnchecked />
        </Item>
      </TagWrapper>
    </TapsWrapper>
  );
};
