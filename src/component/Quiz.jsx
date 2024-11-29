import { useState } from "react";
import quizCompleteImg from "../assets/quiz-complete.png";
import QUESTIONS from "../questions";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIndex = userAnswers.length;

  function handleSelectAnswer(selectedAnswer) {
    setUserAnswers((prevAnswers) => [...prevAnswers, selectedAnswer]);
  }

  if (quizIsComplete) {
    return (
      <div id="summary">
        <img src={quizCompleteImg} alt="Trophy Icon" />
        <h2>Quiz Complete</h2>
      </div>
    );
  }

  const activeQuestion = QUESTIONS[activeQuestionIndex];
  const shuffledAnswers = [...activeQuestion.answers];
  shuffledAnswers.sort(() => Math.random() - 0.5);
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  return (
    <div id="quiz">
      <div id="question">
        <h2>{activeQuestion.text}</h2>
        <ul id="answers">
          {activeQuestion.answers.map((answer) => (
            <li key={answer} className="answer">
              <button onClick={() => handleSelectAnswer(answer)}>
                {answer}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
