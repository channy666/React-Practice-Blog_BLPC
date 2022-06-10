import styled from "styled-components";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SideBar from "../../component/SideBar";
import Paginator from "../../component/Paginator";
import { getForums } from "../../WebAPI";

const Root = styled.div`
  display: flex;
  padding: 3vh 0 10vh 8vw;
`;

const ForumsContainer = styled.div`
  width: 55%;
  margin-left: 4vw;
`;

const Error = styled(ForumsContainer)`
  text-align: center;
  font-size: 32px;
  font-weight: bold;
  letter-spacing: 5px;
`;

const Loading = styled(Error)``;

const ForumContainer = styled.div`
  padding-bottom: 90px;
`;

const Forum = styled(Link)`
  text-decoration: none;
  color: black;
`;

const ForumTitle = styled.div`
  font-weight: bold;
  font-size: 24px;
`;

const ForumInfo = styled.div`
  display: flex;
  margin: 15px 0px 15px 0px;
  align-items: center;
`;

const ForumDate = styled.div`
  margin-right: 3%;
  font-size: 16px;
`;

const ForumAuthor = styled.div`
  font-size: 16px;

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

function ForumsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const [forums, setForums] = useState();
  const [filter, setFilter] = useState(null);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getForums(currentPage, filter)
      .then((res) => {
        const totalPage = Math.ceil(res.headers.get("X-Total-Count") / 5);
        setTotalPage(totalPage);
        if (totalPage < currentPage) {
          setCurrentPage(1);
        }
        return res.json();
      })
      .then((data) => {
        setForums(data);
        window.scrollTo(0, 0);
        setError(false);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(true);
        setIsLoading(false);
      });
  }, [currentPage, filter]);

  return (
    <Root>
      <SideBar changeFilter={{ filter, setFilter }} />
      <ForumsContainer>
        {error && !isLoading && <Error>資料有誤，請稍後再試</Error>}
        {!error && isLoading && <Loading>Loading...</Loading>}
        {!error &&
          forums &&
          !isLoading &&
          forums.map((forum) => {
            const { id, title, createdAt, user, coverImage } = forum;
            return (
              <ForumContainer key={id}>
                <Forum to={`/Forum/${id}`}>
                  <ForumTitle>{title}</ForumTitle>
                  <ForumInfo>
                    <ForumDate>
                      {new Date(createdAt).toLocaleDateString()}
                    </ForumDate>
                    <ForumAuthor>
                      作者：<span>{user.nickname}</span>
                    </ForumAuthor>
                  </ForumInfo>
                  <ForumImage $img={coverImage} />
                </Forum>
              </ForumContainer>
            );
          })}
        {!error && forums && !isLoading && (
          <Paginator
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPage={totalPage}
          />
        )}
      </ForumsContainer>
    </Root>
  );
}

export default ForumsPage;
