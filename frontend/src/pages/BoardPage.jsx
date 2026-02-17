import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import ListColumn from "../components/ListColumn";
import ActivityPanel from "../components/ActivityPanel";
import {fetchBoards} from "../features/boards/boardSlice";

function BoardPage() {
  
  const { id } = useParams();
  const [board, setBoard] = useState(null);
  const [newListTitle, setNewListTitle] = useState("");

  const fetchBoard = async () => {
    try {
      const res = await api.get(`/boards/${id}`);
      setBoard(res.data);
    } catch (err) {
      console.error("Error loading board", err);
    }
  };

  useEffect(() => {
    fetchBoards();
  }, [id]);

  const createList = async () => {
    if (!newListTitle.trim()) return;

    await api.post("/lists", {
      title: newListTitle,
      boardId: id
    });

    setNewListTitle("");
    fetchBoard();
  };

  if (!board) return <div style={{ padding: 40 }}>Loading...</div>;

  return (
    <div style={styles.container}>
      <div style={styles.boardArea}>
        <div style={styles.header}>
          <h2 style={styles.boardTitle}>{board.title}</h2>
        </div>

        <div style={styles.listContainer}>
          {board.lists.map((list) => (
            <ListColumn
              key={list.id}
              list={list}
              refreshBoard={fetchBoard}
            />
          ))}

          <div style={styles.addList}>
            <input
              placeholder="Add new list..."
              value={newListTitle}
              onChange={(e) => setNewListTitle(e.target.value)}
              style={styles.listInput}
              onKeyDown={(e) => {
                if (e.key === "Enter") createList();
              }}
            />
            <button onClick={createList} style={styles.addBtn}>
              Add List
            </button>
          </div>
        </div>
      </div>

      <ActivityPanel boardId={id} />
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    background: "linear-gradient(135deg, #1e293b, #0f172a)"
  },

  boardArea: {
    flex: 1,
    padding: 30,
    overflowX: "auto",
    color: "white"
  },

  header: {
    marginBottom: 25
  },

  boardTitle: {
    fontSize: 24,
    fontWeight: 600
  },

  listContainer: {
    display: "flex",
    alignItems: "flex-start",
    gap: 20
  },

  addList: {
    minWidth: 280,
    flexShrink: 0,
    background: "rgba(255,255,255,0.08)",
    padding: 16,
    borderRadius: 12,
    backdropFilter: "blur(8px)"
  },

  listInput: {
    width: "100%",
    padding: 10,
    borderRadius: 8,
    border: "none",
    marginBottom: 10
  },

  addBtn: {
    width: "100%",
    padding: 10,
    background: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: 8,
    cursor: "pointer"
  }
};

export default BoardPage;
