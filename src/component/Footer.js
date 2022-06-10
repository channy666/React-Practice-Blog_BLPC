import styled from "styled-components";
import { memo } from "react";

const FooterContainer = styled.div`
  height: 120px;
  width: 100%;
  background: #301945;
  padding-top: 60px;
`;

const FooterContent = styled.div`
  color: white;
  font-size: 14px;
  margin-left: 30%;
  margin-bottom: 5px;

  a {
    color: #428bca;
    cursor: not-allowed;

    :hover {
      text-decoration: underline;
      color: white;
    }
  }
`;

function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        <a>網站使用守則</a>
        {`   |  本網站著作權屬於國立清華大學區塊鏈法律與政策研究中心`}
      </FooterContent>
      <FooterContent>
        地址：30013 新竹市光復路二段101號台積館4樓412室 | 電話：03-5627064 |
        傳真：03-5629446 | E-mail：blpc@gapp.nthu.edu.tw
      </FooterContent>
    </FooterContainer>
  );
}

export default memo(Footer);
