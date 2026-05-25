import { useRef, useEffect } from 'react';

export default function QuestionArea({ question, userInput, setUserInput, feedback, onSubmit }) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (!feedback && inputRef.current) inputRef.current.focus();
  }, [question, feedback]);

  if (!question) {
    return <div className="question-area"><p className="question-loading">Loading…</p></div>;
  }

  const handleKey = (e) => {
    if (e.key === 'Enter') onSubmit(userInput);
  };

  const disabled = feedback !== null;

  return (
    <div className="question-area">
      <div className="question-text">{question.display}</div>

      {question.answerType === 'yn' ? (
        <div className="yn-buttons">
          <button className="yn-btn yes" onClick={() => onSubmit('yes')} disabled={disabled}>
            Yes
          </button>
          <button className="yn-btn no" onClick={() => onSubmit('no')} disabled={disabled}>
            No
          </button>
        </div>
      ) : (
        <div className="answer-row">
          <input
            ref={inputRef}
            className="answer-input"
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={handleKey}
            disabled={disabled}
            autoComplete="off"
            spellCheck="false"
            placeholder="?"
          />
          <button className="submit-btn" onClick={() => onSubmit(userInput)} disabled={disabled}>
            &#8594;
          </button>
        </div>
      )}

      {feedback && (
        <div className={`feedback ${feedback.correct ? 'feedback-correct' : 'feedback-wrong'}`}>
          {feedback.correct ? 'Correct!' : `Wrong — answer: ${feedback.correctAnswer}`}
        </div>
      )}
    </div>
  );
}
