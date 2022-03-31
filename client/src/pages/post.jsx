import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const PostEl = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Post = () => {
  const { id } = useParams();
  return <PostEl>{id} hi this is post</PostEl>;
};

export default Post;
