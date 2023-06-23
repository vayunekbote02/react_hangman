type HangmanWordProps = {
  guessedLetters: string[]
  word: string
  reveal?: boolean
}

export default function HangmanWord({ guessedLetters, word, reveal=false }: HangmanWordProps) {
  return (
    <div style = {{
      display: 'flex',
      gap: '0.25em',
      fontFamily: 'monospace',
      fontWeight: 'bold',
      fontSize: '6rem',
      textTransform: 'capitalize'
    }}>
      {word.split("").map((letter, index) => (
        <span style = {{borderBottom: '.1em solid black'}} key={index}>
          <span style={{
            visibility: guessedLetters.includes(letter) || reveal ? 'visible' : 'hidden',
            color: !guessedLetters.includes(letter) && reveal ? 'red' : 'black'
          }}>
            {letter}
          </span>
        </span>
      ))}
    </div>
  )
}
