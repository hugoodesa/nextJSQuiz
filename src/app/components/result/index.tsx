"use client";
import Link from "next/link";
import styles from "./index.module.css";
import { redirect } from "next/navigation";

type Props = {
  children: JSX.Element | JSX.Element[] | string | number | string[];
  backgroundColor: string;
};

const GenericCircle = ({ children, backgroundColor }: Props) => {
  return (
    <div className={styles.circle} style={{ backgroundColor }}>
      {children}
    </div>
  );
};

const RestartButton = () => {
  return (
    <Link className={styles.restart} href={`/`}>
      BACK
    </Link>
  );
};

const Percentage = ({ number }: { number: number }) => {
  return (
    <div className={styles.frame}>
      <h1>Percentage</h1>
      <GenericCircle backgroundColor="#c0392b">{number}</GenericCircle>
    </div>
  );
};

const QuestionsNumber = ({ number }: { number: number }) => {
  return (
    <div className={styles.frame}>
      <h1>Questions Number</h1>
      <GenericCircle backgroundColor="#e67e22">{number}</GenericCircle>
    </div>
  );
};

const AnswersCorrect = ({ number }: { number: number }) => {
  return (
    <div className={styles.frame}>
      <h1>Answers Correct</h1>
      <GenericCircle backgroundColor="#3498db">{number}</GenericCircle>
    </div>
  );
};

export default function Result({
  corrects,
  questionsNumber,
}: {
  corrects: number;
  questionsNumber: number;
}) {
  return (
    <div className={styles.result}>
      <h1>Score</h1>
      <div className={styles.indicators}>
        <QuestionsNumber number={questionsNumber} />
        <AnswersCorrect number={corrects} />
        <Percentage
          number={Number(((corrects / questionsNumber) * 100).toFixed(2))}
        />
      </div>
      <RestartButton />
    </div>
  );
}
