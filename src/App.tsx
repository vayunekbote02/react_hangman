import { useState, useEffect, useCallback } from 'react';
import words from './wordList.json';
import HangmanDrawing from './HangmanDrawing';
import HangmanWord from './HangmanWord';
import Keyboard from './Keyboard';
import AlreadyGuessedLetters from './AlreadyGuessedLetters';

function getWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function App() {
  const [word, setWord] = useState(getWord)
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

  const incorrectLetters = guessedLetters.filter(
    letter => !word.includes(letter)
  )

  const isLoser = incorrectLetters.length >= 6;
  const isWinner = word.split("").every(letter => guessedLetters.includes(letter))
  const isSuper = incorrectLetters.length == 0 && isWinner
  
  const addGuessedLetter = useCallback((letter: string) => {
    if (guessedLetters.includes(letter) || isLoser || isWinner) return
    setGuessedLetters(guessedLetters => [...guessedLetters, letter])
  }, [guessedLetters, isWinner, isLoser])   

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;

      if (!key.match(/^[a-zA-Z]$/)) return
      e.preventDefault()
      addGuessedLetter(key)
    }

    document.addEventListener("keypress", handler);

    return () => {
      document.removeEventListener("keypress", handler);
    }
  }, [guessedLetters])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;

      if (key !== "Enter") return

      e.preventDefault()
      setGuessedLetters([])
      setWord(getWord())
    }

    document.addEventListener("keypress", handler);

    return () => {
      document.removeEventListener("keypress", handler);
    }
  }, [])

  var a = 0;

  return (
    <>
      <div style={{
        maxWidth: '800px',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        margin: '0 auto',
        alignItems: 'center'
      }}>
        <div style={{
          fontSize: '2rem', textAlign: 'center'
        }}>
          {isSuper ? a = 1 : (isWinner ? a = -1 : (isLoser ?  a = 2 : ""))}
          {a == -1 && "Great job! Press enter or refresh page to play again. "}
          {a == 1 && "Adbhut, avishvasaniya!"}
          {a == 2 && "Better luck next time! Press enter or refresh page to play again."}
        </div>
        <HangmanDrawing numberOfGuesses={incorrectLetters.length}/>
        <AlreadyGuessedLetters guessedLetters={guessedLetters} word={word}/>
        <HangmanWord guessedLetters={guessedLetters} word={word} reveal={isLoser}/>
        <div style={{alignSelf: 'stretch'}}>
          <Keyboard disabled={isWinner || isLoser} activeLetters={guessedLetters.filter(letter => 
              word.includes(letter)
            )} inActiveLetters={incorrectLetters} addGuessedLetter={addGuessedLetter}/>
        </div>
      </div>
    </>
  )
}

export default App
