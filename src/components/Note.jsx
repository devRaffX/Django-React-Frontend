import React, { useState } from "react";
import "../styles/Note.css";

function Note({ note, onDelete, onEdit }) {
  const formattedDate = new Date(note.created_at).toLocaleDateString("en-US");
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  const handleEdit = (e) => {
    e.preventDefault();
    onEdit(note.id, editTitle, editContent);
    setIsEditing(false);
  };

  return (
    <div className="note-container">
      <p className="note-title">{note.title}</p>
      <p className="note-content">{note.content}</p>
      <p className="note-date">{formattedDate}</p>
      <button className="edit-button" onClick={() => setIsEditing(true)}>
        Edit
      </button>
      <button className="delete-button" onClick={() => onDelete(note.id)}>
        Delete
      </button>

      {/* Modal for Editing */}
      {isEditing && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setIsEditing(false)}>
              &times;
            </span>
            <h2>Edit a Note</h2>
            <form onSubmit={handleEdit}>
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                id="title"
                name="title"
                required
                onChange={(e) => setEditTitle(e.target.value)}
                value={editTitle}
              />
              <label htmlFor="content">Content:</label>
              <textarea
                name="content"
                id="content"
                required
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
              ></textarea>
              <br />
              <button className="save-button" type="submit">Save</button>
              <button className="cancel-button" type="button" onClick={() => setIsEditing(false)}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Note;
