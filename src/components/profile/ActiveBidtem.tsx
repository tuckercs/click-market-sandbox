/* eslint-disable @next/next/no-img-element */
import React from "react";
import Image from "next/image";
import styled from "styled-components";

const Lot = styled.a(
  ({ theme }) => `
  border-radius: ${theme.borderRadius.medium};
  color: inherit;
  display: flex;
  flex-direction: column;
  margin: 0 12px 68px;
  max-width: 432px;
  text-align: left;
  text-decoration: none;
  width: 100%;

  ${theme.down(theme.breakpoints.md)} {
    margin: 0 auto 68px;
  }
`
);

const ImageWrapper = styled.div(
  ({ theme }) => `
  position: relative;
  height: 415px;
  width: 432px;

  ${theme.down(theme.breakpoints.sm)} {
    width: 100%;
  }
`
);

const LotImage = styled(Image)(
  ({ theme }) => `
  background-color: ${theme.colors.imageBackground};
  border-radius: ${theme.borderRadius.medium};

  ${theme.down(theme.breakpoints.sm)} {
    width: 100%;
  }
`
);

const Video = styled.video(
  ({ theme }) => `
  background-color: ${theme.colors.imageBackground};
  border-radius: ${theme.borderRadius.medium};
  height: 100%;
  width: 432px;

  ${theme.down(theme.breakpoints.sm)} {
    width: 100%;
  }
`
);

const Row = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-top: 23px;
  overflow: hidden;
  white-space: nowrap;
`;

const LotTitle = styled.h3(
  ({ theme }) => `
  font: ${theme.fonts.h3("bold", theme.fonts.secondary)};
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
`
);

const Paragraph = styled.p(
  ({ theme }) => `
  font: ${theme.fonts.small()};
  margin: 3px 0;
`
);

const Creator = styled.span`
  font-weight: bold;
`;

const LotId = styled(Paragraph)(
  ({ theme }) => `
  color: ${theme.colors.primary};
  font: ${theme.fonts.small("bold")};
`
);

export const ActiveBidtem = ({ lotData }: any) => (
  <Lot href={`lots/${lotData?.slug}`}>
    <ImageWrapper>
      {lotData?.format === "image" && (
        <LotImage
          objectFit={"cover"}
          layout={"fill"}
          quality={75}
          priority={true}
          draggable="false"
          src={lotData?.images[0] + `?w=${400}&h=${400}`}
          alt="lot-image"
        />
      )}
      {lotData?.format === "video" && (
        <Video width={432} src={lotData?.videos[0]} />
      )}
    </ImageWrapper>
    <Row>
      <LotTitle>{lotData?.title}</LotTitle>
    </Row>
    <LotId>{`#${lotData?.lotId}`}</LotId>
    <Paragraph>
      Created by <Creator>{lotData?.author.name}</Creator>
    </Paragraph>
  </Lot>
);
