"use client";

import QuestionCard from "../questionCard";
import { useState } from "react";

const Question = ({ question }: { question: Question }) => {
  const [optionSelected, setOptionSelected] = useState<boolean>(false);

  const itsCorrectQuestion = (option: string) => {
    return question.correctAnswer === option;
  };

  const highLightTheCorrectOne = () => {
    
  };

  return (
    <>
      <h1>{question.question.text}</h1>

      {question.options.map((option, index) => {
        const isCorrect = itsCorrectQuestion(option);

        return (
          <QuestionCard
            isCorrect={isCorrect}
            key={index}
            option={option}
            index={index}
            setOptionSelected={setOptionSelected}
          />
        );
      })}
    </>
  );
};

export default Question;
