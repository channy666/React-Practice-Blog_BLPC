import styled from "styled-components";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SideBar from "../../component/SideBar";
import pictureIcon from "../../utils/images/ConferencesPage/pictureIcon.png";
import minuteIcon from "../../utils/images/ConferencesPage/minuteIcon.png";
import conferencesInformation from "../../template/conferencesInformation";

const Root = styled.div`
  display: flex;
  padding: 30px 0px 0px 7%;
`;

const ConferenceContainer = styled.div`
  width: 60%;
  margin: 0px 0px 100px 20px;
`;

const ConferenceTitle = styled.div`
  font-weight: bold;
  font-size: 26px;
  letter-spacing: 3px;
  margin-bottom: 20px;
`;

const ConferencePoster = styled.div`
  background-image: url(${(props) => props.$image});
  width: 95%;
  height: 600px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  margin: 0 auto;
`;

const ConferenceContent = styled.div`
  white-space: pre-wrap;
  word-break: break-word;
  margin: 30px 0px;
  width: 90%;
  line-height: 30px;
`;

const ConferencePicture = styled.div`
  padding: 30px 0px;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  font-weight: bold;
`;

const TitleIcon = styled.div`
  background-image: url(${(props) => props.$icon});
  width: 35px;
  height: 35px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  margin-right: 10px;
`;

const Pictures = styled.div`
  display: flex;
  margin-bottom: 30px;
  flex-wrap: wrap;
  height: 250px;
`;

const Picture = styled.div`
  background-image: url(${(props) => props.$image});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  width: 260px;
`;

const ConferenceMinute = styled.div`
  margin-bottom: 10px;
`;

const Minute = styled.div`
  margin-top: 20px;
  letter-spacing: 0.4px;

  a {
    color: black;

    :hover {
      color: #861587;
    }
  }
`;

function ConferencePage() {
  const { index } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!conferencesInformation[Number(index - 1)]) {
      navigate("/NotFound");
    }
  }, [index]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!conferencesInformation[Number(index - 1)]) return;

  const { title, poster, content, images, minute } = conferencesInformation[
    Number(index - 1)
  ];

  return (
    <Root>
      <SideBar />
      <ConferenceContainer>
        <ConferenceTitle>{title}</ConferenceTitle>
        <ConferencePoster $image={poster} />
        <ConferenceContent>{content}</ConferenceContent>
        {images && (
          <ConferencePicture>
            <Title>
              <TitleIcon $icon={pictureIcon} />
              活動照片
            </Title>
            <Pictures>
              {images.map((img, index) => (
                <Picture $image={img.img} key={index} />
              ))}
            </Pictures>
          </ConferencePicture>
        )}
        {minute && (
          <ConferenceMinute>
            <Title>
              <TitleIcon $icon={minuteIcon} />
              會議記錄
            </Title>
            <Minute>
              <a href={minute.url} target="_blank">
                {minute.title}
              </a>
            </Minute>
          </ConferenceMinute>
        )}
      </ConferenceContainer>
    </Root>
  );
}

export default ConferencePage;
