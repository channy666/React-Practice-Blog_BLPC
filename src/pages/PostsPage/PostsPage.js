import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { GeneralBlock, ErrorBlock } from "../../component/Blocks";
import SideBar from "../../component/SideBar";
import { getPosts } from "../../WebAPI";
import Paginator from "../../component/Paginator";
import sort from "../../utils/sortPost";

const Root = styled.div`
  display: flex;
  padding: 50px 0px 50px 7vw;
`;

const Wrapper = styled.div``;

const PostsContainer = styled.div`
  width: 65vw;
  position: relative;
`;

const Posts = styled.div`
  padding: 30px 0px 30px 5%;
`;

const Post = styled(Link)`
  display: flex;
  height: 60px;
  margin-bottom: 30px;
  cursor: pointer;
  text-decoration: none;
  color: black;

  :hover {
    text-decoration: underline;
  }
`;

const PostDate = styled.div`
  font-size: 15px;
  width: 8vw;
  display: flex;
  align-self: center;
  letter-spacing: 1.5px;
`;

const PostTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  overflow: scroll;
  text-overflow: ellipsis;
  width: 45vw;
  line-height: 30px;
  display: flex;
  align-items: center;
  height: 60px;
`;

const Loading = styled.div`
  width: 100%;
  height: 400px;
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  padding-top: 50px;
  letter-spacing: 3px;
`;

function PostsPage() {
  const { category } = useParams();
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState(null);
  const [totalPage, setTotalPage] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setFilter(null);
    if (category !== "Research" && category !== "Analysis") {
      navigate("/NotFound");
    }
  }, [category]);

  useEffect(() => {
    getPosts(currentPage, category, filter)
      .then((res) => {
        const totalPage = Math.ceil(res.headers.get("X-Total-Count") / 10);
        setTotalPage(totalPage);
        if (totalPage < currentPage) {
          setCurrentPage(1);
        }
        return res.json();
      })
      .then((data) => {
        setPosts(data);
        window.scrollTo(0, 0);
        setError(false);
        setIsLoading(false);
      })
      .catch(() => {
        setError(true);
        setIsLoading(false);
      });
  }, [currentPage, category, filter]);

  return (
    <Root>
      <SideBar changeFilter={{ filter, setFilter }} />
      <PostsContainer>
        {error && !isLoading && (
          <ErrorBlock size="big">資料有誤，請稍後再試</ErrorBlock>
        )}
        {!error && (
          <Wrapper>
            <GeneralBlock
              title={
                filter
                  ? `${sort.categoryName[category]} > ${sort.classificationName[filter]}`
                  : sort.categoryName[category]
              }
              titleWidth="130px"
              full={true}
            >
              {isLoading && <Loading>Loading...</Loading>}
              {posts && !isLoading && (
                <Posts>
                  {posts.map((post) => (
                    <Post key={post.id} to={`/Post/${post.id}`}>
                      <PostDate>
                        {new Date(Number(post.createdAt)).toLocaleDateString()}
                      </PostDate>
                      <PostTitle>{post.title}</PostTitle>
                    </Post>
                  ))}
                </Posts>
              )}
            </GeneralBlock>
            {posts && !isLoading && (
              <Paginator
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPage={totalPage}
              />
            )}
          </Wrapper>
        )}
      </PostsContainer>
    </Root>
  );
}

export default PostsPage;
