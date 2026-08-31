import { useState } from 'react'
import { generateFractionProblem } from './prob_generator'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

function App() {
  const [difficulty, setDifficulty] = useState('easy');
  const [questions, setQuestions] = useState(generateFractionProblem('easy'));
  const [isvisible, setIsVisible] = useState(false);
  const [isopen, setIsOpen] = useState(false);

  const difficultyOptions = ['easy', 'medium', 'hard'];

  // variable to show answer or not
  const handleToggle = () => {
    setIsVisible(!isvisible);
  };


  function newQuestion() {
    setQuestions(generateFractionProblem(difficulty));
  }

  const handleSelect = (option) => {
    setDifficulty(option);
    setIsOpen(false);
    setQuestions(generateFractionProblem(option));
    setIsVisible(false); 
  };


    return (
        <div>
            <h1>Fraction Knockout</h1>
            <div className="dropdown">
                <button onClick={() => setIsOpen(!isopen)}>
                    Difficulty: {difficulty}
                </button>
                {isopen && (
                    <div className="dropdown-content">
                        {difficultyOptions.map((option) => (
                            <button key={option} onClick={() => handleSelect(option)}>
                                {option}
                            </button>
                        ))}
                    </div>
                )}
            </div>
            <h2>Question</h2>
            <p style={{ fontSize: '24px' }}>{questions.problem}</p>
            <p>Difficulty: {questions.difficulty}</p>
            <button onClick={handleToggle}> 
              {isvisible ? 'Hide Answer' : 'Show Answer'}
            </button>
            {isvisible && (
              <div>
                <h2>Answer</h2>
                <p>{questions.solution}</p>
              </div>
            )}
            <div><button onClick={newQuestion}>New Question</button></div>
        </div>
    );
}


export default App;