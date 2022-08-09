import React from "react";


const Search = ({ inputValues, handleSearch, handleClick }) => {
  return (
    <div>
      <input type="text" list="indian-cities" placeholder="Search for a city" onChange={handleSearch}/>
      <datalist id="indian-cities">
        {inputValues.map((item, key) => <option key={key} value={item}/>)}
      </datalist>

      <button onClick={handleClick}>Search</button>
    </div>

  );
};

export default Search;
