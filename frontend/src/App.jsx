import React, { useState, useEffect, useRef, useCallback } from 'react';
import './App.css';

const DATASETS = {
  words: [
    "code react app scale build fast web flow type test keyora system node view data state hook style design print grid flex core modular component logic value error track fix test runner script loop patch build main open local host route speed byte variable function constant object array matrix vector token string integer boolean null undefined ternary operator lambda scope closure callback promise async await fetch request response header body status json parse stringify constructor prototype instance class extend super export import default package manager module bundle webpack vite babel eslint prettier git commit push pull branch master main merge conflict stash pop cherry pick revert reset status log diff remote origin upstream fetch clone init config global local environment variable secret token authentication authorization bearer jwt cookie session storage local storage index db cache worker service manifest pwa responsive mobile desktop tablet screen layout media query breakpoint flexbox grid alignment justify center space between items wrap column row absolute relative fixed sticky z index opacity visibility transition transform scale rotate translate animation keyframes duration timing function ease linear cubic bezier shadow border radius outline background color linear gradient radial image cover contain repeat position attachment clip text fill stroke filter blur brightness contrast drop shadow blur backdrop saturate sepia hue rotate invert grayscale normalization reset box sizing border box pointer events cursor pointer grab grabbing crosshair zoom in out text vertical align line height letter spacing word word break wrap overflow scroll auto hidden clip ellipsis whitespace nowrap pre line wrap break word hyphens auto direction rtl ltr writing mode text orientation unicode bidi isolate override plaintext ruby base text annotation span div section article header footer nav main aside details summary dialog dialog open backdrop form input textarea select option label button fieldset legend datalist output progress meter meter min max optimum low high optimum range color date datetime local email month number password search tel time url week file checkbox radio submit reset button image hidden color palette primary secondary accent success warning danger info light dark surface background text muted border radius shadow transition animation keyframe media query breakpoint flexbox grid alignment justify center space between items wrap column row absolute relative fixed sticky z index opacity visibility transition transform scale rotate translate animation keyframes duration timing function ease linear cubic bezier shadow border radius outline background color linear gradient radial image cover contain repeat position attachment clip text fill stroke filter blur brightness contrast drop shadow blur backdrop saturate sepia hue rotate invert grayscale normalization reset box sizing border box pointer events cursor pointer grab grabbing crosshair zoom in out text vertical align line height letter spacing word word break wrap overflow scroll auto hidden clip ellipsis whitespace nowrap pre line wrap break word hyphens auto direction rtl ltr writing mode text orientation unicode bidi isolate override plaintext ruby base text annotation span div section article header footer nav main aside details summary dialog dialog open backdrop form input textarea select option label button fieldset legend datalist output progress meter meter min max optimum low high optimum range color date datetime local email month number password search tel time url week file checkbox radio submit reset button image hidden color palette primary secondary accent success warning danger info light dark surface background text muted border radius shadow transition animation keyframe media query breakpoint flexbox grid alignment justify center space between items wrap column row absolute relative fixed sticky z index opacity visibility transition transform scale rotate translate animation keyframes duration timing function ease linear cubic bezier shadow border radius outline background color linear gradient radial image cover contain repeat position attachment clip text fill stroke filter blur brightness contrast drop shadow blur backdrop saturate sepia hue rotate invert grayscale normalization reset box sizing border box pointer events cursor pointer grab grabbing crosshair zoom in out text vertical align line height letter spacing word word break wrap overflow scroll auto hidden clip ellipsis whitespace nowrap pre line wrap break word hyphens auto direction rtl ltr writing mode text orientation unicode bidi isolate override plaintext ruby base text annotation span div section article header footer nav main aside details summary dialog dialog open backdrop form input textarea select option label button fieldset legend datalist output progress meter meter min max optimum low high optimum range color date datetime local email month number password search tel time url week file checkbox radio submit reset button image hidden"
  ],
  sentences: [
    "keyora is designed to make your typing flow perfectly without any interruptions.",
    "react components make complex logic feel simple, modular, and extremely clean.",
    "focus on your typing errors consistently to become a much faster software developer.",
    "the code you type today builds the scalable digital infrastructure of tomorrow.",
    "practice makes progress, and every keystroke brings you closer to absolute mastery.",
    "asynchronous JavaScript operations allow web apps to fetch data seamlessly in the background.",
    "the future of web development is built with reusable components and clean architecture.",
    "mastering the fundamentals of programming opens doors to endless possibilities.",
    "continuous learning and deliberate practice are the keys to becoming an expert.",
    "efficient algorithms and data structures are the backbone of high-performance applications."
  ],
  numbers: [
    "react version 18.2.0 and node version 20.5.0 build ultra fast web apps 99 percent of the time.",
    "error code 404 found on port 8080 with 32 gigabytes of ram and 500 terabytes of ssd storage.",
    "secure api key 987654321 token 1234abcd vector matrix coordinates x 45 y 90 z 180.",
    "server response time 200ms with 2048 concurrent connections and 1024mb memory usage.",
    "version 2.5.3 deployed on 2024-01-15 with 99.98% uptime across 5 regions."
  ],
  quotes: [
    "The only way to do great work is to love what you do. - Steve Jobs",
    "In the middle of difficulty lies opportunity. - Albert Einstein",
    "Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill",
    "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
    "It does not matter how slowly you go as long as you do not stop. - Confucius"
  ]
};

export default function Keyora() {
  const [mode, setMode] = useState('sentences');
  const [timeLimit, setTimeLimit] = useState(30);
  const [text, setText] = useState('');
  const [input, setInput] = useState('');
  const [timeLeft, setTimeLeft] = useState(30);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [errorMap, setErrorMap] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  const inputRef = useRef(null);
  const textContainerRef = useRef(null);
  const charRefs = useRef({});
  
  // Generate text when mode changes
  useEffect(() => {
    const list = DATASETS[mode];
    const selected = list[Math.floor(Math.random() * list.length)];
    setText(selected);
    resetTest();
  }, [mode, timeLimit]);

  const resetTest = () => {
    setInput('');
    setStarted(false);
    setFinished(false);
    setTimeLeft(timeLimit);
    setErrorMap({});
    setShowResults(false);
    setCurrentCharIndex(0);
    if (textContainerRef.current) {
      textContainerRef.current.scrollTop = 0;
    }
  };

  // Timer logic
  useEffect(() => {
    if (started && timeLeft > 0 && !finished) {
      const timer = setInterval(() => {
        setTimeLeft(t => t - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && started && !finished) {
      setFinished(true);
      setShowResults(true);
    }
  }, [started, timeLeft, finished]);

  // Scroll to current character
  useEffect(() => {
    if (charRefs.current[currentCharIndex] && textContainerRef.current) {
      const charElement = charRefs.current[currentCharIndex];
      const container = textContainerRef.current;
      const charRect = charElement.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      
      if (charRect.top < containerRect.top + 50 || charRect.bottom > containerRect.bottom - 50) {
        charElement.scrollIntoView({
          block: 'center',
          behavior: 'smooth'
        });
      }
    }
  }, [currentCharIndex]);

  const handleChange = (e) => {
    if (finished || showResults) return;
    
    const val = e.target.value;
    const lastChar = val.slice(-1);
    const targetChar = text[val.length - 1];

    // Start timer on first keystroke
    if (!started && val.length === 1) {
      setStarted(true);
    }

    // Track errors
    if (val.length > input.length && lastChar !== targetChar && targetChar !== undefined) {
      setErrorMap(prev => ({
        ...prev,
        [lastChar]: (prev[lastChar] || 0) + 1
      }));
    }

    setInput(val);
    setCurrentCharIndex(val.length);
    
    // Check if finished
    if (val.length >= text.length) {
      setFinished(true);
      setShowResults(true);
    }
  };

  const handleKeyDown = (e) => {
    // Prevent backspace from deleting characters
    if (e.key === 'Backspace') {
      e.preventDefault();
    }
    // Prevent copy/paste
    if (e.key === 'v' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
  };

  const timeElapsed = timeLimit - timeLeft;
  const wpm = timeElapsed > 0 ? Math.round((input.length / 5) / (timeElapsed / 60)) : 0;
  const totalErrors = Object.values(errorMap).reduce((a, b) => a + b, 0);
  const accuracy = input.length > 0 ? Math.round(((input.length - totalErrors) / Math.max(1, input.length)) * 100) : 100;
  const completedChars = input.length;
  const totalChars = text.length;
  const progress = Math.round((completedChars / totalChars) * 100);

  // Calculate character stats
  const correctChars = input.split('').filter((char, i) => char === text[i]).length;
  const incorrectChars = input.split('').filter((char, i) => char !== text[i] && i < text.length).length;

  const getPerformanceLabel = () => {
    if (wpm >= 80 && accuracy >= 95) return "🏆 Excellent! You're a typing master!";
    if (wpm >= 60 && accuracy >= 90) return "⭐ Great job! You're doing very well!";
    if (wpm >= 40 && accuracy >= 80) return "👍 Good effort! Keep practicing!";
    if (wpm >= 20) return "📈 Keep going! You're improving!";
    return "💪 Start typing to see your progress!";
  };

  const getErrorAnalysis = () => {
    const sortedErrors = Object.entries(errorMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
    
    if (sortedErrors.length === 0) {
      return "🌟 Perfect typing! No errors detected!";
    }
    
    return sortedErrors.map(([char, count]) => 
      `'${char}': ${count} mistake${count > 1 ? 's' : ''}`
    ).join(' | ');
  };

  const restartTest = () => {
    const list = DATASETS[mode];
    const selected = list[Math.floor(Math.random() * list.length)];
    setText(selected);
    resetTest();
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const ResultsScreen = () => (
    <div className="results-container">
      <h2 className="results-title">📊 Typing Results</h2>
      
      <div className="results-grid">
        <div className="result-card">
          <span className="result-icon">🚀</span>
          <div className="result-value">{wpm}</div>
          <div className="result-label">WPM</div>
        </div>
        <div className="result-card">
          <span className="result-icon">🎯</span>
          <div className="result-value">{accuracy}%</div>
          <div className="result-label">Accuracy</div>
        </div>
        <div className="result-card">
          <span className="result-icon">✅</span>
          <div className="result-value">{correctChars}</div>
          <div className="result-label">Correct</div>
        </div>
        <div className="result-card">
          <span className="result-icon">❌</span>
          <div className="result-value">{incorrectChars}</div>
          <div className="result-label">Errors</div>
        </div>
      </div>

      <div className="progress-bar-container">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
        <span className="progress-text">{progress}% Completed</span>
      </div>

      <div className="performance-section">
        <h3 className="performance-label">{getPerformanceLabel()}</h3>
        <p className="performance-detail">
          <strong>Total Characters:</strong> {input.length}/{text.length} | 
          <strong> Time Taken:</strong> {timeElapsed}s | 
          <strong> Errors:</strong> {totalErrors}
        </p>
        <p className="error-analysis">
          <strong>🔍 Error Analysis:</strong> {getErrorAnalysis()}
        </p>
      </div>

      <div className="action-buttons">
        <button className="btn-keyora" onClick={restartTest}>
          🔄 Try Again
        </button>
        <button className="btn-keyora secondary" onClick={() => {
          const list = DATASETS[mode];
          const selected = list[Math.floor(Math.random() * list.length)];
          setText(selected);
          resetTest();
        }}>
          📝 New Text
        </button>
      </div>
    </div>
  );

  return (
    <div className="typing-container" onClick={() => inputRef.current && inputRef.current.focus()}>
      <div className="header">
        <h1 className="keyora-brand">⌨️ Keyora</h1>
        <span className="brand-subtitle">Type. Track. Improve.</span>
      </div>
      
      <div className="controls-panel">
        <div className="control-group">
          <span className="control-label">📚 Mode:</span>
          <button className={`btn-option ${mode === 'words' ? 'active' : ''}`} onClick={() => setMode('words')}>Words</button>
          <button className={`btn-option ${mode === 'sentences' ? 'active' : ''}`} onClick={() => setMode('sentences')}>Sentences</button>
          <button className={`btn-option ${mode === 'numbers' ? 'active' : ''}`} onClick={() => setMode('numbers')}>Numbers</button>
          <button className={`btn-option ${mode === 'quotes' ? 'active' : ''}`} onClick={() => setMode('quotes')}>Quotes</button>
        </div>
        <div className="control-group">
          <span className="control-label">⏱️ Time:</span>
          <button className={`btn-option ${timeLimit === 15 ? 'active' : ''}`} onClick={() => setTimeLimit(15)}>15s</button>
          <button className={`btn-option ${timeLimit === 30 ? 'active' : ''}`} onClick={() => setTimeLimit(30)}>30s</button>
          <button className={`btn-option ${timeLimit === 60 ? 'active' : ''}`} onClick={() => setTimeLimit(60)}>60s</button>
        </div>
      </div>

      <div className="stats-bar">
        <div className="stat-card">
          <span className="stat-label">⏱️ Time Left</span>
          <span className="stat-value">{timeLeft}s</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">⚡ Live WPM</span>
          <span className="stat-value">{started ? wpm : 0}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">🎯 Accuracy</span>
          <span className="stat-value">{started ? accuracy : 100}%</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">📝 Progress</span>
          <span className="stat-value">{progress}%</span>
        </div>
      </div>

      {showResults ? (
        <ResultsScreen />
      ) : (
        <>
          <div className="text-display" ref={textContainerRef}>
            <div className="text-inner">
              {text.split('').map((char, i) => {
                const isCurrent = i === input.length;
                const isCorrect = i < input.length && input[i] === char;
                const isError = i < input.length && input[i] !== char;
                
                return (
                  <span
                    key={i}
                    ref={el => charRefs.current[i] = el}
                    className={`char 
                      ${isCorrect ? 'correct' : ''} 
                      ${isError ? 'error' : ''} 
                      ${isCurrent ? 'current' : ''}
                      ${i === input.length && !finished ? 'active' : ''}
                    `}
                  >
                    {char}
                  </span>
                );
              })}
              {input.length >= text.length && (
                <span className="char complete">✨</span>
              )}
            </div>
          </div>

          <div className="typing-hint">
            <span className="hint-text">
              {!started && !finished ? '👆 Start typing to begin...' : '⌨️ Keep typing...'}
            </span>
            <span className="char-counter">
              {input.length}/{text.length} characters
            </span>
          </div>
        </>
      )}

      <input
        ref={inputRef}
        type="text"
        className="hidden-input"
        value={input}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        autoFocus
        disabled={showResults}
        spellCheck={false}
        autoCorrect="off"
        autoCapitalize="off"
      />

      {!showResults && started && !finished && (
        <div className="status-indicator">
          <span className="status-dot active"></span>
          <span>Typing in progress...</span>
        </div>
      )}

      {finished && !showResults && (
        <div className="status-indicator">
          <span className="status-dot complete"></span>
          <span>🎉 Complete! Analyzing results...</span>
        </div>
      )}
    </div>
  );
}