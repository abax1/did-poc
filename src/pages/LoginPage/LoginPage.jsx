import React, { useState } from "react";
import {
  InputGroup,
  Tooltip,
  Intent,
  Button,
  RadioGroup,
  Radio,
  Card,
} from "@blueprintjs/core";
import { withRouter } from "react-router-dom";
import "./LoginPage.css";
import { traderType, COLLECTOR } from "../../constants";

const LoginPage = ({ history }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [persona, setPersona] = useState("Depot");

  const lockButton = (
    <Tooltip
      content={`${showPassword ? "Hide" : "Show"} Password`}
      disabled={false}
    >
      <Button
        disabled={false}
        icon={showPassword ? "unlock" : "lock"}
        intent={Intent.WARNING}
        minimal={true}
        onClick={() => {
          setShowPassword(!showPassword);
        }}
      />
    </Tooltip>
  );

  return (
    <Card className="login" elevation={2}>
      <h2>Login here!</h2>
      <InputGroup
        className="login-input"
        disabled={false}
        large
        leftIcon="user"
        onChange={(e) => {
          setUsername(e.target.value);
        }}
        placeholder="Enter username..."
        value={username}
      />
      <InputGroup
        className="login-input"
        disabled={false}
        large
        placeholder="Enter your password..."
        rightElement={lockButton}
        type={showPassword ? "text" : "password"}
      />
      {traderType === COLLECTOR && (
        <RadioGroup
          className="login-input"
          label="Select Persona"
          onChange={(e) => {
            setPersona(e.target.value);
          }}
          selectedValue={persona}
          inline
        >
          <Radio label="Driver" value="Driver" />
          <Radio label="Depot Admin" value="Depot" />
        </RadioGroup>
      )}
      <button
        className="my-button"
        onClick={() => {
          history.push(persona === "Driver" ? "/driver-dash" : "/depot-dash");
        }}
      >
        Login
      </button>
      <p>I forgot my password, please send me a recovery email</p>
    </Card>
  );
};

export default withRouter(LoginPage);
