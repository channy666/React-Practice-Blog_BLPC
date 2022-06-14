import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { GeneralBlock, ErrorBlock } from "../../component/Blocks";
import SideBar from "../../component/SideBar";
import Paginator from "../../component/Paginator";
import sort from "../../utils/sortPost";
import { getSearchPost } from "../../WebAPI";

const Root = styled.div`
  display: flex;
  padding: 50px 0px 50px 7vw;
`;

const SearchResultsContainer = styled.div`
  width: 65vw;
  position: relative;
`;

const SearchResults = styled.div`
  padding: 30px 0px 30px 5%;
`;

const Post = styled(Link)`
  display: flex;
  height: 90px;
  padding: 10px 0px;
  cursor: pointer;
  text-decoration: none;
  color: black;
  margin-bottom: 20px;
`;

const PostDate = styled.div`
  font-size: 15px;
  width: 8vw;
  display: flex;
  align-self: center;
  letter-spacing: 1.5px;
`;

const PostInfo = styled.div`
  width: 45vw;
  height: 80px;
`;

const PostTitle = styled.div`
  display: flex;
  font-size: 20px;
  font-weight: bold;
  overflow: scroll;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: 10px 0px;
  align-items: center;

  :hover {
    text-decoration: underline;
  }
`;

const PostDetail = styled.div`
  display: flex;
  font-size: 15px;
`;

const PostCategory = styled.div`
  width: 250px;
  flex-shrink: 0;

  span {
    color: #50256c;
  }
`;

const PostAuthor = styled.div`
  overflow: scroll;
  white-space: nowrap;
  text-overflow: ellipsis;
  span {
    color: #50256c;
    font-weight: bold;
  }
`;

const Searching = styled.div`
  width: 100%;
  height: 400px;
  background: #e8e5f8;
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  padding-top: 50px;
  letter-spacing: 3px;
`;

function SearchPage() {
  const { value } = useParams();
  const [searchResult, setSearchResult] = useState();
  const [searchResultTotalCount, setSearchResultTotalCount] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const [error, setError] = useState(false);
  const [isSearching, setIsSearching] = useState(true);

  useEffect(() => {
    getSearchPost(value, currentPage)
      .then((res) => {
        const totalCount = res.headers.get("X-Total-Count");
        setSearchResultTotalCount(totalCount);
        if (!totalCount) {
          setTotalPage(1);
        } else {
          setTotalPage(Math.ceil(totalCount / 10));
        }
        if (Math.ceil(totalCount / 10) < currentPage) {
          setCurrentPage(1);
        }
        return res.json();
      })
      .then((data) => {
        setSearchResult(data);
        setIsSearching(false);
        window.scrollTo(0, 0);
      })
      .catch(() => {
        setError(true);
        setIsSearching(false);
      });
  }, [value, currentPage]);

  return (
    <Root>
      <SideBar />
      <SearchResultsContainer>
        {error && <ErrorBlock size="big">資料有誤，請稍後再試</ErrorBlock>}
        {!error && isSearching && (
          <GeneralBlock title="" full={true}>
            <Searching>Searching...</Searching>
          </GeneralBlock>
        )}
        {!error && !isSearching && searchResult && (
          <GeneralBlock
            title={`搜尋含有「 ${value} 」的文章，共 ${searchResultTotalCount} 筆`}
            full={true}
          >
            <SearchResults>
              {searchResult.map((post) => {
                let route = "";
                if (post.category === "Forum") {
                  route = "/Forum";
                } else {
                  route = "/Post";
                }
                return (
                  <Post to={`${route}/${post.id}`} key={post.id}>
                    <PostDate>
                      {new Date(Number(post.createdAt)).toLocaleDateString()}
                    </PostDate>
                    <PostInfo>
                      <PostTitle>{post.title}</PostTitle>
                      <PostDetail>
                        <PostCategory>
                          文章分類：
                          <span>{`${sort.categoryName[post.category]} > ${
                            sort.classificationName[post.classification]
                          }`}</span>
                        </PostCategory>
                        <PostAuthor>
                          作者：
                          <span>{post.user.nickname}</span>
                        </PostAuthor>
                      </PostDetail>
                    </PostInfo>
                  </Post>
                );
              })}
            </SearchResults>
          </GeneralBlock>
        )}
        {!error && !isSearching && searchResult && (
          <Paginator
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPage={totalPage}
          />
        )}
      </SearchResultsContainer>
    </Root>
  );
}

export default SearchPage;
