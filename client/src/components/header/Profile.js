import React from "react";
import styled from "styled-components";
import { TiUserOutline } from "react-icons/ti";

const ProfileEl = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.7rem;
  cursor: pointer;
  border: 3px solid #fff;
  border-radius: 20px;
`;
const Profile = () => {
  return (
    <ProfileEl>
      <TiUserOutline />
    </ProfileEl>
  );
};

export default Profile;
