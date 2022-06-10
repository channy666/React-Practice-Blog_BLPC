import styled from "styled-components";
import { useContext, useCallback, memo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import HeaderLogo from "../utils/images/BLPC_Logo_white.png";
import { AuthContext } from "../context";
import { setAuthToken } from "../utils/authorization";

const HeaderContainer = styled.div`
  margin-bottom: 8vh;
`;

const HeaderBanner = styled.div`
  background: linear-gradient(to right, #50256c, #2348a0);
  height: 240px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
  position: relative;

  img {
    height: 250px;
    width: auto;
    margin-left: 6%;
  }
`;

const SearchBar = styled.div`
  display: flex;
  align-self: end;
  border-radius: 5px;
  cursor: pointer;
  margin: 0px 3vw 30px 0px;
  background: #eeeeef;
`;

const Search = styled.input`
  height: 30px;
  width: 10vw;
  border-radius: 5px;
  background: #eeeeef;
  border: none;
  font-size: 16px;
`;

const SearchIcon = styled.div`
  height: 30px;
  width: 30px;
  position: relative;
  padding: 3px;
  box-sizing: border-box;

  :hover {
    div:first-child {
      border: 4px solid #50256c;
    }

    div:last-child {
      background: #50256c;
      height: 4px;
    }
  }
`;

const SearchIconHead = styled.div`
  background: none;
  height: 10px;
  width: 10px;
  border-radius: 50%;
  border: 3.5px solid #2348a0;
`;

const SearchIconBody = styled.div`
  height: 3.5px;
  width: 11px;
  transform: rotate(45deg);
  background: #2348a0;
  border-radius: 5px;
  margin-left: 12px;
`;

const SwitchLanguages = styled.div`
  display: flex;
  align-self: end;
  align-items: center;
  cursor: not-allowed;
  position: absolute;
  bottom: 12%;
  right: 4%;
  display: none;
`;

const Language = styled.div`
  display: flex;
  color: white;
  font-size: 14px;
  height: 20px;
  width: 45px;
  justify-content: center;
  align-items: start;

  :hover {
    text-decoration: underline;
  }
`;

const NavBar = styled.div`
  display: flex;
  height: 50px;
  width: 100%;
  background: #e8e5f8;
  justify-content: space-between;
  align-items: center;
`;

const NavBarSite = styled.div`
  display: flex;
  text-align: center;
  margin-left: 7%;
`;

const Nav = styled.div`
  color: #000000;
  font-size: 17px;
  font-weight: bold;
  width: 100px;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
  text-decoration: none;

  :hover {
    color: #861587;
  }

  ${(props) =>
    props.$active &&
    `
    color: #861587;
  `}
`;

const Navs = styled(Nav)`
  position: relative;

  :hover {
    color: black;
  }
`;

const NavPosts = styled.div`
  position: absolute;
  text-align: center;
  background: #e8e5f8;
  width: 100%;
  padding-top: 20px;
  display: flex;
  flex-direction: column;

  ${(props) =>
    !props.$show &&
    `
    display: none;
  `}
`;

const NavPost = styled.div`
  font-size: 16px;
  padding-bottom: 15px;
  text-decoration: none;
  color: black;

  :hover {
    color: #861587;
  }

  ${(props) =>
    props.$active &&
    `
    color: #861587;
  `}
`;

const NavBarUser = styled(NavBarSite)`
  margin-right: 1%;
`;

function Header() {
  const location = useLocation();
  const { user, setUser, isConfirmingUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showNavPosts, setShowNavPosts] = useState(false);
  const [searchBarValue, setSearchBarValue] = useState("");

  const handleLogOut = useCallback(() => {
    setAuthToken("");
    setUser(null);
    navigate("/");
  }, []);

  const handleMouseEnterNavPosts = useCallback(() => {
    setShowNavPosts(true);
  }, []);

  const handleMouseLeaveNavPosts = useCallback(() => {
    setShowNavPosts(false);
  }, []);

  const handleSearchBarChange = useCallback((e) => {
    setSearchBarValue(e.target.value);
  }, []);

  const handleSearchBarSubmit = useCallback(() => {
    if (!searchBarValue) return;
    navigate(`/Search/${searchBarValue}`);
    setSearchBarValue("");
  }, [searchBarValue]);

  return (
    <HeaderContainer>
      <HeaderBanner>
        <img src={HeaderLogo} alt="Logo" />
        <SearchBar>
          <Search value={searchBarValue} onChange={handleSearchBarChange} />
          <SearchIcon onClick={handleSearchBarSubmit}>
            <SearchIconHead />
            <SearchIconBody />
          </SearchIcon>
        </SearchBar>
      </HeaderBanner>
      <NavBar>
        <NavBarSite>
          <Nav $active={location.pathname === "/"} as={Link} to="/">
            首頁
          </Nav>
          <Nav $active={location.pathname === "/About"} as={Link} to="/About">
            中心概況
          </Nav>
          <Navs
            $active={
              location.pathname === "/Posts/Research" ||
              location.pathname === "/Posts/Analysis" ||
              location.pathname.includes("/Post")
            }
            onMouseEnter={handleMouseEnterNavPosts}
            onMouseLeave={handleMouseLeaveNavPosts}
          >
            研究成果
            <NavPosts $show={showNavPosts}>
              <NavPost
                as={Link}
                to="/Posts/Research"
                $active={location.pathname === "/Posts/Research"}
              >
                研究觀點
              </NavPost>
              <NavPost
                as={Link}
                to="/Posts/Analysis"
                $active={location.pathname === "/Posts/Analysis"}
              >
                要文評析
              </NavPost>
            </NavPosts>
          </Navs>
          <Nav
            $active={
              location.pathname === "/Conferences" ||
              location.pathname.includes("/Conference")
            }
            as={Link}
            to="/Conferences"
          >
            講座會議
          </Nav>
          <Nav
            $active={
              location.pathname === "/Forums" ||
              location.pathname.includes("/Forum")
            }
            as={Link}
            to="/Forums"
          >
            公眾論壇
          </Nav>
          <Nav
            $active={location.pathname === "/ContactUs"}
            as={Link}
            to="/ContactUs"
          >
            聯絡我們
          </Nav>
        </NavBarSite>
        {user && !isConfirmingUser && (
          <NavBarUser>
            <Nav
              $active={location.pathname === "/CreatePost"}
              as={Link}
              to="/CreatePost"
            >
              發佈文章
            </Nav>
            <Nav onClick={handleLogOut}>登出</Nav>
          </NavBarUser>
        )}
        {!user && !isConfirmingUser && (
          <NavBarUser>
            <Nav $active={location.pathname === "/LogIn"} as={Link} to="/LogIn">
              註冊 / 登入
            </Nav>
          </NavBarUser>
        )}
      </NavBar>
    </HeaderContainer>
  );
}

export default memo(Header);
