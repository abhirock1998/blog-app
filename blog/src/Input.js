import React from "react";
import "./input.css";
function Input({label=false, type, placeHolder, onChange, value, name }) {
  return (
    <div className="input">
      <input
        onChange={onChange}
        value={value}
        name={name}
        placeholder={placeHolder}
        type={type}
      />
     {label&& <p><small>Password must contain at leat 6 character</small></p>}
    </div>
  );
}

export default Input;
