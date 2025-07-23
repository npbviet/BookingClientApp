import styles from "./Authen.module.css";
import {
  Form,
  useActionData,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useEffect, useRef, useState, useCallback, useContext } from "react";
import Button from "../../components/button/Button";
import DataContext from "../../context/DataContext"; // Import DataContext

const Authen = () => {
  const [urlSearchParam] = useSearchParams();
  const authMode = urlSearchParam.get("mode") ?? "login";
  const navigate = useNavigate();
  const refAuthForm = useRef();
  const resData = useActionData();
  const { setActiveUserFunction } = useContext(DataContext); // Lấy function từ context

  const [textError, setTextError] = useState(null);
  const [isAuthError, setIsAuthError] = useState(false);

  useEffect(() => {
    if (!resData) return;

    // console.log("Response Data:", resData); // Kiểm tra dữ liệu nhận được

    if (resData.isAuthError) {
      setIsAuthError(true);
      setTextError(resData.message);
    } else {
      if (authMode === "signup") {
        alert("Đăng ký thành công!");
        navigate("/auth?mode=login");
      } else if (authMode === "login") {
        console.log("Email từ response:", resData.email); // Kiểm tra email

        if (resData.email) {
          localStorage.setItem("userEmail", JSON.stringify(resData.email));
          setActiveUserFunction(resData.email, true);
        }

        alert("Đăng nhập thành công!");
        navigate("/");
      }
    }
  }, [resData, authMode, navigate, setActiveUserFunction]);
  useEffect(() => {
    if (refAuthForm.current) {
      refAuthForm.current.reset();
    }
    setIsAuthError(false);
    setTextError(null);
  }, [authMode]);

  const onChangeForm = useCallback(() => {
    if (isAuthError) {
      setTextError(null);
      setIsAuthError(false);
    }
  }, [isAuthError]);

  return (
    <div className={styles.auth}>
      <Form
        className={styles.authForm}
        method="POST"
        ref={refAuthForm}
        onChange={onChangeForm}
      >
        {isAuthError && (
          <div className={styles["auth-error-infor"]}>{textError}</div>
        )}
        <p className={styles.authTitle}>
          {authMode === "login" ? "Login" : "Sign Up"}
        </p>
        <input
          type="text"
          name="email"
          placeholder="Enter email"
          required
          autoComplete="off"
        />
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          required
          autoComplete="off"
        />
        <Button>{authMode === "login" ? "Login" : "Create Account"}</Button>
        <input type="hidden" name="authMode" value={authMode} />
      </Form>
    </div>
  );
};

export default Authen;
