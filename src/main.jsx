import React from "react";
import "./App.css";
import Die from "./dice";
import { nanoid } from "nanoid";
import RollButton from "./button";
import Title from "./title";
import ReactConfetti from "react-confetti";

export default function App() {
  const [dice, setDice] = React.useState(() => generateNewDice());
  const [timeLeft, setTimeLeft] = React.useState(15);
  const [isActive, setIsActive] = React.useState(false);
  const [hasLost, setHasLost] = React.useState(false);
  const buttonRef = React.useRef(null);

  function generateNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push({
        value: Math.ceil(Math.random() * 7),
        isHeld: false,
        id: nanoid(),
      });
    }
    return newDice;
  }

  function hold(id) {
    if (!isActive) {
      setIsActive(true);
    }
    setDice((oldDice) => {
      return oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      });
    });
  }

  const gameWon =
    dice.every((die) => die.isHeld) &&
    dice.every((die) => die.value === dice[0].value);

  React.useEffect(() => {
    if (gameWon && buttonRef.current) {
      buttonRef.current.focus();
      setIsActive(false);
    }
  }, [gameWon]);

  React.useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0 && !gameWon) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0 && !gameWon) {
      setHasLost(true);
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, gameWon]);

  function rollDice() {
    if (hasLost || gameWon) {
      setDice(generateNewDice());
      setTimeLeft(15);
      setIsActive(false);
      setHasLost(false);
      return;
    }

    if (!isActive) {
      setIsActive(true);
    }

    setDice((oldDice) =>
      oldDice.map((die) =>
        die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 7) }
      )
    );
  }

  const diceElements = dice.map((diceObject) => (
    <Die
      key={diceObject.id}
      value={diceObject.value}
      isHeld={diceObject.isHeld}
      hold={() => hold(diceObject.id)}
    />
  ));

  return (
    <main className="relative">
      <div className="absolute top-4 left-4 text-xl font-bold">
        {!gameWon && !hasLost && `Time: ${timeLeft}s`}
      </div>

      {gameWon && <ReactConfetti />}

      <div aria-live="polite" className="sr-only">
        {gameWon && <p>Confetti drops, you won, press to start new game</p>}
        {hasLost && <p>Time's up! You lost the game</p>}
      </div>

      <Title />

      {hasLost ? (
        <div className="text-2xl font-bold text-red-600 mb-4">
          <h1>You lose</h1>
        </div>
      ) : (
        <div className="dice-container">{diceElements}</div>
      )}

      <RollButton
        rollDice={rollDice}
        gameWon={gameWon}
        hasLost={hasLost}
        ref={buttonRef}
      />
      {gameWon && (
        <div className="text-2xl font-bold text-green-600 mb-4">
          <h1>You won</h1>
        </div>
      )}
    </main>
  );
}
