import React, { useState } from "react";
import PropTypes from "prop-types";

function Search({ searchUsers, clearUsers, users, showAlert }) {
  const [text, setText] = useState("");

  const onChange = (event) => {
    setText(event.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (text === "") {
      showAlert("⚠︎ UserName is Required !", "negative");
    } else {
      searchUsers(text);
      setText("");
    }
  };

  return (
    <>
      <div className="search-box-container">
        <div className="search-box">
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Hello, is it me you're looking for?..."
              value={text}
              onChange={onChange}
            />
            <label htmlFor="fa-search" className="icon">
              <button type="submit">
                <i className="fas fa-search"></i>
              </button>
            </label>
          </form>
        </div>
      </div>

      <div className="searh-box-container">
        {users.length > 0 && (
          <button
            onClick={clearUsers}
            className="fluid ui violet button"
            style={{ width: "20%", margin: "0 auto 0", borderRadius: "30px" }}
          >
            Clear
          </button>
        )}
      </div>
    </>
  );
}

Search.propTypes = {
  searchUsers: PropTypes.func.isRequired,
  clearUsers: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired,
  showAlert: PropTypes.func.isRequired,
};

export default Search;
