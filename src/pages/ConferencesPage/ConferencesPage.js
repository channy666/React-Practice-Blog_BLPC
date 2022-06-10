import styled from "styled-components";
import { Link } from "react-router-dom";
import { GeneralBlock } from "../../component/Blocks";
import conferencesInformation from "../../template/conferencesInformation";

const Root = styled.div`
  margin-bottom: 50px;
`;

const Wrapper = styled.div`
  margin: 10px 0px 20px 10%;
  width: 80%;
`;

const ConferencesContainer = styled.div`
  padding: 40px 5% 30px 5%;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
`;

const Conference = styled(Link)`
  width: 40%;
  margin: 20px 5% 40px 5%;
  cursor: pointer;
  text-decoration: none;
  color: black;
`;

const ConferenceDate = styled.div`
  display: flex;
  font-size: 16px;
`;

const Expired = styled.div`
  margin-left: 5px;
  line-height: 16px;
`;

const UnderLine = styled.div`
  width: 100%;
  height: 3px;
  background: linear-gradient(to right, #50256c, #2348a0);
  margin: 5px 0px;
`;

const ConferenceTitle = styled.div`
  font-weight: bold;
  font-size: 18px;
  overflow: scroll;
  text-overflow: ellipsis;
  margin-bottom: 10px;
`;

const ConferencePicture = styled.div`
  background-image: url(${(props) => props.$image});
  height: 330px;
  width: 100%;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
`;

function ConferancesPage() {
  const currentDate = Date.parse(new Date()).valueOf();
  return (
    <Root>
      <Wrapper>
        <GeneralBlock title="講座會議" titleWidth="130px">
          <ConferencesContainer>
            {conferencesInformation.map((conference, index) => {
              return (
                <Conference key={index} to={`/Conference/${index + 1}`}>
                  <ConferenceDate>
                    {conference.date}
                    {Date.parse(conference.date).valueOf() < currentDate && (
                      <Expired>[歷史活動]</Expired>
                    )}
                  </ConferenceDate>
                  <UnderLine />
                  <ConferenceTitle>{conference.title}</ConferenceTitle>
                  <ConferencePicture $image={conference.coverImage} />
                </Conference>
              );
            })}
          </ConferencesContainer>
        </GeneralBlock>
      </Wrapper>
    </Root>
  );
}

export default ConferancesPage;
