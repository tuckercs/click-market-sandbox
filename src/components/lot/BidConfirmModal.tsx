import { useState, useRef, useLayoutEffect } from "react";
import Select from "react-select";
import Image from "next/image";
import styled from "styled-components";

import { Button } from "@components";
import { usePlaceBidMutation } from "@hooks";
import { formatCurrencyAmount, bidIncrement } from "@utils";

const Modal = styled.div(
  ({ theme }) => `
  background: ${theme.colors.modalOverlayBackground};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`
);

const ModalContent = styled.section(
  ({ theme }) => `
  position: fixed;
  background: ${theme.colors.background};
  width: 80%;
  max-height: 90vh;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: ${theme.borderRadius.medium};
  padding: 45px 61px;
  overflow-y: auto;

  ${theme.down(theme.breakpoints.md)} {
    padding: 45px 15px;
    width: 90%;
  }
`
);

const ModalTitle = styled.h3(
  ({ theme }) => `
  margin-top: 0;
  margin-bottom: 38px;

  ${theme.down(theme.breakpoints.md)} {
    font-size: 20px;
  }
`
);

const DetailContainer = styled.div(
  ({ theme }) => `
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;

  ${theme.down(theme.breakpoints.md)} {
    margin: 0;
    flex-direction: column;
  }
`
);

const DetailLeft = styled.div(
  ({ theme }) => `
  flex: 1;

  ${theme.down(theme.breakpoints.md)} {
    margin: 0 0 40px;
    width: 100%;
  }
`
);

const LotImage = styled.img(
  ({ theme }) => `
  border-radius: ${theme.borderRadius.medium};
  height: 200px;
  object-fit: cover;
  width: 100%;

  ${theme.down(theme.breakpoints.md)} {
    height: auto;
    max-height: 500px;
    width: 100%;
  }
`
);

const LotVideo = styled.video(
  ({ theme }) => `
  border-radius: ${theme.borderRadius.medium};
  height: 200px;
  object-fit: cover;
  width: 100%;

  ${theme.down(theme.breakpoints.md)} {
    height: auto;
    max-height: 500px;
    width: 100%;
  }
`
);

const DetailRight = styled.div(
  ({ theme }) => `
  flex: 1.5;
  margin-left: 1rem;

  ${theme.down(theme.breakpoints.md)} {
    margin: 0;
    width: 100%;
  }
`
);

const CurrentBid = styled.span(
  ({ theme }) => `
  background-color: ${theme.colors.secondary};
  color: ${theme.colors.background};
  border-radius: ${theme.borderRadius.small};
  font: ${theme.fonts.small("bold")};
  padding: 3px 8px;
  margin-bottom: 18px;
`
);

const LotDescription = styled.p(
  ({ theme }) => `
  font: ${theme.fonts.small()};
  line-height: 20px;
`
);

const BidContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SelectBidContainer = styled(Select)(
  ({ theme }) => `
  border-radius: ${theme.borderRadius.small};
  display: flex;
  font: ${theme.fonts.small("bold")};
  height: 40px;
  justify-content: flex-end;
`
);

const Separator = styled.hr`
  border: ${({ theme }) => theme.borders.thin(theme.colors.border)};
  border-bottom: none;
`;

const MaxTotalContainer = styled.div(
  ({ theme }) => `
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font: ${theme.fonts.small("bold")};
  line-height: 18px;
`
);

const ConfirmButton = styled(Button)(
  ({ theme }) => `
  width: 100%;
  max-width: 320px;
  margin: 67px auto;

  ${theme.down(theme.breakpoints.md)} {
    border-radius: ${theme.borderRadius.small};
    font-size: 20px;
    height: 56px;
  }
`
);

const CloseButton = styled.button(
  ({ theme }) => `
  position: absolute;
  top: 0;
  right: 0;
  margin: 24px;
  background: transparent;
  border: none;
  font-size: 24px;

  ${theme.down(theme.breakpoints.md)} {
    & img {
      width: 15px !important;
    }
  }
`
);

interface BidConfirmModalProps {
  handleClose: () => void;
  lot: any;
  mojitoLotData: any;
  setHasBid: (value: boolean) => void;
}

export const BidConfirmModal = ({
  handleClose,
  lot,
  mojitoLotData,
  setHasBid,
}: BidConfirmModalProps) => {
  const submittedAmount = useRef<number | null>(null);
  const [userAvailableMinBid, setUserAvailableMinBid] = useState<number>(
    bidIncrement[0]
  );

  const [availableOptions, setAvailableOptions] = useState<
    { value: number; label: string }[]
  >([]);

  const [bidAmount, setBidAmount] = useState<number>(
    availableOptions[0]?.value
  );

  const [error, setError] = useState<any>(null);
  const [placeBid] = usePlaceBidMutation(lot);

  useLayoutEffect(() => {
    if (mojitoLotData?.bids) {
      const options = bidIncrement.reduce(
        (
          arr: {
            value: number;
            label: string;
          }[],
          e
        ) => {
          if (
            e >= (mojitoLotData?.startingBid || 0) &&
            (e >= mojitoLotData?.currentBid?.nextBidIncrement ||
              !mojitoLotData?.currentBid)
          ) {
            arr.push({ value: e, label: formatCurrencyAmount(e) });
          }
          return arr;
        },
        []
      );

      if (!options.length) {
        options.push({
          value: mojitoLotData?.currentBid?.nextBidIncrement,
          label: formatCurrencyAmount(
            mojitoLotData?.currentBid?.nextBidIncrement
          ),
        });
      }

      if (
        !availableOptions ||
        (availableOptions && availableOptions.length !== options.length)
      ) {
        setAvailableOptions(options);
      }
    }
  }, [
    mojitoLotData?.bids?.length,
    mojitoLotData?.startingBid,
    mojitoLotData?.currentBid?.id,
  ]);

  useLayoutEffect(() => {
    setBidAmount(availableOptions[0]?.value);
  }, [availableOptions[0]?.value]);

  const bidOnChange = (e: any) => {
    const value = e.value;
    if (parseFloat(value) < userAvailableMinBid) {
      setError(
        "Bid amount can't be less than " + userAvailableMinBid.toString()
      );
    } else {
      setError(null);
    }
    setBidAmount(value);
  };

  const onSubmit = async () => {
    try {
      return await placeBid({
        variables: {
          amount: bidAmount,
          marketplaceAuctionLotId: lot.mojitoId,
        },
      }).then(() => {
        handleClose();
        setHasBid(true);
      });
    } catch (e) {
      console.log(e);
      // @ts-ignore
      setError(e?.message);
      setTimeout(() => setError(null), 4000);
      return null;
    }
  };
  return (
    <Modal>
      <ModalContent>
        <ModalTitle>Confirm your bid for {lot.title}</ModalTitle>
        <DetailContainer>
          <DetailLeft>
            {lot.format === "image" && (
              <LotImage src={lot.images[0]} alt={lot.title} />
            )}
            {lot.format === "video" && (
              <LotVideo height={350} width={432} src={lot.videos[0]} />
            )}
          </DetailLeft>
          <DetailRight>
            <CurrentBid>
              Current bid:{" "}
              {formatCurrencyAmount(
                mojitoLotData.currentBid?.amount
                  ? mojitoLotData.currentBid.amount
                  : 0
              )}
            </CurrentBid>
            <LotDescription>
              If you place your maximum limit, the system will automatically
              keep you at the top within the next increment until your max bid
              is met.
            </LotDescription>
            <BidContainer>
              <LotDescription>Your max. bid</LotDescription>
              <SelectBidContainer
                classNamePrefix="reactSelect"
                components={{ IndicatorSeparator: () => null }}
                onChange={bidOnChange}
                menuShouldScrollIntoView={true}
                isSearchable={false}
                isDisabled={
                  !!submittedAmount?.current ||
                  bidAmount > bidIncrement[bidIncrement.length - 1]
                }
                value={
                  submittedAmount?.current
                    ? {
                        value: submittedAmount?.current,
                        label: formatCurrencyAmount(submittedAmount?.current),
                      }
                    : bidAmount
                    ? {
                        value: bidAmount,
                        label: formatCurrencyAmount(bidAmount),
                      }
                    : {
                        value: availableOptions[0]?.value,
                        label: formatCurrencyAmount(availableOptions[0]?.value),
                      }
                }
                options={availableOptions}
              />
            </BidContainer>
            <Separator />
            <MaxTotalContainer>
              <p>max. Total</p>
              <p>{bidAmount} USD</p>
            </MaxTotalContainer>
          </DetailRight>
        </DetailContainer>
        <ConfirmButton onClick={onSubmit} isBig>
          CONFIRM BID
        </ConfirmButton>
        <CloseButton type="button" onClick={handleClose}>
          <Image src="/icons/close.svg" alt="close" width={20} height={20} />
        </CloseButton>
      </ModalContent>
    </Modal>
  );
};
// // TODO: replace with real props and memo
// const areEqual = () => {
//   let equal = false;
//   return equal;
// };

// export default memo(BidConfirmModal, areEqual);
