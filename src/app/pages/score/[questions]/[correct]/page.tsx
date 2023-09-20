"use client";

import { useParams } from "next/navigation";
import Result from "@/app/components/result";

export default function Score() {
  const { correct, questions } = useParams();

  return (
    <Result corrects={Number(correct)} questionsNumber={Number(questions)} />
  );
}
