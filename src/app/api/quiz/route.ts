import axios from "axios";
import { NextResponse } from "next/server";

const uri = `https://the-trivia-api.com/v2/questions?limit=3`;

const getQuestions = async () => {
  return await axios.get(uri);
};

const shuffle = (options: string[]) => {
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }
  return options;
};

const creteOptions = (questionReq: ResponseQuestion) => {
  const { correctAnswer, incorrectAnswers } = questionReq;
  const allOptions = [correctAnswer, ...incorrectAnswers];

  const getLetter = (index: number) => {
    const letters: string[] = ["A", "B", "C", "D"];
    return letters[index];
  };

  return shuffle(allOptions).map((option, index) => {
    const newOption: Option = {
      value: option,
      isCorrect: option === correctAnswer,
      marked: false,
      letter: getLetter(index),
    };
    return newOption;
  });
};

const createQuestion = (questionReq: ResponseQuestion) => {
  const { id, question } = questionReq;

  const newQuestion: Question = {
    id,
    question: question.text,
    options: creteOptions(questionReq),
    isAnswered: false,
    optionSelected: null,
  };

  return newQuestion;
};

const createAllQuestions = (questions: ResponseQuestion[]) => {
  return questions.map((question) => {
    return createQuestion(question);
  });
};

export const GET = async () => {
  const res = await getQuestions();
  const questions: ResponseQuestion[] = await res.data;
  return NextResponse.json(createAllQuestions(questions));
};
