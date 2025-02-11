export default function RollButton({ rollDice, hasLost, gameWon, ref }) {
  return (
    <button onClick={rollDice} ref={ref} className="roll-dice-button">
      {hasLost || gameWon ? "New game" : "Roll dice"}
    </button>
  );
}
