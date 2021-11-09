import React, { useState } from "react";

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const StatisticLine = ({ text, value }) => (
  <p>
    {text} {value}
  </p>
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
      <StatisticLine text="avg" value={avg} />
      <StatisticLine text="positive %" value={pos} />
    </>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const setGoodH = () => setGood(good + 1);
  const setNeutralH = () => setNeutral(neutral + 1);
  const setBadH = () => setBad(bad + 1);

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={setGoodH} text="good" />
      <Button onClick={setNeutralH} text="neutral" />
      <Button onClick={setBadH} text="bad" />
      <h1>statistics</h1>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={good + neutral + bad} />
      <Statistics values={[good, neutral, bad]} />
    </div>
  );
};

export default App;
