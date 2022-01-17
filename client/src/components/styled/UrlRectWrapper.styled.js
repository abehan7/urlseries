import styled from "styled-components";

const UrlRectWrapper = styled.div`
  .hover-on {
    display: flex;
    opacity: 1;
  }
  transition: 100ms;
  &:hover {
    transform: translateY(-4px);
    z-index: 1;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 15px;
    transition: 100ms;
  }
`;

export default UrlRectWrapper;
