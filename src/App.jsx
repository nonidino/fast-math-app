import { useGameState } from './hooks/useGameState.js';
import { useTimer } from './hooks/useTimer.js';
import TypeSidebar from './components/TypeSidebar.jsx';
import SessionSidebar from './components/SessionSidebar.jsx';
import Timer from './components/Timer.jsx';
import StreakDisplay from './components/StreakDisplay.jsx';
import QuestionArea from './components/QuestionArea.jsx';
import './App.css';

export default function App() {
  const game = useGameState();
  const seconds = useTimer(game.currentQuestion?.id ?? 0);

  return (
    <div className="app">
      <aside className="sidebar sidebar-left">
        <TypeSidebar selectedTypes={game.selectedTypes} onToggle={game.toggleType} />
      </aside>

      <main className="center">
        <div className="center-top">
          <StreakDisplay current={game.currentStreak} best={game.allTimeStreak} />
          <Timer seconds={seconds} />
        </div>
        <QuestionArea
          question={game.currentQuestion}
          userInput={game.userInput}
          setUserInput={game.setUserInput}
          feedback={game.feedback}
          onSubmit={game.submitAnswer}
        />
      </main>

      <aside className="sidebar sidebar-right">
        <SessionSidebar stats={game.sessionStats} selectedTypes={game.selectedTypes} />
      </aside>
    </div>
  );
}
