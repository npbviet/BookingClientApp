import styles from "./Button.module.css";

export default function Button({
  children,
  type = "primary",
  onClick,
  disabled,
  className = "",
}) {
  return (
    <button
      className={`${styles.button} ${styles[type]} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
