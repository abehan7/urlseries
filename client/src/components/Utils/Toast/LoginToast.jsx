import React from "react";
import styled from "styled-components";
import Loader from "../Loader/Loader";
const LoginToastEl = styled.div`
  display: ${(props) => (props.isOpen ? "flex" : "none")};
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
  justify-content: center;
  align-items: center;
  background-color: #fff;
  z-index: 200;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  padding: 0.5rem;
  gap: 0.5rem;
`;
const Text = styled.div`
  color: gray;
`;
const Icon = styled.div``;

const LoginToast = ({ isOpen = true }) => {
  return (
    <LoginToastEl isOpen={isOpen}>
      <Icon>
        <Loader radius="22px" />
      </Icon>
      <Text>로그인 중입니다</Text>
    </LoginToastEl>
  );
};

export default LoginToast;
