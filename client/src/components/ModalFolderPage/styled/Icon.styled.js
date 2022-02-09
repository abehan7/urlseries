import styled from "styled-components";

const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  border-radius: 10px;
  background-color: #fff;
  color: orange;

  cursor: pointer;
  transition: 300ms;
  :hover {
    background: orange;
    color: #fff;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
`;

export default Icon;
