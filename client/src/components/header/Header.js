import React, { createContext, useState } from "react";
import styled from "styled-components";
import Colors from "../../Colors";
import { Fonts } from "../../Themes";
import SearchBox from "../searchBar/SearchBox";
import LoginSign from "./LoginSign";
import Profile from "./Profile";

const HeaderEl = styled.div`
  position: relative;
  /* background: #fff; */
  /* box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
    rgba(0, 0, 0, 0.06) 0px 0px 0px 1px; */

  z-index: 3;
  top: 10px;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  grid-column: span 2;
  width: 100%;
  height: 50px;
  border-radius: 10px;

  .search-box {
  }
  @media (max-width: 870px) {
    grid-column: span 1;
    column-gap: 1rem;
  }
`;

const LeftItems = styled.div`
  display: flex;
  align-items: center;
  padding-left: 1rem;
`;

const Logo = styled.div`
  width: 40px;
  height: 40px;
  /* background: black; */
  /* border: 3px solid #fff; */
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  border-radius: 10px;
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  font-size: 2rem;
  ${Fonts.BareunBatang}
`;

export const HeaderContext = createContext(null);

const Header = ({
  createModal2,
  recentSearched,
  setRecentSearch,
  realTotalUrls,
}) => {
  const [isSearchBarOn, setIsSearchBarOn] = useState(false);
  const initialState = { isSearchBarOn, setIsSearchBarOn };
  return (
    <HeaderContext.Provider value={initialState}>
      <HeaderEl>
        {/* <LeftItems> */}
        {/* <Logo>
          <LogoWrapper> </LogoWrapper>
        </Logo> */}
        {/* <UserId>hanjk123님 환영합니다</UserId> */}
        {/* </LeftItems> */}
        <SearchBox
          createModal2={createModal2}
          recentSearched={recentSearched}
          setRecentSearch={setRecentSearch}
          realTotalUrls={realTotalUrls}
        />
      </HeaderEl>
    </HeaderContext.Provider>
  );
};

export default Header;
