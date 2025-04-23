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
          initial={{ opacity: 1 }}
          animate={{ opacity: animationStarted ? 0 : 1 }}
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
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: showLoginForm ? 1 : 0, scale: showLoginForm ? 1 : 0.95 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className={styles.formContent}>
            <h2>Welcome to gaming world</h2>
            <p className={styles.description}>Log in and let the game begin!</p>
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
              <button className={styles.submitBtn} type="submit">
                <span>Login</span>
              </button>
            </form>
          </div>
        </motion.div>
      )}
    </div>
  );
}
