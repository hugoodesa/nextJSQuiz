"use client";
import { questionDTO } from "@/app/api/quiz/route";
import axios from "axios";
import { useEffect, useState } from "react";
import Question from "../question";
import styles from "./index.module.css";
import Timer from "../timer";

const getQuestions = async () => {
  return await axios.get("http://localhost:3000/api/quiz");
};

const Game = () => {
  const initialState: Question = {
    id: 0,
    correctAnswer: "",
    incorrectAnswers: [],
    options: [],
    question: {
      text: "",
    },
  };

  const [currentQuestion, setCurrentQuestion] =
    useState<Question>(initialState);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [questionNumber, setQuestionNumber] = useState<number>(0);

  useEffect(() => {
    const loadQuestions = async () => {
      const { data } = await getQuestions();
      const loadedQuestions = questionDTO(data);
      setQuestions(loadedQuestions);
      setCurrentQuestion(loadedQuestions[0]);
    };

    loadQuestions();
  }, []);

  const isLastQuestion = (): boolean => {
    return questions.length > questionNumber + 1;
  };

  const handleQuestion = () => {
    if (isLastQuestion()) {
      const newQuestionNumber = questionNumber + 1;
      const question = questions[newQuestionNumber];
      setQuestionNumber(newQuestionNumber);
      setCurrentQuestion(question);
    }
  };

  return (
    <div className={styles.game}>
      <Timer
        itsLastQuestion={isLastQuestion()}
        handleQuestion={handleQuestion}
      />
      <Question question={currentQuestion} />
    </div>
  );
};

export default Game;
