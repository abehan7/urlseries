import React from "react";
import { AiFillChrome } from "react-icons/ai";
import styled from "styled-components";

const ChromeInstallEl = styled.div`
  color: gray;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
`;
const Ment = styled.span`
  cursor: pointer;
  display: flex;
`;

const Icon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Text = styled.span``;

const Button = styled.button`
  width: 130px;
  height: 40px;
  color: #fff;
  border-radius: 5px;
  padding: 10px 25px;
  font-family: "Lato", sans-serif;
  font-weight: 500;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: flex;
  box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),
    7px 7px 20px 0px rgba(0, 0, 0, 0.1), 4px 4px 5px 0px rgba(0, 0, 0, 0.1);
  outline: none;

  /* 3 */
  background: rgb(0, 172, 238);
  background: linear-gradient(
    0deg,
    rgba(0, 172, 238, 1) 0%,
    rgba(2, 126, 251, 1) 100%
  );
  width: 130px;
  height: 40px;
  line-height: 42px;
  padding: 0;
  border: none;
  span {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
  }
  :before,
  :after {
    position: absolute;
    content: "";
    right: 0;
    top: 0;
    background: rgba(2, 126, 251, 1);
    transition: all 0.3s ease;
  }
  :before {
    height: 0%;
    width: 2px;
  }
  :after {
    width: 0%;
    height: 2px;
  }
  :hover {
    background: transparent;
    box-shadow: none;
  }
  :hover:before {
    height: 100%;
  }
  :hover:after {
    width: 100%;
  }
  span:hover {
    color: rgba(2, 126, 251, 1);
  }
  span:before,
  span:after {
    position: absolute;
    content: "";
    left: 0;
    bottom: 0;
    background: rgba(2, 126, 251, 1);
    transition: all 0.3s ease;
  }
  span:before {
    width: 2px;
    height: 0%;
  }
  span:after {
    width: 0%;
    height: 2px;
  }
  span:hover:before {
    height: 100%;
  }
  span:hover:after {
    width: 100%;
  }
`;

const chromeExtUrl =
  "https://chrome.google.com/webstore/detail/urlseries/dhiefdianjgmdlenlcfgbkmdddgbpnep?hl=ko";

const ChromeInstall = () => {
  const onClick = () => window.open(chromeExtUrl);
  return (
    <ChromeInstallEl>
      <Ment>크롬 확장 프로그램이 설치되어있는지 확인해주세요!</Ment>
      <Button onClick={onClick} className="custom-btn btn-3">
        <Icon>
          <AiFillChrome />
        </Icon>
        <Text>설치하러 가기</Text>
      </Button>
    </ChromeInstallEl>
  );
};

export default ChromeInstall;
