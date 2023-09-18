type Question = {
  id: number;
  correctAnswer: string;
  question: {
    text: string;
  };
  incorrectAnswers: string[];
  options: string[];
};
