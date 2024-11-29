import quizCompleteImg from "../assets/quiz-complete.png";
import QUESTIONS from "../questions";

function calculatePercentage(partial, total) {
  return Math.round((partial / total) * 100);
}

export default function Summary({ userAnswers }) {
  const numQuestions = userAnswers.length;
  const numSkipped = userAnswers.filter((a) => a === null).length;
  const numCorrect = userAnswers.filter(
    (a, i) => a === QUESTIONS[i].answers[0]
  ).length;

  const percSkipped = calculatePercentage(numSkipped, numQuestions);
  const percCorrect = calculatePercentage(numCorrect, numQuestions);
  const percIncorrect = 100 - percSkipped - percCorrect;

  return (
    <div id="summary">
      <img src={quizCompleteImg} alt="Trophy Icon" />
      <h2>Quiz Complete</h2>
      <div id="summary-stats">
        <p>
          <span className="number">{percSkipped}%</span>
          <span className="text">Skipped</span>
        </p>
        <p>
          <span className="number">{percCorrect}%</span>
          <span className="text">Answered Correctly</span>
        </p>
        <p>
          <span className="number">{percIncorrect}%</span>
          <span className="text">Answered Incorrectly</span>
        </p>
      </div>
      <ol>
        {userAnswers.map((answer, index) => {
          let cssClass = "user-answer";

          if (answer === null) {
            cssClass += " skipped";
          } else if (answer === QUESTIONS[index].answers[0]) {
            cssClass += " correct";
          } else {
            cssClass += " wrong";
          }

          return (
            <li key={index}>
              <h3>{index + 1}</h3>
              <p className="question">{QUESTIONS[index].text}</p>
              <p className={cssClass}>{answer ?? "Skipped"}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
