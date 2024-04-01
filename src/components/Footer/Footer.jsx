import React, { useState, useEffect } from "react";
import styles from "./Footer.module.css";
import CartMobileIcon from "../../assets/CartMobileIcon.svg";
import HomeIcon from "../../assets/HomeIcon.svg";
import InvoiceIcon from "../../assets/InvoiceIcon.svg";
import LoginIcon from "../../assets/LoginMobileIcon.svg";
import { useNavigate, Link } from "react-router-dom";
function Footer({ count }) {
  // const [count, setCount] = useState(0);
  // useEffect(() => {
  //   setCount(cartItem[0].totalQuantity);
  // }, [cartItem]);
  const [isAuthorized, setIsAuthorized] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const name = localStorage.getItem("name");

        if (!token) {
          console.log("token :", token);
          return;
        }

        if (token) {
          console.log("token :", token, name);
          setIsAuthorized(true);
        } else {
          throw new Error("User not authorized");
        }
      } catch (error) {
        console.error(error);
        // Redirect to login or handle unauthorized access
      }
    };

    fetchUserData();
  }, []);
  const handleCart = () => {
    if (isAuthorized) {
      navigate("/cart");
    } else {
      navigate("/login");
    }
  };
  const handleInvoice = () => {
    if (isAuthorized) {
      console.log("i am in invoice");
      navigate("/invoice");
    } else {
      console.log("i am not in invoice");
      navigate("/login");
    }
  };
  const handleLogin = () => {
    if (isAuthorized) {
      console.log("i am login");
      localStorage.removeItem("token");
      localStorage.clear();
      setIsAuthorized(false);
      navigate("/login");
    } else {
      console.log("i am not login");
      navigate("/login");
    }
  };
  return (
    <div>
      <div className={styles.container}>
        <div>Musicart | All rights reserved</div>
      </div>
      <div className={styles.mobileViewContainer}>
        <div className={styles.home}>
          <div className={styles.line}></div>
          <img src={HomeIcon} alt="" />
          <div className={styles.text}>Home</div>
        </div>
        <div
          className={styles.cart}
          onClick={() => {
            handleCart();
          }}
        >
          <div className={styles.line}></div>
          <div className={styles.count}>{count}</div>
          <img src={CartMobileIcon} alt="" />
          <div className={styles.text}>Cart</div>
        </div>
        <div className={styles.invoice} onClick={handleInvoice}>
          <div className={styles.line}></div>
          <img src={InvoiceIcon} alt="" />
          <div className={styles.text}>Invoice</div>
        </div>
        <div
          className={styles.login}
          onClick={() => {
            handleLogin();
          }}
        >
          <div className={styles.line}></div>
          <img src={LoginIcon} alt="" />
          {!isAuthorized && <div className={styles.text}>Login</div>}
          {isAuthorized && <div className={styles.text}>Logout</div>}
        </div>
      </div>
    </div>
  );
}

export default Footer;
