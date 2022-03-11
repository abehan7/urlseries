import styled from "styled-components";
import { Title } from "./styled/Title.styled";

const NoUrlEl = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NoUrlTitle = styled(Title)``;

const NoUrl = () => {
  return (
    <NoUrlEl>
      <NoUrlTitle>아직 북마크가 없습니다.</NoUrlTitle>
    </NoUrlEl>
  );
};

export default NoUrl;
