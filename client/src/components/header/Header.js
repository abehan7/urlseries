import React from "react";
import styled from "styled-components";
import Colors from "../../Colors";
import { Fonts } from "../../Themes";
import SearchBox from "../searchBar/SearchBox";
import LoginSign from "./LoginSign";
import Profile from "./Profile";

const HeaderEl = styled.div`
  /* background: #211e24; */
  z-index: 3;
  position: sticky;
  top: 10px;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  grid-column: span 2;
  width: 100%;
  border-radius: 10px;

  @media (max-width: 870px) {
    grid-column: span 1;
  }
`;

const LeftItems = styled.div`
  display: flex;
  align-items: center;
  column-gap: 1.4rem;
`;
const Logo = styled.div`
  width: 40px;
  height: 40px;
  /* background: black; */
  border: 3px solid #fff;
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  border-radius: 10px;
`;

const UserId = styled.div`
  font-size: 1.1rem;
  ${Fonts.GowunBatang}
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

const Header = ({
  createModal2,
  recentSearched,
  setRecentSearch,
  realTotalUrls,
}) => {
  return (
    <HeaderEl>
      <LeftItems>
        <Logo>
          <LogoWrapper>ur</LogoWrapper>
        </Logo>
        {/* <UserId>hanjk123님 환영합니다</UserId> */}
      </LeftItems>
      <SearchBox
        createModal2={createModal2}
        recentSearched={recentSearched}
        setRecentSearch={setRecentSearch}
        realTotalUrls={realTotalUrls}
      />

      <LoginSign />
    </HeaderEl>
  );
};

export default Header;
