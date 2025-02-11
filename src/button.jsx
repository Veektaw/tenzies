export default function RollButton(props) {
  return (
    <button className="roll-dice-button" onClick={props.rollDice}>
      {props.gameWon ? "New game" : "Roll dice"}
    </button>
  );
}
