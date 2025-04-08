import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const handleLogin = async () => {
    try {
      await onLogin(email, password);
      setError("");
    } catch (err) {
      console.log(err);
      setError("Fel användarnamn eller lösenord.");
    }
  };

  return (
    <div className="flex flex-col p-4 bg-white rounded shadow-md w-full max-w-sm">
      <input
        ref={emailRef}
        type="email"
        placeholder="E-post"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="input input-bordered mb-4"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            passwordRef.current?.focus();
          }
        }}
      />

      <input
        ref={passwordRef}
        type="password"
        placeholder="Lösenord"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input input-bordered"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleLogin();
          }
        }}
      />

      <p className="text-sm text-left text-gray-600">
        Ny här?
        <span
          className="text-blue-600 hover:underline cursor-pointer"
          onClick={() =>
            navigate("/register", {
              state: { from: window.location.pathname },
            })
          }
        >
          Skapa konto
        </span>
      </p>

      {error && (
        <div className="text-red-600 text-sm font-semibold mt-4 mb-4">
          {error}
        </div>
      )}

      <div className="flex mt-4">
        <button className="btn btn-success flex-1" onClick={handleLogin}>
          Logga in
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
