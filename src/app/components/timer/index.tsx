"use client";

import { useEffect, useState } from "react";
import styles from "./index.module.css";

type props = {
  handleQuestion: () => void;
  itsLastQuestion: boolean;
};

export default function Timer({ itsLastQuestion, handleQuestion }: props) {
  const [seconds, setSeconds] = useState<number>(10);

  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
      if (seconds == 1 && itsLastQuestion) {
        handleQuestion();
        setSeconds(10);
      }
    };
  }, [seconds]);

  return <div className={styles.time}>{seconds}</div>;
}
