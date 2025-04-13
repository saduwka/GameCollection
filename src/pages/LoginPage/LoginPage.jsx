import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import styles from "./LoginPage.module.css";
import arrowIcon from "../../assets/background/arrow.png";
import welcomeImage from "../../assets/background/gamepad.jpg";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [animationStarted, setAnimationStarted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === "test@test.com" && password === "1234") {
      localStorage.setItem("token", "fake-token");
      navigate("/");
    } else {
      alert("Incorrect email or password");
    }
  };

  const handleArrowClick = () => {
    setAnimationStarted(true);
    setShowLoginForm(true);
  };

  return (
    <div className={styles.loginPage}>
      {!showLoginForm ? (
        <motion.div
          className={styles.welcomeScreen}
          initial={{ x: 0 }}
          animate={{ x: animationStarted ? "-100%" : 0 }}
          transition={{ duration: 1 }}
        >
          <img
            src={welcomeImage}
            alt="Welcome"
            className={styles.welcomeImage}
          />
          <div className={styles.ctaBlock}>
            <h1 className={styles.serviceTitle}>PlayHub</h1>
            <button onClick={handleArrowClick} className={styles.arrowButton}>
              <img src={arrowIcon} alt="Enter" />
            </button>
          </div>
        </motion.div>
      ) : (
        <motion.div
          className={styles.loginForm}
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: "0%" }}
          transition={{ duration: 1 }}
        >
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Login</button>
          </form>
        </motion.div>
      )}
    </div>
  );
}
