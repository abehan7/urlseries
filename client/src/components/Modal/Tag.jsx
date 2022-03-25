import styled from "styled-components";

const Circle = styled.span`
  width: 23px;
  height: 23px;
  min-height: 23px;
  min-width: 23px;
  background-color: #6d27e8;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  transition: all 0.2s ease-in-out;
`;

const SelectedTag = styled.div`
  position: relative;
  background-color: #a597fe1a;
  max-width: 50%;
  width: fit-content;
  height: 22px;
  padding: 0.31rem;
  border-radius: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  color: #6d27e8;
  transition: all 0.2s ease-in-out;
  overflow: hidden;
  :hover {
    background-color: #ffcccb7a;
    ${Circle} {
      background-color: tomato;
    }
  }
`;
const TagName = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: fit-content;
  padding: 0 0.3rem;
`;
const Tag = ({ onClick, tag }) => {
  return (
    <SelectedTag onClick={() => onClick(tag)}>
      <Circle>{tag.slice(1, 2).toUpperCase()}</Circle>
      <TagName>{tag.slice(1, tag.length).toUpperCase()}</TagName>
    </SelectedTag>
  );
};

export default Tag;
