import React from "react";
import "./App.css";
import Die from "./dice";
import { nanoid } from "nanoid";
import RollButton from "./button";
import Title from "./title";
import ReactConfetti from "react-confetti";

export default function App() {
  const [dice, setDice] = React.useState(() => generateNewDice());

  function generateNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid(),
      });
    }
    return newDice;
  }

  function hold(id) {
    setDice((oldDice) => {
      return oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      });
    });
  }

  const gameWon =
    dice.every((die) => die.isHeld) &&
    dice.every((die) => die.value === dice[0].value);

  console.log(gameWon);

  function rollDice() {
    setDice((oldDice) =>
      oldDice.map((die) =>
        die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) }
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
    <main>
      {gameWon && <ReactConfetti />}
      <Title />
      <div className="dice-container">{diceElements}</div>
      <RollButton rollDice={rollDice} gameWon={gameWon} />
    </main>
  );
}
