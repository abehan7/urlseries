import styled from "styled-components";
import Colors from "../../Colors";

const Login = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 3px solid #fff;
  background-color: #fff;
  color: ${Colors.Ash};
  border-radius: 10px;
  font-size: 1rem;
  padding: 0.3rem 0.6rem;
  :hover {
    background-color: ${Colors.Background};
    transition: 200ms;
  }
`;

export default Login;
