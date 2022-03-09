import React from "react";
import styled from "styled-components";
import {
  HiOutlineDocumentAdd,
  HiOutlineDocumentRemove,
  HiOutlineFolderAdd,
} from "react-icons/hi";
import { CgEditBlackPoint, CgHashtag } from "react-icons/cg";
// import {} from "react-icons"

const SideBarEl = styled.div`
  @keyframes fadeInUp {
    0% {
      opacity: 0;
      transform: translateY(100%);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  height: 100%;
  width: 200px;
  background-color: #fff;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
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

const ImgWrapper = styled.div`
  border-bottom: 1px solid #e9ecef;
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

const SideBar = () => {
  return (
    <SideBarEl>
      <FaviconWrapper>
        <ImgWrapper>
          <Img src="img/logotest2.png" alt="logoImage" />
          <Ment>Welcome!</Ment>
        </ImgWrapper>
      </FaviconWrapper>
      <Item name="추가하기">
        <HiOutlineDocumentAdd />
      </Item>
      <Item name="삭제하기">
        <HiOutlineDocumentRemove />
      </Item>
      <Item name="수정하기">
        <CgEditBlackPoint />
      </Item>
      <TagWrapper>
        <Item name="해시태그설정">
          <CgHashtag />
        </Item>
      </TagWrapper>
      <TagWrapper>
        <Item name="폴더설정">
          <HiOutlineFolderAdd />
        </Item>
      </TagWrapper>
    </SideBarEl>
  );
};

const Item = ({ children, name }) => {
  return (
    <Button>
      <IconWrapper>
        <Icon>{children}</Icon>
      </IconWrapper>
      <TextWrapper>
        <Text>{name}</Text>
      </TextWrapper>
    </Button>
  );
};

export default SideBar;

//  Q space => git branch -a 탈출하는 방법
