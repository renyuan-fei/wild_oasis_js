import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import {useLogin} from './useLogin.js';
import SpinnerMini from '../../ui/SpinnerMini.jsx';

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {login, isLoading} = useLogin();
  
  function handleSubmit(e) {
    e.preventDefault();
    if (!email ||!password) return;
    login({email, password});
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large">
          {!isLoading ? 'Login in' : <SpinnerMini/>}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
