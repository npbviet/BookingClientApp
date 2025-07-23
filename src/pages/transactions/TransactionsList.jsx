import styles from "./TransactionsList.module.css";

const TransactionsList = ({ transactions }) => (
  <div>
    {/* Header */}
    <div className={styles.header}>
      <div className={styles["order-number"]}>#</div>
      <div className={styles["hotel-name"]}>Hotel</div>
      <div className={styles["room-number"]}>Room</div>
      <div className={styles["booking-date"]}>Date</div>
      <div className={styles["total-amount"]}>Price</div>
      <div className={styles["payment-method"]}>Payment Method</div>
      <div className={styles["booking-status"]}>Status</div>
    </div>

    {/* Nội dung */}
    <div className={styles["container-content"]}>
      {transactions.map((item, index) => (
        <div
          key={item._id}
          className={`${styles.content} ${styles["custom-border"]}`}
        >
          <div className={styles["order-number"]}>
            {(index + 1).toString().padStart(2, "0")}
          </div>
          <div className={styles["hotel-name"]}>{item.hotel.name}</div>
          <div className={styles["room-number"]}>
            {item.rooms?.flatMap((room) => room.roomOrder).join(", ")}
          </div>
          <div className={styles["booking-date"]}>
            {`${new Date(item.dateStart).toLocaleDateString(
              "vi-VN"
            )} - ${new Date(item.dateEnd).toLocaleDateString("vi-VN")}`}
          </div>
          <div className={styles["total-amount"]}>${item.totalBill}</div>
          <div className={styles["payment-method"]}>{item.paymentMethod}</div>
          <div className={styles["booking-status"]}>
            <span
              className={`${styles["status-style"]} ${styles[item.status]}`}
            >
              {item.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default TransactionsList;
