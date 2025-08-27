import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginPage(){
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      nav("/");
    } catch (err) {
      alert("Login failed");
      console.error(err);
    }
  };

  return (
    <form onSubmit={submit}>
      <input value={username} onChange={e=>setUsername(e.target.value)} placeholder="username" />
      <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="password" type="password" />
      <button>Login</button>
    </form>
  );
}
