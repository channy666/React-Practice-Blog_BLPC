import styled from "styled-components";
import { useState, memo, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { GeneralBlock, ErrorBlock } from "./Blocks";
import { getLatestPosts } from "../WebAPI";

const SideBarContainer = styled.div`
  width: 16vw;
  margin-right: 5vw;
`;

const ClassificationContainer = styled.div`
  height: 300px;
  width: 100%;
  margin-bottom: 60px;
`;

const ClassificationContent = styled.div`
  padding: 20px 5% 15px 13%;
`;

const Classification = styled.div`
  font-size: 16px;
  font-weight: bold;
  height: 45px;
  line-height: 50px;
  margin-bottom: 20px;
  cursor: pointer;

  :hover {
    color: #861587;
  }

  ${(props) =>
    props.$active &&
    `
    color: #861587;
  `}
`;

const NavListContainer = styled(ClassificationContainer)`
  height: 520px;
`;

const NavListContent = styled(ClassificationContent)`
  display: flex;
  flex-direction: column;
`;

const Nav = styled(Classification)`
  text-decoration: none;
  color: black;
`;

const RecentPosts = styled.div`
  width: 100%;
  margin-bottom: 20vh;
`;

const RecentPostContent = styled.div`
  padding: 25px 8% 0 8%;
  display: flex;
  flex-direction: column;
`;

const RecentPost = styled(Link)`
  height: 50px;
  margin-bottom: 30px;
  overflow: scroll;
  text-overflow: ellipsis;
  font-size: 16px;
  font-weight: bold;
  line-height: 20px;
  text-decoration: none;
  color: black;

  :hover {
    text-decoration: underline;
  }
`;

const Loading = styled.div`
  width: 100%;
  height: 400px;
  background: #e8e5f8;
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  padding-top: 50px;
  letter-spacing: 3px;
`;

function SideBar({ changeFilter }) {
  const [latestPosts, setLatestPosts] = useState([]);
  const [error, setError] = useState(false);
  const location = useLocation().pathname;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getLatestPosts()
      .then((data) => {
        setLatestPosts(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(true);
        setIsLoading(false);
      });
  }, []);

  const handleClassificationChange = (classification) => {
    changeFilter.setFilter(classification);
  };

  return (
    <SideBarContainer>
      {(location === "/Posts/Research" || location === "/Posts/Analysis") && (
        <ClassificationContainer>
          <GeneralBlock
            title={`${
              location === "/Posts/Research" ? "研究觀點" : "要文評析"
            }分類`}
            titleWidth="170px"
          >
            <ClassificationContent>
              <Classification
                $active={changeFilter.filter === "FinTech"}
                onClick={() => handleClassificationChange("FinTech")}
              >
                金融科技
              </Classification>
              <Classification
                $active={changeFilter.filter === "General"}
                onClick={() => handleClassificationChange("General")}
              >
                一般產業
              </Classification>
              <Classification
                $active={!changeFilter.filter}
                onClick={() => handleClassificationChange(null)}
              >
                全部文章
              </Classification>
            </ClassificationContent>
          </GeneralBlock>
        </ClassificationContainer>
      )}
      {location === "/Forums" && (
        <ClassificationContainer>
          <GeneralBlock title="公眾論壇分類" titleWidth="170px">
            <ClassificationContent>
              <Classification
                $active={changeFilter.filter === "PhD"}
                onClick={() => handleClassificationChange("PhD")}
              >
                博士生論壇
              </Classification>
              <Classification
                $active={changeFilter.filter === "News"}
                onClick={() => handleClassificationChange("News")}
              >
                要聞共賞
              </Classification>
              <Classification
                $active={!changeFilter.filter}
                onClick={() => handleClassificationChange(null)}
              >
                全部文章
              </Classification>
            </ClassificationContent>
          </GeneralBlock>
        </ClassificationContainer>
      )}
      {location !== "/Forums" &&
        location !== "/Posts/Research" &&
        location !== "/Posts/Analysis" && (
          <NavListContainer>
            <GeneralBlock title="分類清單" titleWidth="150px">
              <NavListContent>
                <Nav as={Link} to="/">
                  首頁
                </Nav>
                <Nav as={Link} to="/Posts/Research">
                  研究觀點
                </Nav>
                <Nav as={Link} to="/Posts/Analysis">
                  要聞評析
                </Nav>
                <Nav as={Link} to="/Conferences">
                  講座會議
                </Nav>
                <Nav as={Link} to="/Forums">
                  公眾論壇
                </Nav>
                <Nav as={Link} to="/ContactUs">
                  聯絡我們
                </Nav>
              </NavListContent>
            </GeneralBlock>
          </NavListContainer>
        )}
      <RecentPosts>
        {error && <ErrorBlock size="small">資料有誤，請稍後再試</ErrorBlock>}
        {!error && (
          <GeneralBlock title="近期文章" titleWidth="130px">
            {isLoading && <Loading>Loading...</Loading>}
            {!isLoading && latestPosts && (
              <RecentPostContent>
                {latestPosts.map((post) => {
                  const category = post.category === "Forum" ? "Forum" : "Post";
                  return (
                    <RecentPost key={post.id} to={`/${category}/${post.id}`}>
                      {post.title}
                    </RecentPost>
                  );
                })}
              </RecentPostContent>
            )}
          </GeneralBlock>
        )}
      </RecentPosts>
    </SideBarContainer>
  );
}

export default memo(SideBar);
