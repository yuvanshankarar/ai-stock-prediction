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

      localStorage.setItem(
         "username",
          username
        );

        localStorage.setItem(

          "token",

          response.data.token
        );

        alert(
          "Login successful"
        );

        window.location.href =
          "/";

      } else {

        alert(
          response.data.message
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
        minHeight: "100vh",
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
          width: "350px"
        }}
      >

        <h1
          style={{
            color: "white",
            marginBottom: "20px"
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

          required

          style={{
            width: "100%",
            padding: "15px",
            marginBottom: "20px",
            borderRadius: "10px",
            border: "none"
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

          required

          style={{
            width: "100%",
            padding: "15px",
            marginBottom: "20px",
            borderRadius: "10px",
            border: "none"
          }}
        />

        <button

          type="submit"

          style={{
            width: "100%",
            padding: "15px",
            borderRadius: "10px",
            border: "none",
            background: "#2563eb",
            color: "white",
            cursor: "pointer"
          }}
        >

          Login

        </button>

      </form>

    </div>
  );
}
