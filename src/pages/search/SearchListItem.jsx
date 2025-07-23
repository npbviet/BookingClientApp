import { useNavigate } from "react-router-dom";
import { checkLogin } from "../../util/auth/auth";
import styles from "./SearchListItem.module.css";

export default function SearchListItem({ item }) {
  const navigate = useNavigate();

  async function seeAvailabilityHandler() {
    const isLoggedIn = await checkLogin();
    if (isLoggedIn) navigate("/detail/" + item.id);
  }

  function capitalizeWords(str) {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  return (
    <div className={styles.searchItem}>
      <img className={styles.siImg} src={item.image_url} alt="hotel" />

      <div className={styles.siDesc}>
        <h1 className={styles.siTitle}>{capitalizeWords(item.name)}</h1>
        <span className={styles.siDistance}>{item.distance} from center</span>
        <span className={styles.siTaxiOp}>{item.tag}</span>
        <span className={styles.siSubTitle}>{item.description}</span>
        <span className={styles.siFeature}>{item.type}</span>
        {item.free_cancel && (
          <div>
            <div className={styles.siCancelOp}>Free cancellation</div>
            <div className={styles.siCancelSubtitle}>
              You can cancel later, so lock in this great price today!
            </div>
          </div>
        )}
      </div>

      <div className={styles.siDetails}>
        <div className={styles.siRating}>
          <span>{item.rate_text}</span>
          <button>{item.rate.toFixed(1)}</button>
        </div>
        <div className={styles.siDetailTexts}>
          <div className={styles.siPrice}>${item.price}</div>
          <div className={styles.siTaxOp}>Includes taxes and fees</div>
          <button
            className={styles.siCheckButton}
            onClick={seeAvailabilityHandler}
          >
            See availability
          </button>
        </div>
      </div>
    </div>
  );
}
