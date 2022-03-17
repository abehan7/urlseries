import styled from "styled-components";
import { Title } from "../UrlContainer/styled/Title.styled";

const NoFolderEl = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NoFolderTitle = styled(Title)``;

const NoFolder = () => {
  return (
    <NoFolderEl>
      <NoFolderTitle>아직 폴더가 없습니다.</NoFolderTitle>
    </NoFolderEl>
  );
};

export default NoFolder;
