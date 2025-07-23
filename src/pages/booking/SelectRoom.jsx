import styles from "./SelectRoom.module.css";

const SelectRoom = ({ room, onRoomSelect }) => {
  const handleCheckboxChange = (roomNumber, checked) => {
    onRoomSelect({
      roomID: room.roomID,
      roomOrder: [roomNumber],
      maxPeople: room.maxPeople,
      price: room.price,
    });
  };

  return (
    <div className={styles["room-item"]}>
      <span className={styles["room-title"]}>{room.title}</span>
      <div className={styles["room-content"]}>
        <div>
          <div className={styles["room-desc"]}>{room.desc}</div>
          <div className={styles["max-people"]}>
            Max people: <strong>{room.maxPeople}</strong>
          </div>
        </div>
        <div className={styles["room-list"]}>
          {room.roomNumbers.map((number) => (
            <div key={number} className={styles["room-container"]}>
              <div className={styles["room-number"]}>
                <label style={{ display: "block" }} className={styles["child"]}>
                  {number}
                </label>
                <input
                  className={styles["child"]}
                  type="checkbox"
                  onChange={(e) =>
                    handleCheckboxChange(number, e.target.checked)
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <p className={styles["room-price"]}>{`$${room.price}`}</p>
    </div>
  );
};

export default SelectRoom;
