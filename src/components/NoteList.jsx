import { Row } from "react-bootstrap";
import Note from "./Note";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoAddCircleOutline } from "react-icons/io5";
import SearchNotes from "./searchNotes";
import { RiLogoutCircleLine } from "react-icons/ri";

export default function NoteList({
  notes,
  handleSetNotes,
  handleDeleteNote,
  handleSetSearch,
  addNote,
}) {

  const navigate = useNavigate();

      const delToken = () => {
        localStorage.removeItem("userInfo");
        navigate("/login");
      };

  return (
    <Row className="notes-list mt-4">
      <div className="d-flex align-items-center">
        {/* Icon */}
        <IoAddCircleOutline
          className="mx-1 text-success"
          style={{ width: "50px", height: "50px" }}
          onClick={() => addNote()}
        />
        <SearchNotes handleSetSearch={handleSetSearch} />
        <RiLogoutCircleLine
        onClick={delToken}
        className="text-success mx-4" style={{ fontSize: "30px", cursor: "pointer" }}
        />
      </div>
      {notes.map((e, index) => (
        <Note
          key={index}
          id={e._id}
          heading={e.heading}
          body={e.body}
          date={e.date}
          background={e.background}
          notes={notes}
          handleSetNotes={handleSetNotes}
          handleDeleteNote={handleDeleteNote}
        />
      ))}
    </Row>
  );
}
