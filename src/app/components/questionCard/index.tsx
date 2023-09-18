"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./index.module.css";

type PropsCard = {
  children?: JSX.Element | JSX.Element[];
  handleCardSelect: () => void;
  style: string;
};

type QuestionPropsCard = {
  option: String;
  index: number;
  isCorrect: boolean;
  setOptionSelected: Dispatch<SetStateAction<boolean>>;
};

const LetterOption = ({ position }: { position: number }) => {
  const letters: string[] = ["A", "B", "C", "D"];

  return <div className={styles.letterOption}>{letters[position]}</div>;
};

const Option = ({ option }: { option: String }) => {
  return <div className={styles.question}>{option}</div>;
};

const Card = ({ style, children, handleCardSelect }: PropsCard) => {
  return (
    <div onClick={handleCardSelect} className={style}>
      {children}
    </div>
  );
};

export default function QuestionCard({
  option,
  index,
  isCorrect,
  setOptionSelected,
}: QuestionPropsCard) {
  const [cardSelected, setCardSelected] = useState<boolean>(false);

  const handleCardSelect = () => {
    setCardSelected(!cardSelected);
  };

  const getCardStyle = (): string => {
    if (isCorrect && cardSelected) {
      return styles.cardCorrect;
    } else if (!isCorrect && cardSelected) {
      return styles.cardWrong;
    } else {
      return styles.card;
    }
  };

  useEffect(() => {
    setCardSelected(false);
    setOptionSelected(true);
  }, [option]);

  return (
    <>
      <Card style={getCardStyle()} handleCardSelect={handleCardSelect}>
        <LetterOption position={index} />
        <Option option={option} />
      </Card>
    </>
  );
}
