import styled from "styled-components";
import { memo } from "react";
import logo from "../../utils/images/ContactUsPage/BLPC_Logo_漸2.png";
import contactUsInformation from "../../template/contactUsInformation";
import { GeneralBlock } from "../../component/Blocks";

const Root = styled.div``;

const ContactUs = styled.div`
  margin: 50px 0px 70px 10%;
  width: 75%;
`;

const ContactUsContent = styled.div`
  display: flex;
  padding: 25px;
  box-sizing: border-box;
`;

const ContactUsLogo = styled.div`
  background-image: url(${logo});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 450px;
  width: 50%;
  margin-bottom: 20px;
`;

const ContactUsInfo = styled.div`
  margin: 20px 0px 0px 5%;

  a {
    text-decoration: none;
  }
`;

const Info = styled.div`
  display: flex;
  margin-top: 18px;
`;

const InfoImage = styled.div`
  background-image: url(${(props) => props.$image});
  height: 62px;
  width: 62px;
  background-repeat: no-repeat;
  background-size: contain;
`;

const InfoContent = styled.div`
  color: black;
  font-size: 16px;
  text-align: center;
  letter-spacing: 1px;
  margin: 22px 0px 0px 20px;

  ${(props) =>
    props.$link &&
    `
    color: #428bca;
    cursor: pointer;

    :hover {
      text-decoration: underline;
    }
  `}
`;

function ContactUsPage() {
  return (
    <Root>
      <ContactUs>
        <GeneralBlock title="聯絡我們" titleWidth="130px">
          <ContactUsContent>
            <ContactUsLogo />
            <ContactUsInfo>
              {contactUsInformation.map((info) => {
                const { image, content, link } = info;
                return (
                  <a
                    href={link ? link : undefined}
                    key={content}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Info>
                      <InfoImage $image={image} />
                      <InfoContent $link={link}>{content}</InfoContent>
                    </Info>
                  </a>
                );
              })}
            </ContactUsInfo>
          </ContactUsContent>
        </GeneralBlock>
      </ContactUs>
      <iframe
        src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCIf8iLswO6EBtREOYjiVlvW6-KGiMuMF8&q=台積館&zoom=17"
        width="100%"
        height="450"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        title="TSMC Building"
      ></iframe>
    </Root>
  );
}

export default memo(ContactUsPage);
