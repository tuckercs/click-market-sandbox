import Image from "next/image";
import styles from "styles/BidConfirmModal.module.css";
import { formatCurrencyAmount } from "utils";
import { bidIncrement } from "utils/bidIncrement";

const BidConfirmModal = ({ handleClose, show, lot }: any) => {
    
    if(!show) return null;

    const options = bidIncrement.reduce(
      (
        arr: {
          value: number;
          label: string;
        }[],
        e
      ) => {
          arr.push({ value: e, label: formatCurrencyAmount(e) });
        return arr;
      },
      []
    )

    return (
      <div className={styles.modal}>
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
                <span className={styles.currentBid}>Current bid: $30000</span>
                <p className={styles.lotDescription}>
                  If you place your maximum limit, the system will automatically
                  keep you at the top within the next increment until your max
                  bid is met.
                </p>
                <div className={styles.bidContainer}>
                  <p className={styles.lotDescription}>Your max. bid</p>
                  <select className={styles.selectBid}>
                    {options.map((option, index) => <option value={option.value}>{option.label}</option>)}
                  </select>
                </div>
                <hr className={styles.separator}/>
                <div className={styles.maxTotalContainer}>
                  <p>max. Total</p>
                  <p>31,000 usd</p>
                </div>
                <p className={styles.lotDescription}>Total price excludes any applicable tax</p>
                <div className={styles.disclaimerContainer}>
                  <input type="checkbox" name="disclaimer" />
                  <p className={styles.disclaimerText}>
                    By checking this box you confirm that you have read and agree to be bound by the Condition of Sale and any applicable Terms of Guarantee for this bid and any later bids you place on this or any other lot in this sale. <strong>Bids placed in Online-Only sales cannot be cancelled except for the limited reasons set out in the Conditions of Sale.</strong>
                  </p>
                </div>
                <button className={styles.button}>CONFIRM BID</button>
              </div>
            </div>
          <button type="button" onClick={handleClose} className={styles.closeButton}>
            X
          </button>
        </section>
      </div>
    );
  };

export default BidConfirmModal;
