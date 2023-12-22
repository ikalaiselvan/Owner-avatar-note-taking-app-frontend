import { Card, Row } from "react-bootstrap";
import Note from "./Note";
import { useNavigate } from "react-router-dom";
import { IoAddCircleOutline } from "react-icons/io5";
import { RiLogoutCircleLine } from "react-icons/ri";
import SearchNotes from './SearchNotes';
import { useEffect } from "react";

export default function NoteList({
  notes,
  handleSetNotes,
  handleDeleteNote,
  handleSetSearch,
  addNote,
  updateNote,
}) {
  const navigate = useNavigate();

  const delToken = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };
  useEffect(()=>{

  }, notes)

  return (
    <Row className="notes-list mt-4">
      <div className="d-flex align-items-center">
        {/* Icon */}
        <IoAddCircleOutline
          className="mx-1 text-success"
          style={{ width: "50px", height: "50px", cursor: "pointer" }}
          onClick={() => addNote()}
        />
        <SearchNotes handleSetSearch={handleSetSearch} />
        <RiLogoutCircleLine
          onClick={delToken}
          className="text-success mx-4"
          style={{ fontSize: "30px", cursor: "pointer" }}
        />
      </div>
      {notes != "" ? (
        notes.map((e, index) => (
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
            updateNote={updateNote}
          />
        ))
      ) : (
        <Card>
          <div
            className=" d-flex align-items-center justify-content-center"
            style={{ height: "60vh", flexDirection: "column" }}
          >
            <h3 style={{ color: "orange" }} className="mb-4">
              Your Notebook is empty please add new note
            </h3>
            <img
              src="https://tse3.mm.bing.net/th?id=OIP.YbIJXbRSM09dnvFpHcCGNAHaEK&pid=Api&P=0&h=220"
              alt="image note"
            />
          </div>
        </Card>
      )}
    </Row>
  );
}
