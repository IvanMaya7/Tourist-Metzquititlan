import { useState } from "react";
import { login } from "../api/auth";// Ajusta la ruta si es necesario
import "../styles/Login.css"

export default function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await login({ email, password });

      if (response.data.success) {
        onLoginSuccess(response.data);
      } else {
        setError(response.message || "Credenciales incorrectas");
      }
    } catch (err) {
      setError("Ocurrió un error en el servidor");
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Correo electrónico</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
            required
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="btn-login">
          Ingresar
        </button>
      </form>
    </div>
  );
}
