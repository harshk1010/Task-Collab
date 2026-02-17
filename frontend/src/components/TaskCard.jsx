function TaskCard({ task, onDelete }) {
  return (
    <div style={styles.card}>
      <strong style={styles.title}>{task.title}</strong>

      {task.description && (
        <p style={styles.description}>{task.description}</p>
      )}

      {onDelete && (
        <button
          style={styles.deleteBtn}
          onClick={() => onDelete(task.id)}
        >
          Delete
        </button>
      )}
    </div>
  );
}

const styles = {
  card: {
    background: "#f9fafb", // light grey for contrast
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
    border: "1px solid #e5e7eb"
  },
  title: {
    color: "#111827",
    fontSize: 14
  },
  description: {
    color: "#4b5563",
    fontSize: 13,
    marginTop: 6
  },
  deleteBtn: {
    marginTop: 8,
    padding: "6px 10px",
    background: "#ef4444",
    color: "white",
    border: "none",
    borderRadius: 6,
    cursor: "pointer"
  }
};

export default TaskCard;
