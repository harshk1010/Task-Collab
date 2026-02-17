import { useNavigate } from "react-router-dom";

function BoardCard({ board }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/boards/${board.id}`)}
      style={{
        padding: 15,
        border: "1px solid #ccc",
        borderRadius: 6,
        marginBottom: 10,
        cursor: "pointer",
        background: "#f9f9f9"
      }}
    >
      <h4>{board.title}</h4>
    </div>
  );
}

export default BoardCard;
