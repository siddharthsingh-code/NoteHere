import React, { useContext, useEffect, useRef, useState } from "react";
import NoteItem from "./NoteItem";
import { useNavigate } from "react-router-dom";
import Newcontext from "../context/Notescontext";

function Notes(props) {
  const context = useContext(Newcontext);
  const { notes, getNotes, editNote } = context;
  const navigate = useNavigate();
  const ref = useRef(null);
  const refClose = useRef(null);

  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
  });

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
    });
  };

  const handleClick = async () => {
    await editNote(note.id, note.etitle, note.edescription);
    props.showAlert("Note updated successfully!", "success");

    if (document.activeElement) {
      document.activeElement.blur();
    }
    refClose.current.click();
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ marginTop: "100px", marginBottom: "10px" }}>
      {/* Hidden Button to Trigger Modal */}
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      {/* Modal for Editing Note */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              <form
                className="my-3"
                onKeyDown={(e) => {
                  if (
                    e.key === "Enter" &&
                    note.etitle.length >= 5 &&
                    note.edescription.length >= 5
                  ) {
                    e.preventDefault();
                    handleClick();
                  }
                }}
              >
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    onChange={onChange}
                    minLength={3}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={note.edescription}
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
              </form>
            </div>

            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
                disabled={
                  note.etitle.length < 3 || note.edescription.length < 5
                }
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Notes Display Section */}
      <div className="container my-3">
        <div className="d-flex justify-content-between align-items-center">
          <h2>Your Notes</h2>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/createnotes")}
          >
            + Create Notes
          </button>
        </div>

        {notes?.length > 0 ? (
          <div className="row">
            {notes.map((note) => (
              <NoteItem key={note._id} updateNote={updateNote} note={note} />
            ))}
          </div>
        ) : (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "300px" }}
          >
            <p className="text-muted fs-5">No notes to display</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Notes;
