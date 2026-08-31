import { useState, useRef } from 'react'
import { generateFractionProblem } from './prob_generator'
import './App.css'

function App() {
  const [difficulty, setDifficulty] = useState('easy');
  const [questions, setQuestions] = useState(generateFractionProblem('easy'));
  const [isvisible, setIsVisible] = useState(false);
  const [isopen, setIsOpen] = useState(false);

  const audioRef = useRef(null);
  const [isplaying, setIsPlaying] = useState(false);

  const difficultyOptions = ['easy', 'medium', 'hard'];

  const audio = [
    '/audio/boomshakalaka.mp3',
    '/audio/bullseye.mp3',
    '/audio/finger-roll.mp3',
    '/audio/heating-up.mp3',
    '/audio/hes-on-fire-nba-jam.mp3',
    '/audio/shoots.mp3',
  ]

  const backgroundmusic = '/audio/nba_jam_main_theme.mp3'

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
    //setDifficulty(option);
    setDifficulty(option);
    setIsOpen(false);
    setQuestions(generateFractionProblem(option));
    setIsVisible(false); 
    };

  // function to toggle background music
  const toggleBackgroundMusic = () => {
      if (!audioRef.current) return;
      try{
          if (audioRef.current.paused) {
              audioRef.current.play();
              setIsPlaying(true);
          } else {
              audioRef.current.pause();
              setIsPlaying(false);
      }}
      catch (error) {
          console.error('Error toggling background music:', error);
      }
  };
  
  function Fraction({ numerator, denominator }) {
    return (
        <span className="fraction">
            <span className="numerator">{numerator}</span>
            <span className="fraction-line"></span>
            <span className="denominator">{denominator}</span>
        </span>
    );
}


    return (
        <div>
          <audio
              ref={audioRef}
              src={backgroundmusic}
              loop
          />
          <h1>🏀Fraction Knockout🏀</h1>
          <button onClick={toggleBackgroundMusic}>
              {isplaying ? '🔇 Pause Music' : '🔊 Play Music'}
          </button>
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
            <div className = "box"> 
                  <Fraction numerator={questions.frac1.numerator} denominator={questions.frac1.denominator} /> 
                  <span>{questions.operation} </span>
                  <Fraction numerator={questions.frac2.numerator} denominator={questions.frac2.denominator} />
                  <span> = ?</span>
                <p>Difficulty: {questions.difficulty}</p>
            </div>
            <button onClick={handleToggle}> 
              {isvisible ? 'Hide Answer' : 'Show Answer'}
            </button>
            {isvisible && (
              <div>
                <h2>Answer</h2>
                  <Fraction numerator={questions.solution.numerator} denominator={questions.solution.denominator} />
              </div>
            )}
            <div><button onClick={() => { newQuestion(); setIsVisible(false); randomAudio();}}>New Question</button></div>
        </div>
    );
}


export default App;