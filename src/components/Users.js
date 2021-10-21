import React from "react";
import PropTypes from "prop-types";

import UserItem from "./UserItem";
import Loading from "./Loading";

function Users({ users, loading }) {
  if (loading) {
    return <Loading />;
  } else {
    return (
      <div className="userContainer">
        {users.map((user) => (
          <UserItem key={user.id} user={user} />
        ))}
      </div>
    );
  }
}

Users.propTypes = {
  users: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default Users;
