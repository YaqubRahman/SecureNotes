import React, { useEffect, useState } from "react";
import "../components/Dashboard.css";

const BASE_URL = "http://localhost:5000"; // My backend port
const token = localStorage.getItem("token");

function Dashboard() {
  const [error, setError] = useState<string | null>(null);
  const [showInput, setShowInput] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [notes, setNotes] = useState<
    { id: number; text: string; timestamp: Date }[]
  >([]);

  const getNotes = async () => {
    try {
      const response = await fetch(`${BASE_URL}/dashboard/notes`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error);
      }

      const data = await response.json();
      setNotes(data);
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    getNotes();
  }, []);

  const handleAddButton = async () => {
    try {
      const response = await fetch(`${BASE_URL}/dashboard/notes`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: noteText }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error);
      }

      setNoteText("");
      setShowInput(false);
      console.log("Note created");
      getNotes();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleAddNotesButton = async () => {
    setShowInput(true);
  };

  return (
    <div className="dashboardfont">
      <h1>Welcome to your notes dashboard</h1>

      <button
        type="button"
        className="addnotebutton"
        onClick={handleAddNotesButton}
      >
        Add Note
      </button>

      {showInput && (
        <div>
          <input
            type="text"
            className="textbox"
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="Write your note..."
          />
          <button type="button" onClick={handleAddButton}>
            Add
          </button>
        </div>
      )}

      <div>
        <h2>Your Notes:</h2>
        {notes.length === 0 ? (
          <p>No notes available.</p>
        ) : (
          <ul>
            {notes.map((note) => (
              <div key={note.id} className="notelayout">
                <p>{note.text}</p>
                <div className="timefont">
                  {new Date(note.timestamp).toLocaleTimeString()}
                </div>
              </div>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
