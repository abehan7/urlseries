import styled from "styled-components";
import { Title } from "../UrlContainer/styled/Title.styled";

const NoFolderEl = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  grid-column: span 3;
  grid-row: span 3;
`;

const NoFolderTitle = styled(Title)`
  align-items: center;
  justify-content: center;
`;

const NoFolder = () => {
  return (
    <NoFolderEl>
      <NoFolderTitle>아직 폴더가 없습니다.</NoFolderTitle>
    </NoFolderEl>
  );
};

export default NoFolder;
