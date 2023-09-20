"use client";

import { useEffect, useState } from "react";
import styles from "./index.module.css";

type PropsCard = {
  children?: JSX.Element | JSX.Element[];
};

type OptionCardProp = {
  option: Option;
  question: Question;
  questionSelectOption: (option: Option) => void;
};

export default function OptionCard({
  option,
  question,
  questionSelectOption,
}: OptionCardProp) {
  const [cardStyle, setCardStyle] = useState<string>(styles.card);

  const LetterOption = ({ letter }: { letter: string }) => {
    return <div className={styles.letterOption}>{letter}</div>;
  };

  const Option = ({ option }: { option: String }) => {
    return <div className={styles.question}>{option}</div>;
  };

  const Card = ({ children }: PropsCard) => {
    return (
      <div onClick={selectOption} className={cardStyle}>
        {children}
      </div>
    );
  };

  const handleStyle = (option: Option) => {
    if (option.isCorrect && option.marked) {
      setCardStyle(styles.cardCorrect);
    } else if (!option.isCorrect && option.marked) {
      setCardStyle(styles.cardWrong);
    } else {
      setCardStyle(styles.card);
    }
  };

  const selectOption = () => {
    if (!question.isAnswered) {
      const optionNewState = { ...option, marked: true };
      questionSelectOption(optionNewState);
      handleStyle(optionNewState);
    }
  };

  useEffect(() => {
    setCardStyle(styles.card);
  }, [question.options]);

  useEffect(() => {
    if (question.isAnswered && option.isCorrect) {
      setTimeout(() => {
        setCardStyle(styles.cardCorrect);
      }, 100);
    }
  }, [question.isAnswered]);

  return (
    <>
      <Card>
        <LetterOption letter={option.letter} />
        <Option option={option.value} />
      </Card>
    </>
  );
}
