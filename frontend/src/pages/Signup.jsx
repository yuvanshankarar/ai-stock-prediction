import React, {
  useState
} from "react";

import axios from "axios";


export default function Signup() {

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const API =
    import.meta.env.VITE_API_URL;


  async function handleSignup(e) {

    e.preventDefault();

    try {

      const response =
        await axios.post(

          `${API}/signup`,

          {
            username,
            password
          }
        );

      if (
        response.data.success
      ) {

        alert(
          "Signup successful"
        );

        window.location.href =
          "/login";

      } else {

        alert(
          response.data.message
        );
      }

    } catch (error) {

      console.error(error);

      alert(
        "Signup failed"
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

        onSubmit={handleSignup}

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
          Signup 🚀
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

          Signup

        </button>

      </form>

    </div>
  );
}