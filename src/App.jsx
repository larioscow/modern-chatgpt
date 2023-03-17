import { useState } from "react";
import styles from "./App.module.css";

function App() {
  return (
    <>
      <nav className={styles["chat-menu"]} tabIndex="1">
        <button className={styles["new-button"]} tabIndex="2">
          <img src="src/assets/plus.svg" alt="" />
          New Chat
        </button>
      </nav>
      <section className={styles.chatbox}>
        <div className={styles["input-zone"]}>
          <div className={styles["input-bar"]}>
            <textarea rows="1"></textarea>
            <img src="./src/assets/send.svg" alt="" />
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
