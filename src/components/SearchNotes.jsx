import React from 'react';
import { IoSearchSharp } from "react-icons/io5";


export default function SearchNotes({ handleSetSearch }) {
  return (
    <div className="mb-3 search mt-3">
      <input
        onChange={(event) => handleSetSearch(event.target.value.toLowerCase())}
        type="text"
        placeholder="type to search..."
        className="px-2"
      />
      <IoSearchSharp className="search-icons" size="1.3em" />
    </div>
  );
}


