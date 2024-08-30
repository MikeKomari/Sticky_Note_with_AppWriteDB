import React from "react";
import Trash from "../icons/Trash";
import { db } from "../appwrite/databases";
import { useContext } from "react";
import { NoteContext } from "../context/NoteContext";

const DeleteButton = ({ noteID }) => {
  const { setNotes } = useContext(NoteContext);

  const handleDelete = (prevState) => {
    db.notes.delete(noteID);

    setNotes((prevState) => prevState.filter((n) => n.$id !== noteID));
  };

  return (
    <div onClick={handleDelete}>
      <Trash />
    </div>
  );
};

export default DeleteButton;
