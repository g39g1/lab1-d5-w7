import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";

function Register() {
  const navigate = useNavigate();
  const [formSign, setFormDataSign] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDataSign({
      ...formSign,
      [name]: value,
    });
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(formSign.email)) {
      setError("Invalid email format");
      return;
    }
    if (formSign.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (!formSign.name) {
      setError("Name is required");
      return;
    }

    setError("");
    try {
      await axios.post(
        "https://68219a05259dad2655afc16d.mockapi.io/log-in",
        formSign
      );
      setToastMessage("User signed up successfully");
      navigate("/LoginPage");
    } catch (error) {
      console.error(error);
      setError("Sign up failed");
    }
  };

  return (
    <div className="container w-96 m-auto mt-20 max-sm:w-60 font-sans bg-gradient-to-r from-cyan-700 to-blue-900 rounded-lg shadow-md p-8">
      <h1 className="text-center text-3xl max-sm:text-lg font-bold mb-8">Signup</h1>
      {toastMessage && (
        <p className="text-green-600 text-center mb-4 font-semibold">{toastMessage}</p>
      )}
      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-600 transition"
            name="name"
            placeholder="Name"
            required
            value={formSign.name || ""}
            onChange={handleChange}
          />
        </label>

        <label className="input input-bordered flex items-center gap-2">
          <input
            type="email"
            className="grow px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-600 transition"
            name="email"
            placeholder="Email"
            required
            value={formSign.email || ""}
            onChange={handleChange}
          />
        </label>

        <label className="input input-bordered flex items-center gap-2">
          <input
            type="password"
            className="grow px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-600 transition"
            name="password"
            placeholder="Password"
            required
            value={formSign.password || ""}
            onChange={handleChange}
          />
        </label>

        {error && <p className="text-red-600 text-center font-medium">{error}</p>}

        <button
          type="submit"
          className="btn w-full mt-5 text-lg bg-cyan-700 hover:bg-cyan-800 text-white font-bold rounded transition-shadow shadow-md"
        >
          Create account
        </button>
      </form>

      <p className="mt-6 text-center text-gray-700">
        Already have an account?{" "}
        <Link to="/login" className="text-cyan-700 hover:underline font-semibold">
          Login
        </Link>
      </p>
    </div>
  );
}

export default Register;
