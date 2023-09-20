"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Question from "../question";
import styles from "./index.module.css";
import Timer from "../timer";
import { redirect } from "next/navigation";
import { GET } from "@/app/api/quiz/route";

const getQuestions = async () => {
  return await GET();
};

const Game = () => {
  const [questionNumber, setQuestionNumber] = useState<number>(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question>({
    id: "",
    options: [],
    question: "",
    isAnswered: false,
    optionSelected: null,
  });

  useEffect(() => {
    const loadQuestions = async () => {
      const data = (await getQuestions()).json();
      const reponse = await data;
      setQuestions(reponse);
      setCurrentQuestion(reponse[0]);
    };

    loadQuestions();
  }, []);

  const getNextQuestion = () => {
    const position = questionNumber + 1;
    setQuestionNumber(position);
    setCurrentQuestion(questions[position]);
  };

  const questionSelectOption = (optionSelected: Option) => {
    setCurrentQuestion({
      ...currentQuestion,
      isAnswered: true,
      optionSelected,
    });

    const changedQuestion = {
      ...currentQuestion,
      optionSelected,
      isAnswered: true,
    };
    const newStateQuestions = [...questions];
    newStateQuestions[questionNumber] = changedQuestion;
    setQuestions([...newStateQuestions]);
  };

  const hasNext = () => {
    return questions.length > questionNumber + 1;
  };

  const checkResults = () => {
    const howManyQuestions = questions.length;
    const howManyCorrects = questions.filter(
      (question) =>
        question.optionSelected?.isCorrect &&
        question.optionSelected?.isCorrect !== null
    ).length;

    return {
      howManyQuestions,
      howManyCorrects,
    };
  };

  const redirectToScore = () => {
    const { howManyCorrects, howManyQuestions } = checkResults();
    redirect(`pages/score/${howManyQuestions}/${howManyCorrects}`);
  };

  return (
    <div className={styles.game}>
      <Timer
        hasNext={hasNext()}
        handleQuestion={getNextQuestion}
        redirectToScore={redirectToScore}
      />
      <Question
        questionSelectOption={questionSelectOption}
        question={currentQuestion}
      />
    </div>
  );
};

export default Game;
