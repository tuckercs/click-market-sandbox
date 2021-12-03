import { useState, useRef, useLayoutEffect } from "react";
import Image from "next/image";
import { formatCurrencyAmount } from "utils";
import { bidIncrement } from "utils/bidIncrement";
import Select from "react-select";
import { usePlaceBidMutation } from "hooks";
import styles from "styles/BidConfirmModal.module.css";

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
  const [checkbox, setCheckbox] = useState(false);

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
            (e >= mojitoLotData?.currentBid?.nextBidIncrement &&
              e >= (mojitoLotData?.startingBid || 0)) ||
            !mojitoLotData?.currentBid
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
    <div className={styles.modal}>
      <section className={styles.modalContent}>
        <p className={styles.modalTitle}>Bid Confirmation</p>
        <div className={styles.detailContainer}>
          <div className={styles.detailLeft}>
            {lot.format === "image" && (
              <img
                className={styles.image}
                src={lot.images[0]}
                alt={lot.title}
                height={350}
                width={432}
                
              />
            )}
            {lot.format === "video" && (
              <video
                className={styles.video}
                height={350}
                width={432}
                src={lot.videos[0]}
              />
            )}
          </div>
          <div className={styles.detailRight}>
            <span className={styles.currentBid}>
              Current Bidding:{" "}
              {formatCurrencyAmount(
                mojitoLotData.currentBid?.amount
                  ? mojitoLotData.currentBid.amount
                  : 0
              )}
            </span>
            <p className={styles.lotDescription}>
              If you place your maximum limit, the system will automatically
              keep you at the top within the next increment until your max bid
              is met.
            </p>
            <div className={styles.bidContainer}>
              <p className={styles.lotDescription}>Your max. bid</p>
              <Select
                className={styles.selectBidContainer}
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
            </div>
            <hr className={styles.separator} />
            <div className={styles.maxTotalContainer}>
              <p>max. Total</p>
              <p>{bidAmount} USD</p>
            </div>
            <p className={styles.lotDescription}>
              Total price excludes any applicable tax
            </p>
            <button
              className={styles.button}
              onClick={onSubmit}
              disabled={!checkbox}
            >
              CONFIRM BID
            </button>
            <div className={styles.disclaimerContainer}>
              <input
                type="checkbox"
                name="disclaimer"
                onChange={(event) => setCheckbox(event.target.checked)}
              />
              <p className={styles.disclaimerText}>
                By checking this box you confirm that you have read and agree to
                be bound by the Condition of Sale and any applicable Terms of
                Guarantee for this bid and any later bids you place on this or
                any other lot in this sale.{" "}
                <strong>
                  Bids placed in Online-Only sales cannot be cancelled except
                  for the limited reasons set out in the Conditions of Sale.
                </strong>
              </p>
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={handleClose}
          className={styles.closeButton}
        >
          <Image
            src="/icons/close.svg"
            alt="close"
            width={20}
            height={20}
          />
        </button>
      </section>
    </div>
  );
};
// // TODO: replace with real props and memo
// const areEqual = () => {
//   let equal = false;
//   return equal;
// };

// export default memo(BidConfirmModal, areEqual);
