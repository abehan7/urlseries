import { useRef } from "react";
import styled from "styled-components";
import { useModal } from "../../contexts/ModalContext";
import { ModalContent } from "../Modal/styled/ModalContent.styled";

const ModalOverlay = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  display: ${(props) => (props.show ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const ModalWindow = styled(ModalContent)`
  width: 300px;
  height: 180px;
  overflow: hidden;
`;

const MsgContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: 200;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Button = styled.div`
  font-size: 1.1rem;
  border-top: 1px solid #e0e8e7;
  font-weight: 400;
  padding: 0.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  :active {
    background-color: #e9ecef;
  }
`;

const AlertModal = () => {
  const options = useModal().options;
  const ref = useRef(null);

  const onClickOutside = (e) => {
    if (ref.current.contains(e.target)) return;
    options.cancelFn();
  };

  const onClickConfirm = () => {
    options.confirmFn();
    options.cancelFn();
  };
  // console.log(options);

  return (
    <ModalOverlay show={options.isOpen} onClick={onClickOutside}>
      <ModalWindow ref={ref}>
        <MsgContainer>{options.message}</MsgContainer>
        <ButtonContainer>
          <Button onClick={onClickConfirm} style={{ color: "red" }}>
            {options?.topBtn || "확인"}
          </Button>
          <Button onClick={options.cancelFn}>
            {options?.bottomBtn || "취소"}
          </Button>
        </ButtonContainer>
      </ModalWindow>
    </ModalOverlay>
  );
};

export default AlertModal;
