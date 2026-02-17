import { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(register(form));
    navigate("/");
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Account 🚀</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            style={styles.input}
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            style={styles.input}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
            style={styles.input}
            required
          />

          <button type="submit" style={styles.button}>
            Register
          </button>
        </form>

        <p style={styles.footerText}>
          Already have an account?{" "}
          <Link to="/" style={styles.link}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #667eea, #764ba2)"
  },
  card: {
    width: 350,
    padding: 30,
    borderRadius: 10,
    background: "#fff",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
    textAlign: "center"
  },
  title: {
    marginBottom: 20
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 15
  },
  input: {
    padding: 10,
    borderRadius: 6,
    border: "1px solid #ccc",
    fontSize: 14
  },
  button: {
    padding: 10,
    borderRadius: 6,
    border: "none",
    background: "#667eea",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer"
  },
  footerText: {
    marginTop: 15,
    fontSize: 14
  },
  link: {
    color: "#667eea",
    textDecoration: "none",
    fontWeight: "bold"
  }
};

export default Register;
