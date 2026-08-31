import { useState, useRef } from 'react'
import { generateFractionProblem, generatePercentages } from './prob_generator'
import './App.css'

function App() {
  const [difficulty, setDifficulty] = useState('easy');
  const [problemType, setProblemType] = useState('fractions');
  const [questions, setQuestions] = useState(generateFractionProblem('easy'));
  const [isvisible, setIsVisible] = useState(false);
  const [isopen, setIsOpen] = useState(false);
  const [isproblemTypeOpen, setIsProblemTypeOpen] = useState(false);

  const audioRef = useRef(null);
  const [isplaying, setIsPlaying] = useState(false);

  const difficultyOptions = ['easy', 'medium', 'hard'];
  const problemTypeOptions = ['fractions','percentages']

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
    if (problemType === 'fractions') {
      setQuestions(generateFractionProblem(difficulty));
    } else if (problemType === 'percentages') {
      setQuestions(generatePercentages(difficulty));
    }
    setIsVisible(false);
  }

  // function to handle difficulty selection
    const handleSelect = (option) => {
        setDifficulty(option);
        setIsDifficultyOpen(false);
        setIsVisible(false);

        if (problemType === 'fractions') {
            setQuestions(generateFractionProblem(option));
        } else if (problemType === 'percentages') {
            setQuestions(generatePercentages(option));
        }
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

    function FractionQuestion({ question }) {
        return (
            <div className="fraction-question">

                <Fraction
                    numerator={question.frac1.numerator}
                    denominator={question.frac1.denominator}
                />

                <span className="operation">
                    {question.operation}
                </span>

                <Fraction
                    numerator={question.frac2.numerator}
                    denominator={question.frac2.denominator}
                />

                <span>= ?</span>

            </div>
        );
    }

    function PercentageQuestion({ question }) {

        if (question.problem_type === 'percentage_to_decimal') {
            return (
                <div className="percentage-question">
                    <span>{question.percentage}%</span>
                    <span>→</span>
                    <span>?</span>
                </div>
            );
        }

        if (question.problem_type === 'decimal_to_percentage') {
            return (
                <div className="percentage-question">
                    <span>{question.decimal}</span>
                    <span>→</span>
                    <span>?%</span>
                </div>
            );
        }

        if (question.problem_type === 'percentage_of_whole') {
            
            return (
                <div className="percentage-question">
                    <span>{question.percentage}% of {question.wholeNumber}</span>
                    <span>=</span>
                    <span>?</span>
                </div>
            );
        }
    }

const handleProblemTypeSelect = (option) => {
    setProblemType(option);
    setIsProblemTypeOpen(false);
    setIsVisible(false);

    if (option === 'fractions') {
        setQuestions(generateFractionProblem(difficulty));
    } else if (option === 'percentages') {
        setQuestions(generatePercentages(difficulty));
    }
};

function Answer({ question, problemType }) {

    if (problemType === 'fractions') {
        return (
            <Fraction
                numerator={question.solution.numerator}
                denominator={question.solution.denominator}
            />
        );
    }

    if (question.problem_type === 'percentage_to_decimal') {
        return (
            <p>{question.decimal}</p>
        );
    }

    if (question.problem_type === 'decimal_to_percentage') {
        return (
            <p>{question.percentage}%</p>
        );
    }

    if (question.problem_type === 'percentage_of_whole') {
        if (question.part !== undefined) {
            return <p>{question.part}</p>;
        }

        return (
            <Fraction
                numerator={question.fraction.numerator}
                denominator={question.fraction.denominator}
            />
        );
    }
}

    return (
        <div>
          <audio
              ref={audioRef}
              src={backgroundmusic}
              loop
          />
          <h1>🏀Knockout🏀</h1>
          <button onClick={toggleBackgroundMusic}>
              {isplaying ? '🔇 Pause Music' : '🔊 Play Music'}
          </button>
          <div className="dropdown">
                <button onClick={() => setIsProblemTypeOpen(!isproblemTypeOpen)}>
                    Problem Type: {problemType}
                </button>

                {isproblemTypeOpen && (
                    <div className="dropdown-content">
                        {problemTypeOptions.map((option) => (
                            <button
                                key={option}
                                onClick={() => handleProblemTypeSelect(option)}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                )}
            </div>
            <div className="dropdown">
            <button onClick={() => setIsOpen(!isopen)}>
                Difficulty: {difficulty}
            </button>

            {isopen && (
                <div className="dropdown-content">
                    {difficultyOptions.map((option) => (
                        <button
                            key={option}
                            onClick={() => handleSelect(option)}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            )}
            </div>
            <div className="box">

                {problemType === 'fractions' ? (
                    <FractionQuestion question={questions} />
                ) : (
                    <PercentageQuestion question={questions} />
                )}

                <p style={{ marginTop: '10px' }}>Difficulty: {questions.difficulty}</p>

            </div>
            <button onClick={handleToggle}> 
              {isvisible ? 'Hide Answer' : 'Show Answer'}
            </button>
            {isvisible && (
              <div>
                <h2>Answer</h2>
                  <Answer question={questions} problemType={problemType} />
              </div>
            )}
            <div><button onClick={() => { newQuestion(); setIsVisible(false); randomAudio();}}>New Question</button></div>
        </div>
    );
}


export default App;