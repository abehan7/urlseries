import styled from "styled-components";
import { FooterBtn } from "./FooterBtn.styled";

export const ColoredFooterBtn = styled(FooterBtn)`
  background-color: #6d27e8;
  color: #fff;
  transition: 0.2s ease-in-out all;
  :active {
    background-color: #511ab2;
  }
`;
