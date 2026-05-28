import React, {
  useState
} from "react";

import axios from "axios";

export default function Login() {

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const API =
    import.meta.env.VITE_API_URL;

  async function handleLogin(e) {

    e.preventDefault();

    try {

      const response =
        await axios.post(
          `${API}/login`,
          {
            username,
            password
          }
        );

      if (
        response.data.message ===
        "Login successful"
      ) {

        localStorage.setItem(
          "username",
          username
        );

        alert(
          "Login successful 🚀"
        );

        window.location.href = "/";

      } else {

        alert(
          "Invalid credentials"
        );
      }

    } catch (error) {

      console.error(error);

      alert(
        "Login failed"
      );
    }
  }

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