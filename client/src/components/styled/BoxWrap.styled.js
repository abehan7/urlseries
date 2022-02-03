import styled from "styled-components";

const BoxWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 6px;
  overflow-y: auto;
  max-height: 200px;
  padding-top: 5px;
`;

export default BoxWrap;
