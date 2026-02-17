import { useEffect, useState } from "react";
import api from "../services/api";
import { socket } from "../services/socket";

function ActivityPanel({ boardId }) {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!boardId) return;

    let isMounted = true;

    const loadActivity = async () => {
      try {
        setLoading(true);
        const response = await api.get(
          `/boards/${boardId}/activity?page=1`
        );

        if (isMounted) {
          setActivities(response.data);
        }
      } catch (error) {
        console.error("Error fetching activity", error);
      } finally {
        setLoading(false);
      }
    };

    loadActivity();

    // 🔥 Real-time listener
    socket.emit("joinBoard", boardId);

    socket.on("activityCreated", (newActivity) => {
      setActivities((prev) => [newActivity, ...prev]);
    });

    return () => {
      isMounted = false;
      socket.off("activityCreated");
    };
  }, [boardId]);

  return (
    <div style={styles.panel}>
      <h3 style={styles.heading}>Activity</h3>

      {loading && <p style={styles.loading}>Loading...</p>}

      <div style={styles.activityList}>
        {activities.length === 0 && !loading && (
          <p style={styles.empty}>No activity yet</p>
        )}

        {activities.map((activity) => (
          <div key={activity.id} style={styles.activityItem}>
            <p style={styles.message}>{activity.message}</p>
            <small style={styles.date}>
              {new Date(activity.createdAt).toLocaleString()}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  panel: {
    width: 300,
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(10px)",
    padding: 20,
    borderLeft: "1px solid rgba(255,255,255,0.1)",
    color: "white",
    overflowY: "auto"
  },
  heading: {
    marginBottom: 15
  },
  loading: {
    fontSize: 14,
    opacity: 0.7
  },
  empty: {
    fontSize: 14,
    opacity: 0.6
  },
  activityList: {
    display: "flex",
    flexDirection: "column",
    gap: 10
  },
  activityItem: {
    padding: 10,
    background: "rgba(255,255,255,0.1)",
    borderRadius: 8
  },
  message: {
    marginBottom: 4,
    fontSize: 14
  },
  date: {
    fontSize: 12,
    opacity: 0.7
  }
};

export default ActivityPanel;
