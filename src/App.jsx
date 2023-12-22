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
  const [search, setSearch] = useState("");

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

    } catch (error) {
      alert("Error getting data:", error);

    }
  };
  useEffect(() => {
    if (user && user.token) {
      getData(user.token);
    }
  }, []);
  


  useEffect(() => {
    if (notes == undefined) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  },[notes]);
    

    const postData = async () => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    let token = user.token;

    // create Note
    const date = new Date();
    const newNote = {
      heading: "",
      body: "",
      date: date.toLocaleDateString(),
    };
    const newNotes = [newNote, ...notes];
    
    // create Note
    try {
      await axios.post(`${API_URL}/home/data`, newNotes, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      await getData(token);
    } catch (error) {
      alert("Error while  post data:", error);
    }
  };

  const updateNote = async (data) => {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const token = user.token;

  try {
    await axios.put(`${API_URL}/home/data/${data._id}`,data, {
      headers: {
        "Content-Type": "application/json",
          Authorization: token,
      },
    });
      // await getData(token);
    } catch (error) { 
      alert("Error updating data:", error);
    }
  };

  const deleteNote = async (id) => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    const token = user.token;

    try {
      await axios.delete(`${API_URL}/home/data/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      await getData(token);
    } catch (error) {
      alert("Error deliting data:", error);
    }
  }

  return (
  <>
      <Container fluid className="px-sm-5">
        <Header updateNote={updateNote} getData={getData} />
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
                  addNote={postData}
                  notes={notes.filter((e) => {
                    console.log(e);
                    return e.heading.toLowerCase().includes(search);
                  })}
                  handleDeleteNote={deleteNote}
                  handleSetNotes={setNotes}
                  updateNote={updateNote}
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
