import styled from "styled-components";

const TitleContainer = styled.div``;

const Title = styled.div`
  font-size: 19px;
  color: white;
  height: 45px;
  width: ${(props) => props.$width};
  background: linear-gradient(to right, #50256c, #2348a0);
  text-align: center;
  line-height: 45px;

  ${(props) =>
    props.$full &&
    `
    width: 100%;
    text-align: left;
    padding-left: 30px;
    box-sizing: border-box;
    `}
`;

const Underline = styled.div`
  height: 3px;
  width: 100%;
  background: linear-gradient(to right, #50256c, #2348a0);
`;

const Content = styled.div`
  background: #e8e5f8;
  width: 100%;
`;

const BlockContainer = styled.div`
  height: ${(props) => props.$height};
`;

const ErrorContent = styled.div`
  width: 100%;
  height: 520px;
  background: #e8e5f8;
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  padding-top: 50px;
  letter-spacing: 3px;

  ${(props) =>
    props.$size === "small" &&
    `
    height: 150px;
    font-size: 22px;
    letter-spacing: 1px;
  `}
`;

export function BlockTitle({ title, titleWidth }) {
  return (
    <TitleContainer>
      <Title $width={titleWidth}>{title}</Title>
      <Underline />
    </TitleContainer>
  );
}

export function BlockContent({ children }) {
  return <Content>{children}</Content>;
}

export function GeneralBlock({ title, titleWidth, children, full }) {
  return (
    <BlockContainer>
      <Title $width={titleWidth} $full={full}>
        {title}
      </Title>
      <Underline />
      <Content>{children}</Content>
    </BlockContainer>
  );
}

export function ErrorBlock({ size, children }) {
  return (
    <BlockContainer>
      <Title $full={true} />
      <Underline />
      <ErrorContent $size={size}>{children}</ErrorContent>
    </BlockContainer>
  );
}
