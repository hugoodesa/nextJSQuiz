import styles from "./index.module.css";

type Props = {
  children: JSX.Element | JSX.Element[] | string | string[];
  backgroundColor: "red" | "blue" | "yellow";
};

const GenericCircle = ({ children, backgroundColor }: Props) => {
  return (
    <div className={styles.circle} style={{ backgroundColor }}>
      {children}
    </div>
  );
};

const RestartButton = () => {
  return <div className={styles.restart}>Restart Test</div>;
};

const Percentage = ({ number }: { number: string }) => {
  return <GenericCircle backgroundColor="red">{number}%</GenericCircle>;
};

const QuestionsNumber = ({ number }: { number: string }) => {
  return <GenericCircle backgroundColor="yellow">{number}</GenericCircle>;
};

const AnswersCorrect = ({ number }: { number: string }) => {
  return <GenericCircle backgroundColor="blue">{number}</GenericCircle>;
};

export default function Result() {
  return (
    <>
      <Percentage number="2" />
      <RestartButton />
    </>
  );
}
