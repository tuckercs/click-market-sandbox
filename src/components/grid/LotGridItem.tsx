/* eslint-disable @next/next/no-img-element */
import React from "react";
import Image from "next/image";
import { StatusTag } from "@components";
import { formatCurrencyAmount } from "@utils";
<<<<<<< HEAD
import styles from "@styles/LotGridItem.module.css";

export const LotGridItem = ({ lot, mojitoLotData }: any) => (
  <a href={`lots/${lot.slug}`} className={styles.lot}>
    <div className={styles.imageWrapper}>
=======

const Lot = styled.a(
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

const ImageWrapper = styled.div`
  position: relative;
  height: 415px;
  width: 100%;
  margin-bottom: 16px;
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
  margin-bottom: 12px;
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

export const LotGridItem = ({ lot, mojitoLotData, isCollectionItem }: any) => (
  <Lot href={`lots/${lot.slug}`}>
    <ImageWrapper>
>>>>>>> 8338ccf (Little refactor (#51))
      {lot.format === "image" && (
        <Image
          objectFit="cover"
          layout="fill"
          draggable="false"
          className={styles.image}
          src={lot.images[0]}
          alt="lot-image"
        />
      )}
      {lot.format === "video" && (
        <video className={styles.video} preload="none" poster={lot.preview}>
          <source src={lot.videos[0]} />
        </video>
      )}
<<<<<<< HEAD
    </div>
    <div className={styles.tagContainer}>
      <StatusTag mojitoLotData={mojitoLotData} />
    </div>
    <div className={styles.line}>
      <h2>{lot.title}</h2>
    </div>
    <div className={styles.row}>
      <div>
        <p className={styles.id}>{`#${lot.lotId}`}</p>
        <p>
          {mojitoLotData.bidView.isPostSale && mojitoLotData.currentBid ? (
=======
    </ImageWrapper>
    {isCollectionItem && (
      <TagContainer>
        <StatusTag mojitoLotData={mojitoLotData} />
      </TagContainer>
    )}
    <Line>
      <Title>{lot.title}</Title>
    </Line>
    <Row>
      <div>
        <Id>{`#${lot.lotId}`}</Id>
        <Paragraph>
          {isCollectionItem &&
          mojitoLotData?.bidView.isPostSale &&
          mojitoLotData?.currentBid ? (
>>>>>>> 8338ccf (Little refactor (#51))
            <>
              Winner{" "}
              <span>{mojitoLotData.currentBid.userOrganization.user.name}</span>
            </>
          ) : (
            <>
              Created by <span>{lot.author.name}</span>
            </>
          )}
        </p>
      </div>
<<<<<<< HEAD
      {mojitoLotData.bidView.isDuringSale && (
        <div className={styles.currentBid}>
          Current bid:
          <div>
=======
      {isCollectionItem && mojitoLotData?.bidView.isDuringSale && (
        <CurrentBid>
          {strings.COMMON.CURRENT_BID}
          <CurrentBidAmount>
>>>>>>> 8338ccf (Little refactor (#51))
            {formatCurrencyAmount(
              mojitoLotData.currentBid?.amount
                ? mojitoLotData.currentBid?.amount
                : 0
            )}
          </div>
        </div>
      )}
    </div>
  </a>
);
