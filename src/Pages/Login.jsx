import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  const handleChangeEmail = (e) => setEmail(e.target.value);
  const handleChangePassword = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get("https://68219a05259dad2655afc16d.mockapi.io/log-in");
      const user = response.data.find((user) => user.email === email && user.password === password);

      if (user) {
        localStorage.setItem("isLoggedIn", JSON.stringify(user));
        setToastMessage("Login successful!");
        localStorage.setItem("username", user.name);
        navigate("/");
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      console.error(error);
      setError("Login failed");
    }
  };

  return (
    <div className="container w-96 m-auto mt-20 max-sm:w-60 font-sans bg-gradient-to-r from-cyan-700 to-blue-900 rounded-lg shadow-md p-8">
      <h1 className="text-center text-3xl max-sm:text-lg font-bold mb-8">Login</h1>

      {toastMessage && (
        <p className="text-green-600 text-center mb-4 font-semibold">{toastMessage}</p>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleChangeEmail}
            required
            className="grow px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-600 transition"
          />
        </label>

        <label className="input input-bordered flex items-center gap-2">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handleChangePassword}
            required
            className="grow px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-600 transition"
          />
        </label>

        {error && <p className="text-red-600 text-center font-medium">{error}</p>}

        <button
          className="btn w-full mt-5 text-lg bg-cyan-700 hover:bg-cyan-800 text-white font-bold rounded transition-shadow shadow-md"
          type="submit"
        >
          Login
        </button>
      </form>

      <p className="mt-6 text-center text-gray-700">
        Create an account?{" "}
        <Link to="/" className="text-cyan-700 hover:underline font-semibold">
          Register
        </Link>
      </p>
    </div>
  );
}

export default Login;
