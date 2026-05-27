import React, {
  useState
} from "react";

import axios from "axios";

import {
  useNavigate
} from "react-router-dom";

export default function Login() {

  const navigate =
    useNavigate();

  const API =
    import.meta.env.VITE_API_URL;

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  async function handleLogin() {

    try {

      const response =
        await axios.post(

          `${API}/login`,

          null,

          {

            params: {

              username,

              password
            }
          }
        );

      localStorage.setItem(

        "token",

        response.data.access_token
      );

      alert(
        "Login successful"
      );

      navigate("/");

    } catch (error) {

      alert(
        "Login failed"
      );
    }
  }

  return (

    <div
      style={{
        background: "#0f172a",

        minHeight: "100vh",

        display: "flex",

        justifyContent: "center",

        alignItems: "center"
      }}
    >

      <div
        style={{
          background: "#111827",

          padding: "40px",

          borderRadius: "20px",

          width: "350px"
        }}
      >

        <h1
          style={{
            color: "white",

            marginBottom: "20px"
          }}
        >
          Login 🔐
        </h1>

        <input

          placeholder="Username"

          value={username}

          onChange={(e) =>
            setUsername(
              e.target.value
            )
          }

          style={inputStyle}
        />

        <input

          type="password"

          placeholder="Password"

          value={password}

          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }

          style={inputStyle}
        />

        <button

          onClick={handleLogin}

          style={buttonStyle}
        >

          Login

        </button>

      </div>

    </div>
  );
}

const inputStyle = {

  width: "100%",

  padding: "12px",

  marginBottom: "15px",

  borderRadius: "10px",

  border: "none"
};

const buttonStyle = {

  width: "100%",

  padding: "12px",

  background: "#22c55e",

  color: "white",

  border: "none",

  borderRadius: "10px",

  cursor: "pointer"
};