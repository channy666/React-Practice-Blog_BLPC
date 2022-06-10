import styled from "styled-components";
import operationImage from "../../utils/images/AboutPage/架構與功能圖示.png";
import { GeneralBlock } from "../../component/Blocks";

const Root = styled.div`
  margin-bottom: 50px;
`;

const Introduction = styled.div`
  margin: 20px 0px 50px 9vw;
  width: 80%;
`;

const IntroductionContent = styled.div`
  padding: 25px 3% 30px 3%;
  box-sizing: border-box;
  font-size: 15px;
  letter-spacing: 1.1px;
  line-height: 26px;
`;

const Implementation = styled(Introduction)``;

const ImplementationContent = styled(IntroductionContent)``;

const Content = styled.div`
  font-size: 15px;
  letter-spacing: 1.1px;
  line-height: 26px;
`;

const ContentBold = styled(Content)`
  font-weight: bold;
  margin: 15px 0px;
  font-size: 17px;
`;

const ContentPoint = styled(Content)`
  margin-left: 10px;
`;

const Operation = styled(Introduction)``;

const OperationContent = styled(IntroductionContent)``;

const OperationContentImage = styled.div`
  background-image: url(${operationImage});
  width: 700px;
  height: 420px;
  background-size: contain;
  margin-left: 49px;
  background-repeat: no-repeat;
`;

function AboutPage() {
  return (
    <Root>
      <Introduction>
        <GeneralBlock title="成立目的與簡介" titleWidth="180px">
          <IntroductionContent>
            本中心於2018年間，因獲得海納百川區塊鏈商學院及眾勤法律事務所之捐贈而奉准成立，並成為亞洲第一所以法律及政策為主的區塊鏈研究中心，當時主要以因應區塊鏈技術帶來的顛覆性挑戰，以及在金融科技領域所受到的高度重視為主要關切重點，並將數位貨幣、保險、資產證券化、跨境支付、融資供應鏈等議題納入為研究核心課題，並持續辦理研習、專題報導及公開演講等學術活動，如今隨與原捐贈單位之合作告一段落，本中心的活動與業務已更加多元。
            <br />
            <br />
            目前，除與工業技術研究院合作辦理多場次之學分或證書課程外，亦參與國家重要智庫，例如財團法人中技社之區塊鏈專題研究，並參與我國在聯合國氣候公約有關區塊鏈於能源科技開發之發表；近來更隨區塊鏈科技之應用升級，開始參與影音與藝文界在此領域之開發應用，並與國立臺灣師範大學之亞洲流行數位科技研究中心結盟，辦理相關研討會。至於在協助政府因應新興議題之挑戰上，本中心亦未缺席，由主任范建得教授先後參與金融監督管理委員會與法務部調查局所辦理之相關研討會，提供專業意見，目前更已積極投入營業秘密保護之研究，參與實際司法鏈於民間應用上之建置工作。
            <br />
            <br />
            總之，隨區塊鏈技術更加成熟、市場應用需求的快速提升，對於既有法規的挑戰亦伴隨而來，甚至有推動法規調適之必要；鑒於這些需求係廣泛的出自各行各業；例如能源、醫療、產業管理、物聯網應用等，因此本中心正進一步結合學界、法界及產業界的力量，投入更深度的區塊鏈法律研究、出版書籍，並參與催生國內相關法規之建置，以為完善區塊鏈法制環境略盡棉薄之力。
          </IntroductionContent>
        </GeneralBlock>
      </Introduction>
      <Implementation>
        <GeneralBlock title="中心研究領域與執行業務" titleWidth="250px">
          <ImplementationContent>
            <Content>
              本中心針對區塊鏈技術應用各產業所生之法律議題，分為兩個任務編組進行研究，並依其研究內容與清大跨院資源整合，提供教育課程、接受委託研究、政府諮詢為主要功能，提出政策建議、產業應用區塊鏈技術與人才養成。
            </Content>
            <ContentBold>1、研究領域：</ContentBold>
            <Content>(1)金融科技組：</Content>
            <ContentPoint>
              <ol>
                <li>
                  金融科技應用：初期將以「加密貨幣發行、交易與支付系統及交易平台建立合法性」為主，並於相關領域包含數位貨幣、跨境支付、保險、資產證券化、融資供應鏈等等所生之法律議題，進行研究。
                </li>
                <li>
                  金融科技犯罪防制：針對「如何建立區塊鏈技術或加密貨幣成為洗錢等犯罪的防治機制」進行研究，著重於利用金融科技跨國洗錢的犯罪防治議題研究。
                </li>
              </ol>
            </ContentPoint>
            <Content>(2)一般產業組：</Content>
            <ContentPoint>
              <ol>
                <li>
                  區塊鏈以及數位資產交易：針對各產業應用之數位資產交易合法性進行研究，以能源為例，例如區塊鏈技術應用於再生能源的點對點交易(包含消費者間的認證與交易)。
                </li>
                <li>
                  區塊鏈以及醫療：以區塊鏈利用匿名化、去中心化之特徵保障病人隱私為出發點，應用於電子健康病例(EHR)、基因測序、藥品防偽等所生之法律議題。
                </li>
                <li>
                  區塊鏈以及智能合約：區塊鏈應用於自動化合約撰擬、自動執行協議而生之法律議題。
                </li>
                <li>
                  區塊鏈以及物聯網：其餘區塊鏈應用於物聯網的技術，包含共享經濟、資訊通訊、智慧生活所生之法律議題。
                </li>
              </ol>
            </ContentPoint>
            <ContentBold>2、執行業務：</ContentBold>
            <ContentPoint>
              <ol>
                <li>
                  教育課程：提供最新區塊鏈技術應用之法律課程，針對基本法律學程、科法所專業課程以及推廣教育課程(如結合律師繼續教育)進行授課。
                </li>
                <li>
                  接受委託研究：針對業界各項區塊鏈技術應用實務委託案進行研究，並依照業界委託內容，結合清大各院系專業資源，提供跨領域法律分析。
                </li>
                <li>
                  政策建議：研究國外最新政策與法律趨勢與實務應用之法律議題，對應國內既有法律與規範不足處提出政策建議，或供政府機關諮詢。
                </li>
                <li>
                  Newsletter：科法所與業界合作，分別提出學術觀點、律師觀點與產業實務觀點（可參考
                  Stanford
                  區塊鏈法律分析刊物，初期可討論稅務議題，分析重要國家對於虛擬貨幣的定性與管理方式）
                </li>
              </ol>
            </ContentPoint>
          </ImplementationContent>
        </GeneralBlock>
      </Implementation>
      <Operation>
        <GeneralBlock title="中心架構與運作模式" titleWidth="210px">
          <OperationContent>
            <ContentPoint>
              <ol>
                <li>
                  組織架構：由委辦單位及產官學研專業人員組成諮詢委員會(委員會人數待定)，中心設置主任一名（學）、執行秘書處設置主任秘書一名（專職）、博士後研究員一人（專職）及行政人員若干，中心初期下設兩個任務編組（Ad
                  hoc），金融科技組以及一般產業組，各置組長一人，組員若干。
                </li>
                <br />
                <li>
                  組織任務：由諮詢委員會指導中心重要研究方向、委託案與課程安排（以project方式列管案件），中心主任負責統籌與執行中心業務，執行秘書處負責接受委託研究案、課程安排與規劃、計畫進度管理、行政交辦事項，下設兩任務編組研究議題。
                </li>
                <br />
                <li>架構與功能圖示：</li>
              </ol>
            </ContentPoint>
            <OperationContentImage />
          </OperationContent>
        </GeneralBlock>
      </Operation>
    </Root>
  );
}

export default AboutPage;
