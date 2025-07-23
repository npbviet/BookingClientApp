import styles from "./Footer.module.css";

const Footer = () => {
  const footerItems = [
    ["Countries", "Regions", "Cities", "Districts", "Airports", "Hotels"],
    ["Homes", "Apartments", "Resorts", "Villas", "Hostels", "Guest houses"],
    [
      "Unique places to stay",
      "Reviews",
      "Travel articles",
      "Travel communities",
      "Holiday deals",
    ],
    ["Car rental", "Flight Finder", "Restaurant reservations", "Travel Agents"],
    [
      "Customer Service",
      "Partner Help",
      "Careers",
      "Sustainability",
      "Press center",
      "Safety Resource Center",
      "Investor relations",
      "Terms & conditions",
    ],
  ];

  return (
    <div className={styles.footer}>
      <div className={styles.fLists}>
        {footerItems.map((list, index) => (
          <ul key={index} className={styles.fList}>
            {list.map((item, i) => (
              <li key={i} className={styles.fListItem}>
                {item}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
};

export default Footer;
