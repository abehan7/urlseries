import React from "react";
import { AiFillChrome, AiOutlineCloudSync } from "react-icons/ai";
import { CgBackspace } from "react-icons/cg";
import { HiOutlineDocumentAdd } from "react-icons/hi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Footer from "../Footer/Footer";
import {
  FaviconContainer,
  FaviconWrapper,
  ImgWrapper,
  Item,
  Ment,
  SideBarEl,
  TapsWrapper,
} from "./SideBar";

const ChromeIconWrapper = styled.div`
  font-size: 2.3rem;
  color: gray;
`;

const ItemWrapper = styled.div``;

const ChromeExtensionSideBar = () => {
  const NormalModeTaps = () => <NormalModeItems />;
  return (
    <SideBarEl>
      <FaviconWrapper>
        <FaviconContainer>
          <ImgWrapper>
            <ChromeIconWrapper>
              <AiFillChrome />
            </ChromeIconWrapper>
            <Ment>chrome</Ment>
          </ImgWrapper>
        </FaviconContainer>
      </FaviconWrapper>

      {NormalModeTaps()}
      <Footer />
    </SideBarEl>
  );
};

const NormalModeItems = () => {
  const navigate = useNavigate();
  const onClickAdd = () => toast("아직 개발중입니다...", { icon: "🛑" });
  const onClickSync = () => toast("아직 개발중입니다...", { icon: "🛑" });
  return (
    <TapsWrapper>
      <Item name="뒤로가기" onClick={() => navigate("/")}>
        <CgBackspace />
      </Item>
      <Item name="추가하기" onClick={onClickAdd}>
        <HiOutlineDocumentAdd />
      </Item>
      <Item name="북마크 옮기기" onClick={onClickSync}>
        <AiOutlineCloudSync />
      </Item>
    </TapsWrapper>
  );
};

export default ChromeExtensionSideBar;
