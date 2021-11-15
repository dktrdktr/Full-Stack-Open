import React from "react";

const PersonForm = ({
  onSubmit,
  nameValue,
  nameOnChange,
  numberValue,
  numberOnChange,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={nameValue} onChange={nameOnChange} />
        <br />
        number: <input value={numberValue} onChange={numberOnChange} />
        <br />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
