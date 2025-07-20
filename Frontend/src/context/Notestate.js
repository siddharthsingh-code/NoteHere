import React, { useState } from "react";
import Newcontext from "./Notescontext";

function Newstate({ children, showAlert }) {
  
  const host = "https://notehere-backend.onrender.com";
  const noteInitial = [];
  const [notes, setNotes] = useState(noteInitial);

  const getNotes = async () => {
    try {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      const json = await response.json();
      setNotes(json);
    } catch (error) {
      console.error("Failed to fetch notes:", error);
      showAlert?.("Failed to fetch notes", "danger");
    }
  };

  const addNote = async (title, description, file) => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      if (file) formData.append("file", file);

      const response = await fetch(`${host}/api/notes/addnotes`, {
        method: "POST",
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.errors?.[0]?.msg || "Failed to add note");
      }

      const newNote = await response.json();
      setNotes(notes.concat(newNote));
      showAlert?.("Note added successfully", "success");
    } catch (error) {
      console.error("Error adding note:", error);
      showAlert?.(error.message, "danger");
    }
  };

  const deleteNote = async (id) => {
    try {
      await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      const newNotes = notes.filter((note) => note._id !== id);
      setNotes(newNotes);
      showAlert?.("Note deleted successfully", "success");
    } catch (error) {
      console.error("Failed to delete note:", error);
      showAlert?.("Failed to delete note", "danger");
    }
  };

  const editNote = async (id, title, description) => {
    try {
      await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ title, description }),
      });

      let newNotes = JSON.parse(JSON.stringify(notes));
      for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if (element._id === id) {
          newNotes[index].title = title;
          newNotes[index].description = description;
          break;
        }
      }
      setNotes(newNotes);
      showAlert?.("Note updated successfully", "success");
    } catch (error) {
      console.error("Failed to update note:", error);
      showAlert?.("Failed to update note", "danger");
    }
  };

  return (
    <Newcontext.Provider
      value={{  getNotes, addNote, deleteNote, editNote, notes }}
    >
      {children}
    </Newcontext.Provider>
  );
}

export default Newstate;
