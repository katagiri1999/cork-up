import React, { useState } from 'react';
import "./styles/index.css";

const login = () => {
  const [value_id, set_id_value] = useState('');
  const [value_pw, set_pw_value] = useState('');

  const handle_id_change = (event) => {
    set_id_value(event.target.value);
  };
  const handle_pw_change = (event) => {
    set_pw_value(event.target.value);
  };

  return (
    <div>
      <title>Login</title>
      <h1 id="Pagetitle">Login</h1>

      <label>
        ID:
        <input
          type="text"
          value={value_id}
          onChange={handle_id_change}
        />
        <br/>
        PW:
        <input
          type="text"
          value={value_pw}
          onChange={handle_pw_change}
        />
      </label>
      <p>ID: {value_id}</p>
      <p>PW: {value_pw}</p>
    </div>
  );
};

export default login;