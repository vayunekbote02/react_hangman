type AlreadyGuessedLettersProps = {
    guessedLetters: string[]
    word: string
}

export default function AlreadyGuessedLetters({ guessedLetters, word }: AlreadyGuessedLettersProps) {
  return (
    <div>
        <span style={{fontSize: '2rem'}}>Already incorrectly guessed letters: </span>
        {guessedLetters.map(letter => (
            !word.includes(letter) && <span style={{fontSize: '2rem'}}>{letter}, </span> 
        ))}
    </div>
  )
}
