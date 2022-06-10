import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SideBar from "../../component/SideBar";
import DOMPurify from "dompurify";
import parse from "html-react-parser";
import { getPost } from "../../WebAPI";

const Root = styled.div`
  display: flex;
  padding: 3vh 0 10vh 8vw;
`;

const ForumContainer = styled.div`
  width: 55%;
  margin: 0 0 20vh 4vw;
`;

const Reminder = styled(ForumContainer)`
  font-size: 36px;
  font-weight: bold;
  text-align: center;
`;

const ForumTitle = styled.div`
  font-weight: bold;
  font-size: 32px;
`;

const ForumInfo = styled.div`
  display: flex;
  margin: 20px 0px 20px 0px;
  align-items: center;
  font-size: 18px;
  margin-left: 16px;
`;

const ForumDate = styled.div`
  margin-right: 4%;

  span {
    letter-spacing: 2px;
  }
`;

const ForumAuthor = styled.div`
  span {
    color: #50256c;
    font-weight: bold;
  }
`;

const ForumImage = styled.div`
  background-image: url(${(props) => props.$img});
  height: 35vw;
  background-size: contain;
  background-position: left;
  background-repeat: no-repeat;
`;

const ForumContent = styled.div`
  white-space: pre-wrap;
  word-break: break-word;
  margin-top: 2vh;
  line-height: 30px;
  letter-spacing: 1.2px;
`;

function ForumPage() {
  const { id } = useParams();
  const [forumData, setForumData] = useState();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getPost(id)
      .then((data) => {
        if (data.category !== "Forum") {
          return navigate(`/Post/${data.id}`);
        }
        setForumData(data);
        window.scrollTo(0, 0);
        setIsLoading(false);
      })
      .catch((err) => setError(true));
  }, [id]);

  return (
    <Root>
      <SideBar />
      {error && <Reminder>資料有誤，請稍後再試</Reminder>}
      {isLoading && !error && <Reminder>Loading...</Reminder>}
      {!error && !isLoading && forumData && (
        <ForumContainer>
          <ForumTitle>{forumData.title}</ForumTitle>
          <ForumInfo>
            <ForumDate>
              發布日期：
              <span>{new Date(forumData.createdAt).toLocaleDateString()}</span>
            </ForumDate>
            <ForumAuthor>
              作者：<span>{forumData.user.nickname}</span>
            </ForumAuthor>
          </ForumInfo>
          {forumData.coverImage && <ForumImage $img={forumData.coverImage} />}
          <ForumContent>
            {parse(DOMPurify.sanitize(forumData.body))}
          </ForumContent>
        </ForumContainer>
      )}
    </Root>
  );
}

export default ForumPage;
