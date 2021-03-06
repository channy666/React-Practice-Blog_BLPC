import { useState, useEffect, memo, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import DOMPurify from "dompurify";
import parse from "html-react-parser";
import { GeneralBlock, ErrorBlock } from "../../component/Blocks";
import SideBar from "../../component/SideBar";
import EditPostButtons from "../../component/EditPostButtons";
import sort from "../../utils/sortPost";
import { getPost } from "../../WebAPI";
import { AuthContext } from "../../context";

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
  padding: 40px 0px 50px 5vw;
  width: 90%;
  box-sizing: border-box;
`;

const PostTitle = styled.div`
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 30px;
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
  height: 40px;
`;

const PostDate = styled.div`
  flex-shrink: 0;
  color: black;
  height: 100%;
  span {
    color: #701f74;
    letter-spacing: 2px;
  }
`;

const PostAuthor = styled.div`
  margin-left: 30px;
  color: black;
  height: 100%;

  span {
    font-weight: bold;
    color: #701f74;
    overflow: scroll;
    text-overflow: ellipsis;
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
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    setIsLoading(true);
    setError(false);
    getPost(id)
      .then((data) => {
        // ?????????????????????????????????
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
            {error === "postId" ? "??????????????? QQ" : "??????????????????????????????"}
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
                  {user && (
                    <EditPostButtons
                      postData={postData}
                      userInfo={{ user, setUser }}
                    />
                  )}
                  <PostTitle>{postData.title}</PostTitle>
                  <PostInfo>
                    <PostDate>
                      ???????????????
                      <span>
                        {new Date(
                          Number(postData.createdAt)
                        ).toLocaleDateString()}
                      </span>
                    </PostDate>
                    <PostAuthor>
                      ?????????
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
