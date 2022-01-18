/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { StatusTag } from "@components";
import { strings } from "@constants";
import { formatCurrencyAmount } from "@utils";
import { QuickBidModal } from "../lot";

const Lot = styled.div(
  ({ theme }) => `
  border-radius: ${theme.borderRadius.medium};
  color: inherit;
  display: flex;
  flex-direction: column;
  margin: 0 12px 68px;
  max-width: 400px;
  text-align: left;
  text-decoration: none;
  width: 100%;

  ${theme.down(theme.breakpoints.md)} {
    margin: 0 auto 68px;
  }
`
);

const ImageWrapper = styled.a`
  position: relative;
  height: 415px;
  width: 100%;
`;

const LotImage = styled(Image)(
  ({ theme }) => `
  background-color: ${theme.colors.imageBackground};
  border-radius: ${theme.borderRadius.medium};
`
);

const Video = styled.video(
  ({ theme }) => `
  background-color: ${theme.colors.imageBackground};
  border-radius: ${theme.borderRadius.medium};
  height: 100%;
  width: 100%;
`
);

const TagContainer = styled.div`
  align-self: flex-start;
  margin: 16px 0 12px;
`;

const Line = styled.div`
  justify-content: space-between;
  overflow: hidden;
  white-space: nowrap;
`;

const Title = styled.h3(
  ({ theme }) => `
  font: ${theme.fonts.h3("bold", theme.fonts.secondary)};
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
`
);

const Row = styled.div(
  ({ theme }) => `
  align-items: flex-end;
  display: flex;
  font: ${theme.fonts.small()};
  justify-content: space-between;
`
);

const Paragraph = styled.p`
  margin: 3px 0;
`;

const WinnerName = styled.span(
  ({ theme }) => `
  color: ${theme.colors.secondary};
  font-weight: bold;
`
);

const CreatorName = styled.span`
  font-weight: bold;
`;

const Id = styled(Paragraph)(
  ({ theme }) => `
  color: ${theme.colors.primary};
  font-weight: bold;
`
);

const CurrentBid = styled.div`
  text-align: right;
`;

const CurrentBidAmount = styled.div(
  ({ theme }) => `
  color: ${theme.colors.primary};
  font: ${theme.fonts.body("bold")};
`
);

const QuickBidButton = styled.button(
  ({ theme }) => `
    background-color: #ff00ff;
    border-radius: 8px;
    border: none;
    font-family: "PostGrotesk", sans-serif;
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 18px;
    color: #ffffff;
    padding: 5px 10px;
`
);

export const LotGridItem = ({ lot, mojitoLotData, profile}: any) => {
  const [showQuickBidModal, setShowQuickBidModal] = useState(false);
  const { isAuthenticated } = useAuth0();

  const showQuickBid = () => {
    return mojitoLotData.currentBid.marketplaceUser.id !== profile?.me?.id && isAuthenticated && mojitoLotData.bidView.isDuringSale
  }

  return (
    <Lot>
      <ImageWrapper href={`lots/${lot.slug}`}>
        {lot.format === "image" && (
          <LotImage
            objectFit="cover"
            layout="fill"
            draggable="false"
            src={lot.image}
            alt="lot-image"
          />
        )}
        {lot.format === "video" && (
          <Video preload="none" poster={lot.preview}>
            <source src={lot.video} />
          </Video>
        )}
      </ImageWrapper>
      <TagContainer>
        <StatusTag mojitoLotData={mojitoLotData} />
      </TagContainer>
      <Row>
        <Title>{lot.title}</Title>
        {mojitoLotData.bidView.isDuringSale && (
          <CurrentBid>
            {strings.COMMON.CURRENT_BID}
            <CurrentBidAmount>
              {formatCurrencyAmount(
                mojitoLotData.currentBid?.amount
                  ? mojitoLotData.currentBid?.amount
                  : 0
              )}
            </CurrentBidAmount>
          </CurrentBid>
        )}
      </Row>
      <Row>
        <div>
          <Id>{`#${lot.lotId}`}</Id>
          <Paragraph>
            {mojitoLotData.bidView.isPostSale && mojitoLotData.currentBid ? (
              <>
                {strings.COMMON.WINNER}
                <WinnerName>
                  {mojitoLotData.currentBid.userOrganization.user.name}
                </WinnerName>
              </>
            ) : (
              <>
                {strings.COMMON.CREATED_BY}
                <CreatorName>{lot.author.name}</CreatorName>
              </>
            )}
          </Paragraph>
        </div>
        {showQuickBid() &&
          mojitoLotData.currentBid?.amount && (
            <QuickBidButton onClick={() => setShowQuickBidModal(true)}>
              {strings.LOT.QUICKBID} $
              {mojitoLotData.currentBid.nextBidIncrement}
            </QuickBidButton>
          )}
      </Row>
      {showQuickBidModal && (
        <QuickBidModal
          handleClose={() => setShowQuickBidModal(false)}
          handleCustomBid={() => {}}
          lot={lot}
          mojitoLotData={mojitoLotData}
        />
      )}
    </Lot>
  );
};
