import { RiArrowDropDownLine, RiMailLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import styled from "styled-components";

const MainFooter = styled.div`
  /* margin-top: 180px; */
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: column;
  height: calc(100% - 60px * 5 - 105.5px);
  width: 100%;
  background: transparent;
  color: rgb(3, 3, 3);
  flex: 1;
`;

const FooterContent = styled.div`
  display: flex;
  flex-direction: row;
`;

const FooterDetail = styled.div`
  position: relative;
  margin-left: 5px;
  > ul {
    position: absolute;
    display: flex;
    align-items: center;
    width: max-content;
    height: max-content;
    background: white;
    border: 2px solid gray;
    border-radius: 5px;
    opacity: 0;
    pointer-events: none;
    transform: translateY(-100px);
    transition: all 0.4s ease;
    padding: 7px;
  }
  > ul > p {
    color: gray;
    font-size: 13px;
  }
  > li {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  > button {
    background-color: #a7aaaa;
    color: white;
    padding: 5px;
    font-size: 8px;
    border: none;
    width: max-content;
    height: max-content;
    border-radius: 10px;
    text-align: center;
    padding-left: 10px;
    margin-top: 3px;
    cursor: pointer;
  }
  > button:focus + ul {
    opacity: 1;
    pointer-events: all;
    transform: translateY(-120px);
  }
  > button > a {
    color: white;
  }
`;

const CopyRight = styled.div`
  font-size: 10px;
  color: #ddd;
  text-align: left;
  padding: 1rem 0.4rem;
  padding-bottom: 0.4rem;
  align-self: flex-start;
`;

function Footer() {
  const thisYear = () => {
    const year = new Date().getFullYear();
    return year;
  };
  return (
    <MainFooter>
      <FooterContent>
        <FooterDetail>
          <button>
            Email
            <RiArrowDropDownLine />
          </button>
          <ul>
            <p>
              <RiMailLine />
              <br></br>
              urlseries5548@gmail.com
            </p>
          </ul>
        </FooterDetail>
        <FooterDetail>
          <button>
            <Link to="/userauth">
              개인정보 처리방침 <RiArrowDropDownLine />
            </Link>
          </button>
        </FooterDetail>
      </FooterContent>
      <CopyRight>
        Copyright &copy; <span>{thisYear()}</span> <br></br>urlseries. All
        rights reserved.
      </CopyRight>
    </MainFooter>
  );
}

export default Footer;
