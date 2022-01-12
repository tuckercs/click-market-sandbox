import { useState, useRef, useLayoutEffect } from "react";
import Select from "react-select";
import Image from "next/image";
import { formatCurrencyAmount, bidIncrement } from "@utils";
import { usePlaceBidMutation } from "@hooks";

interface QuickBidModalProps {
  handleClose: () => void;
  lot: any;
  mojitoLotData: any;
}

export const QuickBidModal = ({
  handleClose,
  lot,
  mojitoLotData,
}: QuickBidModalProps) => {
  const [error, setError] = useState<any>(null);
  const [placeBid] = usePlaceBidMutation(lot);

  const onSubmit = async () => {
    try {
      return await placeBid({
        variables: {
          amount: mojitoLotData.currentBid.nextBidIncrement,
          marketplaceAuctionLotId: lot.mojitoId,
        },
      }).then(() => {
        handleClose();
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
        <p className={styles.modalTitle}>
          Are you sure you want to proceed with this bid?
        </p>
        <p className={styles.modalSubtitle}>
          {lot.title}
        </p>
        <p className={styles.bidAmountText}>Current bid: <span className={styles.bidAmount}>${mojitoLotData.currentBid.amount}</span></p>
        <p className={styles.bidAmountText}>Quick bid: <span className={styles.bidAmount}>${mojitoLotData.currentBid.nextBidIncrement}</span></p>
        <div className={styles.buttonsContainer}>
          <button className={styles.button} onClick={handleClose}>
            CANCEL
          </button>
          <button className={styles.button} onClick={onSubmit}>
            PROCEED
          </button>
        </div>
        <button
          type="button"
          onClick={handleClose}
          className={styles.closeButton}
        >
          <Image src="/icons/close.svg" alt="close" width={20} height={20} />
        </button>
      </section>
    </div>
  );
};
