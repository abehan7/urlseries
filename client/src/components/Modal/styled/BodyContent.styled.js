import styled from "styled-components";

export const BodyContent = styled.div`
  @keyframes fadeInInput {
    from {
      transform: translateX(-100%);
      opacity: 0;
    }
    to {
      transform: translateX(0%);
      opacity: 1;
    }
  }
  @keyframes fadeOutInput {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0%);
      opacity: 1;
    }
  }

  font-size: 14px;
  color: #333;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  flex: 1;
  width: 85%;
`;
