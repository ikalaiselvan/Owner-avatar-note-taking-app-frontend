import React from 'react'
import { FaSave } from "react-icons/fa";
import { FaSyncAlt } from "react-icons/fa";


export default function Header({ postData, getData }) {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user && user.token) {
      var token = user.token;
    }

  return (
    <div
      className="sticky-top"
      style={{ background: "hsla(0, 0%, 100%, 0.89)" }}
    >
      <div className="d-flex text-success justify-content-around">
        <h2
          style={{
            fontFamily: "'Open Sans', sans-serif",
          }}
          className="text-center mt-3 fw-bold"
        >
          Notes Taking Application
        </h2>{" "}
        <div className="d-flex align-items-center gap-4">
          <FaSave
            onClick={postData}
            className="text-info"
            style={{ fontSize: "30px", cursor: "pointer" }}
          />
          <FaSyncAlt
            onClick={() => getData(token)}
            className="text-success"
            style={{ fontSize: "30px", cursor: "pointer" }}
          />
          
        </div>
      </div>
    </div>
  );
}
