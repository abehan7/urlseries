import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const PostCardEl = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Content = styled.div`
  width: 100%;
  height: 350px;
  background: #fff;
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 4%) 0px 4px 16px 0px;
  transition: box-shadow 0.25s ease-in 0s, transform 0.25s ease-in 0s;
  margin: 1rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  :hover {
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    transform: translateY(-10px);
  }
`;
const PostCard = ({ id }) => {
  return (
    <Link to={`post/${id}`}>
      <PostCardEl>
        <Content></Content>
      </PostCardEl>
    </Link>
  );
};

export default PostCard;
