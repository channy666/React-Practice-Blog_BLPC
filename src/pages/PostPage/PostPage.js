import { useState, useEffect, memo } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import DOMPurify from "dompurify";
import parse from "html-react-parser";
import { GeneralBlock, ErrorBlock } from "../../component/Blocks";
import SideBar from "../../component/SideBar";
import { getPost } from "../../WebAPI";
import sort from "../../utils/sortPost";

const Root = styled.div`
  display: flex;
  padding: 50px 0px 0px 7vw;
`;

const Wrapper = styled.div``;

const PostContainer = styled.div`
  width: 65vw;
  margin-bottom: 100px;
`;

const Post = styled.div`
  padding: 50px 0px 50px 5vw;
  width: 90%;
  box-sizing: border-box;
`;

const PostTitle = styled.div`
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 25px;
  color: #391d46;
  word-break: break-word;
  over-flow: wrap;
  letter-spacing: 1.5px;
`;

const PostInfo = styled.div`
  letter-spacing: 1px;
  margin-bottom: 50px;
  font-size: 16px;
  display: flex;
  align-items: center;
`;

const PostDate = styled.div`
  flex-shrink: 0;
  color: black;
  span {
    color: #701f74;
    letter-spacing: 2px;
  }
`;

const PostAuthor = styled.div`
  margin-left: 30px;
  color: black;

  span {
    font-weight: bold;
    color: #701f74;
  }
`;

const PostContent = styled.div`
  white-space: pre-wrap;
  word-break: break-word;
  font-size: 18px;
  letter-spacing: 2px;
  line-height: 35px;
  color: black;
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

function PostPage() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [postData, setPostData] = useState();

  useEffect(() => {
    setIsLoading(true);
    setError(false);
    getPost(id)
      .then((data) => {
        // 找不到資料會回傳空物件
        if (JSON.stringify(data) === "{}") {
          setError("postId");
          return;
        }
        setPostData(data);
        window.scrollTo(0, 0);
        setIsLoading(false);
      })
      .catch(() => {
        setError("API");
      });
  }, [id]);

  return (
    <Root>
      <SideBar />
      <PostContainer>
        {error && (
          <ErrorBlock size="big">
            {error === "postId" ? "找不到文章 QQ" : "資料錯誤，請稍後再試"}
          </ErrorBlock>
        )}
        {!error && (
          <Wrapper>
            {isLoading && (
              <GeneralBlock title="" full={true}>
                <Loading>Loading...</Loading>
              </GeneralBlock>
            )}
            {!isLoading && postData && (
              <GeneralBlock
                title={`${sort.categoryName[postData.category]} > ${
                  sort.classificationName[postData.classification]
                }`}
                full={true}
              >
                <Post>
                  <PostTitle>{postData.title}</PostTitle>
                  <PostInfo>
                    <PostDate>
                      發布日期：
                      <span>
                        {new Date(postData.createdAt).toLocaleDateString()}
                      </span>
                    </PostDate>
                    <PostAuthor>
                      作者：
                      <span>{postData.user.nickname}</span>
                    </PostAuthor>
                  </PostInfo>
                  <PostContent>
                    {parse(DOMPurify.sanitize(postData.body))}
                  </PostContent>
                </Post>
              </GeneralBlock>
            )}
          </Wrapper>
        )}
      </PostContainer>
    </Root>
  );
}

export default memo(PostPage);
