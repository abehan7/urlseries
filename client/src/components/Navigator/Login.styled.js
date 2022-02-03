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

  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;
  :hover {
    background-color: ${Colors.Background};
    transition: 200ms;
  }
`;

export default Login;
