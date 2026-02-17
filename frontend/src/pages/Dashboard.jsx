import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBoards,
  createBoard,
  deleteBoard
} from "../features/boards/boardSlice";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { boards } = useSelector((state) => state.boards);

  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    dispatch(fetchBoards());
  }, [dispatch]);

  const handleCreate = async () => {
    if (!title.trim()) {
      setError("Board title cannot be empty");
      return;
    }

    setError("");
    await dispatch(createBoard(title));
    setTitle("");
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this board?")) {
      dispatch(deleteBoard(id));
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.heading}>Your Boards</h1>

        <div style={styles.createBoard}>
          <input
            placeholder="New Board Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={styles.input}
          />
          <button style={styles.createBtn} onClick={handleCreate}>
            Create
          </button>
        </div>

        {error && <p style={styles.error}>{error}</p>}

        <div style={styles.boardGrid}>
          {boards.map((board) => (
            <div key={board.id} style={styles.boardCard}>
              <div
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/boards/${board.id}`)}
              >
                {board.title}
              </div>

              <button
                style={styles.deleteBtn}
                onClick={() => handleDelete(board.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #1e293b, #0f172a)",
    padding: 20
  },
  content: {
    width: "100%",
    maxWidth: 900,
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(10px)",
    padding: 40,
    borderRadius: 15,
    color: "white"
  },
  heading: {
    textAlign: "center",
    marginBottom: 30
  },
  createBoard: {
    display: "flex",
    gap: 10,
    justifyContent: "center"
  },
  input: {
    padding: 10,
    borderRadius: 6,
    border: "none",
    width: 250
  },
  createBtn: {
    padding: "10px 20px",
    borderRadius: 6,
    border: "none",
    background: "#3b82f6",
    color: "white"
  },
  error: {
    textAlign: "center",
    color: "#f87171",
    marginTop: 10
  },
  boardGrid: {
    marginTop: 30,
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: 20
  },
  boardCard: {
    padding: 20,
    background: "white",
    color: "#111",
    borderRadius: 10,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  deleteBtn: {
    background: "#ef4444",
    color: "white",
    border: "none",
    padding: "5px 10px",
    borderRadius: 6
  }
};

export default Dashboard;
