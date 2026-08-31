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

  const audio = [
    '/public/audio/boomshakalaka.mp3',
    '/public/audio/bullseye.mp3',
    '/public/audio/finger-roll.mp3',
    '/public/audio/heating-up.mp3',
    '/public/audio/hes-on-fire-nba-jam.mp3',
    '/public/audio/shoots.mp3',
  ]

  const backgroundmusic = '/public/audio/knockout/public/audio/Main Theme - NBA Jam (SNES) [OST].mp3'

  // variable to show answer or not
  const handleToggle = () => {
    setIsVisible(!isvisible);
  };

  const randomAudio = () => {
    const randomIndex = Math.floor(Math.random() * audio.length);
    const selectedAudio = audio[randomIndex];
    const audioElement = new Audio(selectedAudio);
    audioElement.play();
  }

  //function to generate new question
  function newQuestion() {
    setQuestions(generateFractionProblem(difficulty));
  }

  // function to handle difficulty selection
  const handleSelect = (option) => {
    setDifficulty(option);
    setIsOpen(false);
    setQuestions(generateFractionProblem(option));
    setIsVisible(false); 
    };

  function BackgroundMusic() {
    const audioElement = new Audio(backgroundmusic);
    audioElement.loop = true;
    audioElement.play();
  }


    return (
        <div>
            <h1>🏀Fraction Knockout🏀</h1>
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
            <button onClick={() => { handleToggle(); randomAudio(); }}> 
              {isvisible ? 'Hide Answer' : 'Show Answer'}
            </button>
            {isvisible && (
              <div>
                <h2>Answer</h2>
                <p>{questions.solution}</p>
              </div>
            )}
            <div><button onClick={() => { newQuestion(); handleToggle(); }}>New Question</button></div>
        </div>
    );
}


export default App;