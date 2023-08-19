import React, { useState } from "react";

export const SearchBar = ({ searchItems }) => {
  const [querySearch, setQuerySearch] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    searchItems(querySearch);
  };

  return (
    <header className="searchbar">
      <form className="form" onSubmit={handleSubmit}>
        <button type="submit" className="button">
          <span className="button-label">Search</span>
        </button>
        <input
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={querySearch} 
          onChange={(e) => setQuerySearch(e.target.value)}
        />
      </form>
    </header>
  );
};
