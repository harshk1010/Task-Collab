
import { useState } from "react";
import TaskCard from "./TaskCard";
import api from "../services/api";

function ListColumn({ list, refreshBoard }) {
  const [taskTitle, setTaskTitle] = useState("");
  const [showInput, setShowInput] = useState(false);

  const createTask = async () => {
    if (!taskTitle.trim()) return;

    await api.post("/tasks", {
      title: taskTitle,
      description: "",
      listId: list.id
    });

    setTaskTitle("");
    setShowInput(false);
    refreshBoard();
  };

  return (
    <div style={styles.column}>
      <div style={styles.header}>
  <h4 style={styles.title}>{list.title}</h4>
</div>


      {list.tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}

      {showInput ? (
        <div style={{ marginTop: 10 }}>
          <input
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            placeholder="Enter task title..."
            style={styles.input}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                createTask();
              }
            }}
          />
          <button style={styles.addBtn} onClick={createTask}>
            Add
          </button>
        </div>
      ) : (
        <button
          style={styles.addTaskBtn}
          onClick={() => setShowInput(true)}
        >
          + Add Task
        </button>
      )}
    </div>
  );
}

const styles = {
  column: {
  minWidth: 280,
  background: "#f8fafc",  // 👈 changed
  padding: 16,
  borderRadius: 12,
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  color: "#111827"
},

  title: {
    color: "#111827",
    marginBottom: 12,
    fontWeight: 600
  },

  input: {
    width: "100%",
    padding: 10,
    borderRadius: 8,
    border: "1px solid #d1d5db",
    background: "#f9fafb", // light background but visible
    color: "#111827",
    marginBottom: 8
  },

  addTaskBtn: {
    marginTop: 10,
    padding: 10,
    border: "none",
    borderRadius: 8,
    background: "#3b82f6",
    color: "white",
    width: "100%",
    fontWeight: 500,
    cursor: "pointer"
  },

  addBtn: {
    marginTop: 8,
    width: "100%",
    padding: 10,
    background: "#22c55e",
    color: "white",
    border: "none",
    borderRadius: 8,
    cursor: "pointer"
  }
};



export default ListColumn;
