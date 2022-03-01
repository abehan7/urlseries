import React, { createContext, useState } from "react";
import styled from "styled-components";
import SearchBox from "../SearchBar/SearchBox";

const HeaderEl = styled.div`
  position: relative;
  /* background: #fff; */
  /* box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
    rgba(0, 0, 0, 0.06) 0px 0px 0px 1px; */
  z-index: 3;
  /* top: 10px; */
  /* margin-top: 10px; */
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
