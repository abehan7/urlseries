import React from "react";
import styled from "styled-components";
import Container from "./styled/Container.styled";

const ChooseContainerEl = styled(Container)`
  height: calc((90% - 20px) / 2);
`;
const ChooseContainer = () => {
  return <ChooseContainerEl></ChooseContainerEl>;
};

export default ChooseContainer;
