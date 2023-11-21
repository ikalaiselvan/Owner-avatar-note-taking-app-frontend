import { Card, Col } from "react-bootstrap";
import { MdDeleteForever } from "react-icons/md";

export default function Note({ notes, handleSetNotes, id, heading, body, date, background, handleDeleteNote }) {

  const color = ["#00FFFF", "#8A2BE2", "#98FB98", "#fe9b72", "#e4ee91"];

  const colorStyle = {
    background: "white",
    border: "2px solid grey",
    borderRadius: "50%",
    display: "block",
    width: "20px",
    height: "20px",
    cursor: "pointer",
  };

  const handleColor = (ind, id) => {
    const newColor = color.filter((color, index) => index === ind);

    const newArray = notes.map((e) => {

      console.log(e._id, id);
      if (e._id === id) {
        e.background = newColor.toString();
      }
      console.log(e);
      return e;
    });

    handleSetNotes(newArray);
  };

const handleChange = (e) => {
  const { name, value } = e.target;
  notes.map((note)=>{
if(note._id === id){
  note.body = value;
}
  })

};

  return (
    <Col key={id} xs={12} md={6} xl={3}>
      <Card
        style={{ background: background }}
        className="mb-2 px-3 py-2 note d-flex justify-content-between"
      >
        <div className="d-flex justify-content-end">
          {color.map((e, index) => (
            <span
              key={index}
              onClick={() => handleColor(index, id)}
              className="mx-1"
              style={{ ...colorStyle, background: e }}
            ></span>
          ))}
        </div>
        <input className="heading p-1" defaultValue={heading} />
        <hr />
        <textarea
          name="body"
          className="text-area p-1"
          onChange={handleChange}
          defaultValue={body}
        ></textarea>
        <div className=" d-flex align-items-center justify-content-between note-footer">
          <small>{date}</small>
          <MdDeleteForever
            onClick={() => handleDeleteNote(id)}
            className="delete-icon"
            size="1.3em"
          />
        </div>
      </Card>
    </Col>
  );
}