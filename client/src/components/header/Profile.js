import React from "react";
import styled from "styled-components";
import { HiOutlineUserCircle } from "react-icons/hi";
import { RiMapPinUserLine } from "react-icons/ri";

const ProfileEl = styled.div`
  display: flex;
  align-items: center;
  font-size: 2rem;
  cursor: pointer;
`;
const Profile = () => {
  return (
    <ProfileEl>
      <HiOutlineUserCircle />
    </ProfileEl>
  );
};

export default Profile;
