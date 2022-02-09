import React from "react";
import styled from "styled-components";
import Container from "./styled/Container.styled";
import Title from "./styled/Title.styled";

const FolderTitle = styled(Title)``;

const FolderDisplayEl = styled(Container)`
  width: 500px;
`;
const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  overflow-y: scroll;
`;

const FolderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1.4rem;
`;

const Folder = styled.div`
  width: 80px;
  height: 80px;
  background-color: #e0e8e7;
  border-radius: 10px;
  cursor: pointer;
`;

const FolderDisplay = () => {
  const data = [
    "folder1",
    "folder2",
    "folder3",
    "folder4",
    "folder5",
    "folder6",
    "folder7",
    "folder8",
    "folder8",
    "folder8",
    "folder8",
    "folder8",
    "folder8",
  ];
  return (
    <FolderDisplayEl>
      <FolderTitle>전체폴더</FolderTitle>
      <ContentContainer>
        <FolderWrapper>
          {data.map((folder) => {
            return <Folder>{folder}</Folder>;
          })}
        </FolderWrapper>
      </ContentContainer>
    </FolderDisplayEl>
  );
};

export default FolderDisplay;
