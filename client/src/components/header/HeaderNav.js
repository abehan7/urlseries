import React from "react";
import styled from "styled-components";
import Colors from "../../Colors";
import SearchBox from "../searchBar/SearchBox";
import RightIcons from "../TopIcons/RightIcons";

const HeaderNavEl = styled.nav`
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 60px;
  background-color: #ffff;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  z-index: 3;
`;

const HeadWrapper = styled.div`
  display: flex;
  width: 79%;
`;
// const NavWrapper = styled.div``;
const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 1.7rem;
  flex: 1;
`;

const SearchBarEl = styled.div`
  display: flex;
  flex: 1;
  > .search-box {
    left: 0;
    padding: 0;
    height: 40px;
    input {
      border: 2px solid ${Colors.Background};
    }
  }
`;
const IconsWrapper = styled(Logo)`
  justify-content: flex-end;
`;
const IconContents = styled.div`
  font-size: 1.6rem;
  .right-icons div {
    border: none;
    color: black;
  }
`;

const HeaderNav = () => {
  return (
    <HeaderNavEl>
      <HeadWrapper>
        <Logo>ururl</Logo>
        <SearchBarEl>
          <SearchBox
            createModal2={() => {}}
            recentSearched={[]}
            setRecentSearch={[]}
            realTotalUrls={[]}
          />
        </SearchBarEl>
        <IconsWrapper>
          <IconContents>
            <RightIcons />
          </IconContents>
        </IconsWrapper>
      </HeadWrapper>
    </HeaderNavEl>
  );
};

export default HeaderNav;
