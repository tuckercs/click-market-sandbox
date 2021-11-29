import { useState, useRef, memo, useLayoutEffect, SFC } from "react";
import Image from "next/image";
import styles from "styles/BidConfirmModal.module.css";
import { formatCurrencyAmount } from "utils";
import { bidIncrement } from "utils/bidIncrement";
import Select from "react-select";
import { ILotData } from "interfaces";
import { useAuction, usePlaceBidMutation } from "hooks";
import { useLocalStorageState } from "ahooks";

interface BidConfirmModalProps {
  handleClose: () => void;
  show: boolean;
  lot: any;
  mojitoLotData: any;
}

const BidConfirmModal: SFC<BidConfirmModalProps> = ({
  handleClose,
  show,
  lot,
  mojitoLotData,
}) => {
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
            e >= mojitoLotData?.currentBid?.nextBidIncrement &&
            e >= (mojitoLotData?.startingBid || 0)
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
          label: formatCurrencyAmount(mojitoLotData?.currentBid?.nextBidIncrement),
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
      setError("Bid amount can't be less than " + userAvailableMinBid.toString());
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
        handleClose()
      });
    } catch (e) {
      console.log(e)
      // @ts-ignore
      setError(e?.message);
      setTimeout(() => setError(null), 4000);
      return null;
    }
  };


  return (
    show && <div className={styles.modal}>
      <section className={styles.modalContent}>
        <p className={styles.modalTitle}>Bid Confirmation</p>
        <div className={styles.detailContainer}>
          <div className={styles.detailLeft}>
            <Image
              className={styles.image}
              src={lot.imagesCollection.items[0].url}
              alt={lot.imagesCollection.items[0].title}
              width={432}
              height={415}
            />
          </div>
          <div className={styles.detailRight}>
            <span className={styles.currentBid}>
              Current bid:{" "}
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
                    ? { value: bidAmount, label: formatCurrencyAmount(bidAmount) }
                    : {
                        value: availableOptions[0]?.value,
                        label: formatCurrencyAmount(availableOptions[0]?.value),
                      }
                }
                options={availableOptions}
              />
              {/* <select className={styles.selectBid}>
                    {options.map((option, index) => <option key={index} value={option.value}>{option.label}</option>)}
                  </select> */}
            </div>
            <hr className={styles.separator} />
            <div className={styles.maxTotalContainer}>
              <p>max. Total</p>
              <p>31,000 usd</p>
            </div>
            <p className={styles.lotDescription}>
              Total price excludes any applicable tax
            </p>
            <div className={styles.disclaimerContainer}>
              <input type="checkbox" name="disclaimer" />
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
            <button className={styles.button} onClick={onSubmit}>CONFIRM BID</button>
          </div>
        </div>
        <button
          type="button"
          onClick={handleClose}
          className={styles.closeButton}
        >
          X
        </button>
      </section>
    </div>
  );
};
// TODO: replace with real props
const areEqual = () => {
  let equal = false;
  return equal;
};

export default memo(BidConfirmModal, areEqual);