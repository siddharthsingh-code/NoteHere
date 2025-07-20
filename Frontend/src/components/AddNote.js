import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Newcontext from "../context/Notescontext";

const AddNote = (props) => {
  const { addNote } = useContext(Newcontext);
  const navigate = useNavigate();

  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "default",
  });
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addNote(note.title, note.description, file);
    props.showAlert("Note added successfully!", "success");
    setNote({ title: "", description: "", tag: "default" });
    setFile(null);
    navigate("/yournotes");
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div
        className="card shadow p-4"
        style={{ maxWidth: "600px", width: "100%" }}
      >
        <h2 className="text-center mb-4 text-primary">Add a New Note</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-3">
            <label htmlFor="title" className="form-label fw-semibold">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={note.title}
              onChange={handleChange}
              placeholder="Enter note title"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label fw-semibold">
              Description
            </label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              value={note.description}
              onChange={handleChange}
              rows="4"
              placeholder="Write something about the note"
              required
            ></textarea>
          </div>

          <div className="mb-3">
            <label htmlFor="file" className="form-label fw-semibold">
              Attach File (optional)
            </label>
            <input
              id="file"
              type="file"
              className="form-control"
              name="file"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
            />
          </div>

          <div className="d-flex justify-content-between mt-3">
            <button
              type="button"
              className="btn btn-outline-secondary w-50 me-2"
              onClick={() => navigate("/yournotes")}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn btn-success w-50"
              disabled={note.title.length < 3 || note.description.length < 5}
            >
              Add Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
