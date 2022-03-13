import styled from "styled-components";

export const ItemConatiner = styled.div`
  @keyframes fadeIn {
    from {
      transform: translateX(-100%);
      opacity: 0;
    }
    to {
      transform: translateX(0%);
      opacity: 1;
    }
  }
  height: 90%;
  width: 90%;
  border-radius: 10px;
  background-color: #f7f8fa;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  /* background-color: #f5f5f5; */
`;
