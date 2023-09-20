"use client";

import { useEffect, useState } from "react";
import styles from "./index.module.css";

type props = {
  hasNext: boolean;
  handleQuestion: () => void;
  redirectToScore: () => void;
};

export default function Timer({
  hasNext,
  handleQuestion,
  redirectToScore,
}: props) {
  const [seconds, setSeconds] = useState<number>(10);

  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
      if (seconds == 1 && hasNext) {
        handleQuestion();
        setSeconds(10);
      }

      if (!hasNext && seconds == 1) {
        redirectToScore();
      }
    };
  }, [seconds]);

  return <div className={styles.time}>{seconds}</div>;
}
