import React, {
  useState
} from "react";

import axios from "axios";

export default function Login() {

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const API_URL =
    import.meta.env.VITE_API_URL;

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const response =
        await axios.post(
          `${API_URL}/login`,
          {
            username,
            password
          }
        );

      alert(
        response.data.message
      );

      localStorage.setItem(
        "username",
        username
      );

      window.location.href = "/";

    } catch (error) {

      console.error(error);

      alert("Login failed");
    }
  };

  return (

    <div
      style={{
        background: "#020617",

        height: "100vh",

        display: "flex",

        justifyContent: "center",

        alignItems: "center"
      }}
    >

      <form

        onSubmit={handleLogin}

        style={{
          background: "#0f172a",

          padding: "40px",

          borderRadius: "20px",

          width: "400px"
        }}
      >

        <h1
          style={{
            color: "white",

            marginBottom: "30px"
          }}
        >
          Login 🚀
        </h1>

        <input

          type="text"

          placeholder="Username"

          value={username}

          onChange={(e) =>
            setUsername(
              e.target.value
            )
          }

          style={{
            width: "100%",

            padding: "15px",

            marginBottom: "20px",

            borderRadius: "10px"
          }}
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

          style={{
            width: "100%",

            padding: "15px",

            marginBottom: "20px",

            borderRadius: "10px"
          }}
        />

        <button

          type="submit"

          style={{
            width: "100%",

            padding: "15px",

            background: "#2563eb",

            color: "white",

            border: "none",

            borderRadius: "10px",

            cursor: "pointer"
          }}
        >
          Login
        </button>

      </form>

    </div>
  );
}