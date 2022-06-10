import styled from "styled-components";
import { memo } from "react";
import { Link } from "react-router-dom";
import latestNews from "../../utils/images/latestNews/最新消息.png";
import banner from "../../utils/images/首頁banner_紫底空白.png";
import {
  latestNewsTemplate,
  cooperationTemplate,
} from "../../template/homePageTemplate";
import featuredPageImage1 from "../../utils/images/featuredPage/featuredPageTest.png";
import featuredPageImage2 from "../../utils/images/featuredPage/featuredPage2.png";
import featuredPageImage3 from "../../utils/images/featuredPage/featuredPage3.png";
import featuredPageImage4 from "../../utils/images/featuredPage/featuredPage4.png";
import { BlockTitle, GeneralBlock } from "../../component/Blocks";

const HomePageContainer = styled.div`
  width: 100%;
`;

const Banner = styled.div`
  background-image: url(${banner});
  height: 450px;
  width: 80%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: bottom right;
  margin: 30px 0px 30px 8%;
  border: 2px solid #261e76;
`;

const BannerContent = styled.div`
  font-size: 1.5em;
  width: 78%;
  height: 50%;
  line-height: 240%;
  color: #261e76;
  margin: 4% 0 0 16%;
`;

const LatestNews = styled.div`
  background-image: url(${latestNews});
  padding-top: 30px;
  box-sizing: border-box;
  width: 80%;
  height: 450px;
  background-position: top;
  background-size: cover;
  margin: 0px 0px 10px 8%;
`;

const LatestNewsTitleContainer = styled.div`
  margin: 0 auto;
  width: 90%;
`;

const LatestNewsContent = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  margin-left: 6%;
  padding-top: 8px;

  a {
    text-decoration: none;
    color: black;
    margin-right: 3%;
  }
`;

const News = styled.div`
  display: flex;
  margin: 20px 12% 40px 0px;
  cursor: not-allowed;
  height: 40%;
  width: 100%;

  ${(props) =>
    props.$link &&
    `
    cursor: pointer;

    :hover {
      text-decoration: underline;
    }
  `}
`;

const NewsImage = styled.div`
  background-image: url(${(props) => props.$image});
  height: 100px;
  width: 100px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  justify-content: center;
  text-align: center;
  margin: auto 0;
  margin-right: 6%;
`;

const NewsInfo = styled.div`
  height: 100px;
  width: 130px;
`;

const NewsTitle = styled.div`
  overflow: scroll;
  text-overflow: ellipsis;
  font-size: 14px;
  font-weight: bold;
  height: 100px;
`;

const NewsDate = styled.div`
  margin-bottom: 5px;
  font-size: 14px;
`;

const RowContainer = styled.div`
  display: flex;
`;

const FeaturedPageContainer = styled.div`
  width: 50%;
  height: 260px;
  margin: 20px 0px 0px 8%;
`;

const FeaturedPageContent = styled.div`
  height: 200px;
  display: flex;
  padding: 34px 0px 0px 3%;
`;

const FeaturedPage = styled(Link)`
  background-image: url(${(props) => props.$image});
  height: 110px;
  width: 110px;
  background-size: cover;
  background-position: top right;
  margin-left: 2%;
  border: 5px solid white;
  cursor: pointer;

  :hover {
    border: 5px solid #50256c;
  }
`;

const CooperationContainer = styled.div`
  width: 26%;
  height: 450px;
  margin: 20px 0px 0px 4%;
`;

const CooperationContent = styled.div`
  height: 350px;
  flex-wrap: wrap;
  padding: 20px 0px 0px 5%;
  display: flex;
`;

const Cooperation = styled.div`
  background-image: url(${(props) => props.$image});
  height: 120px;
  width: 120px;
  border: 5px solid white;
  margin: 10px 0px 15px 28px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;

  :hover {
    border: 5px solid #50256c;
  }
`;

function HomePage() {
  return (
    <HomePageContainer>
      <Banner>
        <BannerContent>
          本中心為亞洲第一所以法律為主的區塊鏈法律與政策研究中心。
          <br />
          有鑑於區塊鏈技術帶來顛覆未來的革命性科技，在金融科技領域受到高度重視，亦得廣泛應用於各行各業，
          例如能源、醫療、產業管理、物聯網等。
          <br />
          針對區塊鏈技術廣泛應用而生之法律議題，為完善區塊鏈法治環境提供執行方案、領導政府對於此部分的法規架構，以及培育跨領域研究之科技法律人才，特設立本中心。
        </BannerContent>
      </Banner>
      <LatestNews>
        <LatestNewsTitleContainer>
          <BlockTitle title="最新消息" titleWidth="130px" />
        </LatestNewsTitleContainer>
        <LatestNewsContent>
          {latestNewsTemplate.map((news) => {
            const { date, title, image, link } = news;
            return (
              <a href={link || undefined} key={title} target="_blank">
                <News $link={link}>
                  <NewsImage $image={image} />
                  <NewsInfo>
                    <NewsDate>{date}</NewsDate>
                    <NewsTitle>{title}</NewsTitle>
                  </NewsInfo>
                </News>
              </a>
            );
          })}
        </LatestNewsContent>
      </LatestNews>
      <RowContainer>
        <FeaturedPageContainer>
          <GeneralBlock title="精選頁面" titleWidth="130px">
            <FeaturedPageContent>
              <FeaturedPage $image={featuredPageImage1} to="/Posts/Research" />
              <FeaturedPage $image={featuredPageImage2} to="/Posts/Analysis" />
              <FeaturedPage $image={featuredPageImage3} to="/Forums" />
              <FeaturedPage $image={featuredPageImage4} to="/Forums" />
            </FeaturedPageContent>
          </GeneralBlock>
        </FeaturedPageContainer>
        <CooperationContainer>
          <GeneralBlock title="合作夥伴" titleWidth="100%" full={true}>
            <CooperationContent>
              {cooperationTemplate.map((coop) => {
                const { name, link, image } = coop;
                return (
                  <a key={name} title={name} href={link} target="_blank">
                    <Cooperation $image={image} />
                  </a>
                );
              })}
            </CooperationContent>
          </GeneralBlock>
        </CooperationContainer>
      </RowContainer>
    </HomePageContainer>
  );
}

export default memo(HomePage);
