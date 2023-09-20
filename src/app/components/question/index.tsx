"use client";

import OptionCard from "../questionCard";

type Props = {
  questionSelectOption: (option: Option) => void;
  question: Question;
};

const Question = ({ question, questionSelectOption }: Props) => {
  return (
    <>
      <h1>{question.question}</h1>

      {question.options.map((option, index) => {
        return (
          <OptionCard
            question={question}
            key={index}
            option={option}
            questionSelectOption={questionSelectOption}
          />
        );
      })}
    </>
  );
};

export default Question;
