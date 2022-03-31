import React from "react";
import styled from "styled-components";
import PostCard from "../components/Cards/PostCard";
import { Link } from "react-router-dom";
const CommunityEl = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
`;
const GridContainer = styled.div`
  width: 90%;
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  width: 100%;
  justify-content: center;
  align-items: start;
`;

const TabWrap = styled.div`
  margin: 3rem 1rem;
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  font-size: 1.3rem;
  a {
    color: black;
    text-decoration: none;
    outline: none;
  }
`;

const Tab = styled.span`
  cursor: pointer;
  position: relative;
  padding: 0.6rem 1rem;

  ::before {
    content: "";
    position: absolute;
    bottom: -2px;
    transform: translateY(5px);
    left: 0;
    width: 100%;
    height: 3px;
    background: #e9ecef;
    transition: 300ms;
  }

  :hover::before {
    background: black;
  }
  /* :hover {
    border-bottom: 2px solid #00bcd4;
  } */
`;

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const Community = () => {
  return (
    <CommunityEl>
      <GridContainer>
        <TabWrap>
          <Link to="/community/popular ">
            <Tab>인기글</Tab>
          </Link>
          <Link to="/community/recent">
            <Tab>최신글</Tab>
          </Link>
        </TabWrap>
        <Grid>
          {cards.map((card) => (
            <PostCard key={card} id={card} />
          ))}
        </Grid>
      </GridContainer>
    </CommunityEl>
  );
};

export default Community;
