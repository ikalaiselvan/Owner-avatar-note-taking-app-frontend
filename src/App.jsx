import { Container } from "react-bootstrap";
import NoteList from "./components/NoteList";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import axios from "axios";
import API_URL from "../config/global";
import Signup from "./components/Signup";

function App() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("userInfo"));

  const getData = async (token) => {
    try {
      const response = await axios.get(`${API_URL}/home/data`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      setNotes(response.data.data);

      console.log(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

    useEffect(() => {
      if (user && user.token) {
        getData(user.token);
      }
    },[])
  

  useEffect(() => {
    if (notes == undefined) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }),
    [notes];

  const postData = async () => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    console.log("User Info:", user);

    let token = user.token;
    try {
      const response = await axios.post(`${API_URL}/home/data`, notes, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      console.log(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const [search, setSearch] = useState("");

  const addNote = async () => {
    const date = new Date();
    const newNote = {
      id: nanoid(),
      heading: "New note",
      body: "new content",
      date: date.toLocaleDateString(),
    };
    const newNotes = [newNote, ...notes];
    setNotes(newNotes);

    postData();
    
  };

  const deleteNote = (id) => {
    const newNotes = notes.filter((e) => e._id != id);
    console.log(id);
    setNotes(newNotes);
  };
  return (
    <>
      <Container fluid className="px-sm-5">
        <Header postData={postData} getData={getData} />
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login loading={loading} />} />
          {loading ? (
            <Route path="/loading" element={<Login />} />
          ) : (
            <Route
              path="/home"
              element={
                <NoteList
                  handleSetSearch={setSearch}
                  addNote={addNote}
                  notes={notes.filter((e) =>{
console.log(e)
                      return e.heading.toLowerCase().includes(search)}
                  )}
                  handleDeleteNote={deleteNote}
                  handleSetNotes={setNotes}
                />
              }
            />
          )}
        </Routes>
      </Container>
    </>
  );
}

export default App;
