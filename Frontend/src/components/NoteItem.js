import React, { useContext } from "react";
import Newcontext from "../context/Notescontext";

function NoteItem(props) {
  const context = useContext(Newcontext);
  const { deleteNote } = context;
  const { note, updateNote } = props;

  const handleClick = () => {
    const confirm = window.confirm("Do you want to Delete Note?");
    if (!confirm) return;
    deleteNote(note._id);
  };

  // Use correct fileUrl from the note
  const fileUrl = note.fileUrl ? `http://localhost:4000${note.fileUrl}` : null;

  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-header d-flex justify-content-between align-items-center">
          <span className="fw-bold">{note.title}</span>
          <div className="d-flex gap-2">
            <button
              type="button"
              className="btn btn-sm btn-outline-danger"
              onClick={handleClick}
              title="Delete"
            >
              <i className="bi bi-trash"></i>
            </button>
            <button
              type="button"
              className="btn btn-sm btn-outline-primary"
              onClick={() => updateNote(note)}
              title="Edit"
            >
              <i className="bi bi-pencil-square"></i>
            </button>
          </div>
        </div>

        <div
          className="card-body d-flex flex-column justify-content-between"
          style={{ minHeight: "150px" }}
        >
          <div>
            <figure>
              <blockquote className="blockquote mb-2">
                <p>{note.description}</p>
              </blockquote>
            </figure>
          </div>

          {fileUrl && (
            <div className="mt-2">
              <a
                href={fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm btn-secondary"
              >
                View Attachment
              </a>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default NoteItem;
