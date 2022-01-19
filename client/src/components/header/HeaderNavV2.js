import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Colors from "../../Colors";
import { Fonts } from "../../Themes";
import SearchBox from "../searchBar/SearchBox";
import RightIcons from "../TopIcons/RightIcons";

const HeaderNavEl = styled.nav`
  opacity: ${(props) => (props.scrollFlag ? "1" : "0")};
  transform: translateY(${(props) => (props.scrollFlag ? "20" : "-100")}px);
  color: #fff;
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 40px;
  /* opacity: 0.8; */
  background-color: #211e24;
  border-radius: 10px;
  /* box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px; */
  transition: 400ms;
  z-index: 3;
  grid-column: span 2;
`;

const HeadWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
const LeftWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 820px;
  min-width: 820px;

  .right-icons {
    position: absolute;
    right: 10px;
    div {
    }
  }
`;

const Logo = styled.div`
  ${Fonts.Mongdol}
  /* font-family: "Cafe24Shiningstar"; */
  position: absolute;
  left: 1rem;
  display: flex;
  align-items: center;
  font-size: 2rem;
`;

const SearchBarEl = styled.div`
  display: flex;
  > .search-box {
    padding: 0;
    height: 30px;
    font-size: 1.3rem;
    color: #fff;
    svg {
      right: 0;
    }

    input {
      border: 2px solid ${Colors.Background};
    }
  }
`;
const IconsWrapper = styled(Logo)`
  position: static;
  width: 350px;
  justify-content: center;
`;
const IconContents = styled.div`
  font-size: 1.6rem;
  .right-icons div {
    border: none;
    color: black;
  }
`;

const HeaderNavV2 = ({ scrollFlag }) => {
  return (
    <HeaderNavEl scrollFlag={scrollFlag}>
      <HeadWrapper>
        <LeftWrapper>
          <Logo>it's ur url</Logo>
          <SearchBarEl>
            <SearchBox
              createModal2={() => {}}
              recentSearched={[]}
              setRecentSearch={[]}
              realTotalUrls={[]}
            />
          </SearchBarEl>
          <RightIcons />
        </LeftWrapper>
      </HeadWrapper>
    </HeaderNavEl>
  );
};

export default HeaderNavV2;
