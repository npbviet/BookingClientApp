import styles from "./Transactions.module.css";
import { useContext, useEffect } from "react";

import DataContext from "../../context/DataContext";
import { getTransactionDataByEmail } from "../../util/auth/action";
import TransactionsList from "./TransactionsList";

// Component chính
const Transactions = () => {
  //Lấy dữ liệu từ context
  const { activeUser, transactionData, setTransactionDataFunction } =
    useContext(DataContext);

  useEffect(() => {
    if (activeUser?.email) {
      getTransactionDataByEmail(activeUser.email).then((data) => {
        setTransactionDataFunction(data);
      });
    }
  }, [activeUser.email]);

  return (
    <div className={styles["div-container"]}>
      {!transactionData && (
        <div className={styles["text-infor"]}>Loading your transactions...</div>
      )}

      {transactionData?.length === 0 && (
        <div className={`${styles["text-infor"]} ${styles["no-transaction"]}`}>
          You do not have any transactions!
        </div>
      )}

      {transactionData?.length > 0 && (
        <>
          <p className={styles["top-title"]}>Your Transactions</p>
          <TransactionsList transactions={transactionData} />
        </>
      )}
    </div>
  );
};

export default Transactions;
