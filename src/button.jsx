export default function RollButton(props) {
  return (
    <button className="roll-dice-button" onClick={props.rollDice}>
      Roll dice
    </button>
  );
}
