import { useCallback, useRef, useState } from "react";
import quizCompleteImg from "../assets/quiz-complete.png";
import QUESTIONS from "../questions";
import QuestionTimer from "./QuestionTimer";

export default function Quiz() {
  const shuffledAnswers = useRef();
  const [answerState, setAnswerState] = useState("");
  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIndex =
    answerState === "" ? userAnswers.length : userAnswers.length - 1;

  const handleSelectAnswer = useCallback(
    function handleSelectAnswer(selectedAnswer) {
      setAnswerState("answered");
      setUserAnswers((prevAnswers) => [...prevAnswers, selectedAnswer]);

      setTimeout(() => {
        if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
          setAnswerState("correct");
        } else {
          setAnswerState("wrong");
        }

        setTimeout(() => {
          setAnswerState("");
        }, 2000);
      }, 1000);
    },
    [activeQuestionIndex]
  );

  const handleSkipAnswer = useCallback(() => {
    handleSelectAnswer(null);
  }, [handleSelectAnswer]);

  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  if (quizIsComplete) {
    return (
      <div id="summary">
        <img src={quizCompleteImg} alt="Trophy Icon" />
        <h2>Quiz Complete</h2>
      </div>
    );
  }

  const activeQuestion = QUESTIONS[activeQuestionIndex];
  if (!shuffledAnswers.current) {
    shuffledAnswers.current = [...activeQuestion.answers];
    shuffledAnswers.current.sort(() => Math.random() - 0.5);
  }

  return (
    <div id="quiz">
      <div id="question">
        <QuestionTimer
          key={activeQuestionIndex}
          timeout={10000}
          onTimeout={handleSkipAnswer}
        />
        <h2>{activeQuestion.text}</h2>
        <ul id="answers">
          {shuffledAnswers.current.map((answer) => {
            let cssClass = "";
            const isSelected = userAnswers[userAnswers.length - 1] === answer;

            if (isSelected && answerState === "answered") {
              cssClass = "selected";
            }

            if (
              isSelected &&
              (answerState === "correct" || answerState === "wrong")
            ) {
              cssClass = answerState;
            }

            return (
              <li key={answer} className="answer">
                <button
                  onClick={() => handleSelectAnswer(answer)}
                  className={cssClass}
                >
                  {answer}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
