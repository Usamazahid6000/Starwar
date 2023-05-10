import React, { useState, useEffect } from "react";

const Serach = ({ setFilterResult }) => {
  const [searchText, setSearchText] = useState("");
  const APIData = (e) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    setFilterResult(searchText);
  }, [searchText]);

  return (
    <div className="Search">
      <input
        type="text"
        placeholder="Search..."
        className="search"
        onChange={APIData}
      />
    </div>
  );
};

export default Serach;
