import { useState, useCallback, useEffect, useRef } from 'react';
import { generateQuestion } from '../utils/generators.js';
import { normalizeAnswer } from '../utils/math.js';

const LS_BEST = 'fastmath_best_streak';
const LS_TYPES = 'fastmath_selected_types';

function pickRandom(selectedTypes) {
  const active = Object.keys(selectedTypes).filter((k) => selectedTypes[k]);
  if (!active.length) return null;
  return active[Math.floor(Math.random() * active.length)];
}

function checkAnswer(value, question) {
  const v = value.trim().toLowerCase();
  const { answer, answerType } = question;
  if (answerType === 'yn') return v === answer;
  if (answerType === 'fraction') return normalizeAnswer(v) === answer;
  const n = parseInt(v, 10);
  return !isNaN(n) && n === parseInt(answer, 10);
}

export function useGameState() {
  const [selectedTypes, setSelectedTypes] = useState(() => {
    try {
      const s = localStorage.getItem(LS_TYPES);
      if (s) return JSON.parse(s);
    } catch {}
    return { ADD_1x1: true };
  });

  const selectedTypesRef = useRef(selectedTypes);
  useEffect(() => { selectedTypesRef.current = selectedTypes; }, [selectedTypes]);

  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [userInput, setUserInput] = useState('');
  const [currentStreak, setCurrentStreak] = useState(0);
  const [allTimeStreak, setAllTimeStreak] = useState(
    () => parseInt(localStorage.getItem(LS_BEST) || '0', 10)
  );
  const [sessionStats, setSessionStats] = useState({});
  const [feedback, setFeedback] = useState(null);
  const timerRef = useRef(null);

  const spawnNext = useCallback(() => {
    const key = pickRandom(selectedTypesRef.current);
    if (!key) return;
    setCurrentQuestion(generateQuestion(key));
    setUserInput('');
    setFeedback(null);
  }, []);

  useEffect(() => {
    spawnNext();
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const toggleType = useCallback((key) => {
    setSelectedTypes((prev) => {
      const active = Object.keys(prev).filter((k) => prev[k]);
      if (prev[key] && active.length === 1) return prev;
      const next = { ...prev, [key]: !prev[key] };
      localStorage.setItem(LS_TYPES, JSON.stringify(next));
      return next;
    });
  }, []);

  const submitAnswer = useCallback(
    (value) => {
      if (!currentQuestion || feedback !== null) return;

      const correct = checkAnswer(value, currentQuestion);

      setSessionStats((prev) => {
        const s = prev[currentQuestion.typeKey] || { correct: 0, total: 0 };
        return { ...prev, [currentQuestion.typeKey]: { correct: s.correct + (correct ? 1 : 0), total: s.total + 1 } };
      });

      if (correct) {
        const next = currentStreak + 1;
        setCurrentStreak(next);
        if (next > allTimeStreak) {
          setAllTimeStreak(next);
          localStorage.setItem(LS_BEST, String(next));
        }
      } else {
        setCurrentStreak(0);
      }

      setFeedback({ correct, correctAnswer: currentQuestion.answer });
      timerRef.current = setTimeout(spawnNext, 1100);
    },
    [currentQuestion, feedback, currentStreak, allTimeStreak, spawnNext]
  );

  return {
    selectedTypes,
    toggleType,
    currentQuestion,
    userInput,
    setUserInput,
    currentStreak,
    allTimeStreak,
    sessionStats,
    feedback,
    submitAnswer,
  };
}
