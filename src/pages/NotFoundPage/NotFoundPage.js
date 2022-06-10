import styled from "styled-components";
import { Link } from "react-router-dom";
import { ErrorBlock } from "../../component/Blocks";

const Root = styled.div`
  margin: 30px 0;
  height: 900px;
`;

const Container = styled.div`
  width: 45%;
  margin: 0 auto;
  padding: 50px 0px;
`;

const ErrorMessage = styled.div`
  font-weight: bold;
  font-size: 24px;
  text-align: center;
  justify-content: center;
  margin-top: 20px;
`;

const NavButtons = styled.div`
  display: flex;
  margin-top: 30px;
  justify-content: center;
  margin: 50px 10%;
  flex-wrap: wrap;
`;

const Nav = styled.div`
  display: flex;
  width: 35%;
  height: 50px;
  cursor: pointer;
  background: #50256c;
  color: white;
  border-radius: 3px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 18px;
  letter-spacing: 3px;
  font-weight: bold;
  border: none;
  text-decoration: none;
  margin: 40px 5% 30px 5%;

  :hover {
    background: #2348a0;
  }
`;

function NotFoundPage() {
  return (
    <Root>
      <Container>
        <ErrorBlock size="big">
          <ErrorMessage>頁面不存在，請嘗試其他頁面</ErrorMessage>
          <NavButtons>
            <Nav as={Link} to="/">
              首頁
            </Nav>
            <Nav as={Link} to="/About">
              中心概況
            </Nav>
            <Nav as={Link} to="/Posts/Research">
              研究觀點
            </Nav>
            <Nav as={Link} to="/Posts/Analysis">
              要文評析
            </Nav>
            <Nav as={Link} to="/Forums">
              公眾論壇
            </Nav>
            <Nav as={Link} to="/ContactUs">
              聯絡我們
            </Nav>
          </NavButtons>
        </ErrorBlock>
      </Container>
    </Root>
  );
}

export default NotFoundPage;
