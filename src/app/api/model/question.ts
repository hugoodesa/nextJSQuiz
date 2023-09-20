type Option = {
  value: string;
  marked: boolean;
  isCorrect: boolean;
  letter: string;
};

type Question = {
  id: string;
  question: string;
  options: Option[];
  isAnswered: boolean;
  optionSelected: Option | null;
};
