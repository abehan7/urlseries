import styled from "styled-components";
import { Title } from "./styled/Title.styled";

const GuestItemContainerEl = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const GuestItemContainer = ({ children }) => {
  return (
    <GuestItemContainerEl>
      <Title>{children}</Title>
    </GuestItemContainerEl>
  );
};

export default GuestItemContainer;
