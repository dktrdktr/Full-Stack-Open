import React, { useState } from "react";

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const StatisticLine = ({ text, value, symbol }) => (
  <tr>
    <td>{text}</td>
    <td>
      {value} {symbol}
    </td>
  </tr>
);

const Statistics = (props) => {
  const ratingsTally = props.values;

  if (ratingsTally.every((x) => x === 0)) {
    return <p>No Feedback Given</p>;
  }

  console.log(ratingsTally);
  let ratings = [];
  for (let i = 0; i < ratingsTally[0]; i++) ratings.push(1);
  for (let i = 0; i < ratingsTally[1]; i++) ratings.push(0);
  for (let i = 0; i < ratingsTally[2]; i++) ratings.push(-1);
  const avg = ratings.reduce((a, b) => a + b, 0) / ratings.length;
  const pos = (ratingsTally[0] / ratingsTally.reduce((a, b) => a + b, 0)) * 100;

  return (
    <>
      <table>
        <tbody>
          <StatisticLine text="good" value={ratingsTally[0]} />
          <StatisticLine text="neutral" value={ratingsTally[1]} />
          <StatisticLine text="bad" value={ratingsTally[2]} />
          <StatisticLine
            text="all"
            value={ratingsTally[0] + ratingsTally[1] + ratingsTally[2]}
          />
          <StatisticLine text="avg" value={avg} />
          <StatisticLine text="positive" value={pos} symbol={"%"} />
        </tbody>
      </table>
    </>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const setGoodHandler = () => setGood(good + 1);
  const setNeutralHandler = () => setNeutral(neutral + 1);
  const setBadHandler = () => setBad(bad + 1);

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={setGoodHandler} text="good" />
      <Button onClick={setNeutralHandler} text="neutral" />
      <Button onClick={setBadHandler} text="bad" />
      <h1>statistics</h1>
      <Statistics values={[good, neutral, bad]} />
    </div>
  );
};

export default App;
