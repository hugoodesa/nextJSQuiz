import axios from "axios";
import { NextResponse } from "next/server";

const uri = `https://the-trivia-api.com/v2/questions?limit=2`;

const getQuestions = async () => {
  return await axios.get(uri);
};

export const questionDTO = (questions: Question[]): Question[] => {
  return questions.map((questionFull, index) => {
    const { correctAnswer, incorrectAnswers, question } = questionFull;

    const questionDto: Question = {
      id: index,
      correctAnswer,
      incorrectAnswers,
      question: {
        text: question.text,
      },
      options: [correctAnswer, ...incorrectAnswers],
    };

    return questionDto;
  });
};

export const GET = async () => {
  const res = await getQuestions();
  const questions: Question[] = await res.data;
  return NextResponse.json(questionDTO(questions));
};
