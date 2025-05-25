import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebaseconfig";

function Login({ onLoginExitoso, estaOffline }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    if (estaOffline) return;

    try {
      await signInWithEmailAndPassword(auth, email, password);

      const res = await fetch("http://localhost:4000/api/usuarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        onLoginExitoso(data.usuario, data.visitas);
      } else {
        setMensaje("Error MongoDB: " + data.error);
      }
    } catch (error) {
      console.error(error);
      setMensaje("Error en Firebase: " + error.message);
    }
  };

  return (
    <div className={`bg-light p-3 border rounded ${estaOffline ? "formulario-desactivado" : ""}`}>
      <div className="bg-secondary text-white text-center py-2 mb-3 fw-bold">
        Inicio de sesión
      </div>

      {estaOffline && (
        <div className="alert alert-danger text-center mt-2" role="alert">
          ⚠️ Estás desconectado. No puedes iniciar sesión ahora.
        </div>
      )}

      <form onSubmit={handleLogin}>
        <fieldset disabled={estaOffline}>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              required
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-secondary">
              Autenticarse
            </button>
          </div>
        </fieldset>
        {mensaje && <p className="mt-2 text-danger text-center">{mensaje}</p>}
      </form>
    </div>
  );
}

export default Login;
