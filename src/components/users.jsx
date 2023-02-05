import React, { useState } from "react";
import api from "../api";

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());
  const handleDelete = (userId) => {
    setUsers((prevState) => prevState.filter((user) => user._id !== userId));
  };
  const renderPhrase = (number) => {
    if (!number) {
      return <span className="badge bg-danger">Никто с тобой не тусанет</span>;
    }

    if ([2, 3, 4].includes(number % 10) && ![12, 13, 14].includes(number)) {
      return (
        <span className="badge bg-primary">
          {number} человека тусанут с тобой сегодня
        </span>
      );
    } else {
      return (
        <span className="badge bg-primary">
          {number} человек тусанет с тобой сегодня
        </span>
      );
    }
  };

  return (
    <>
      <h1 className="m-1">{renderPhrase(users.length)}</h1>
      {Boolean(users.length) && (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качества</th>
              <th scope="col">Профессия</th>
              <th scope="col">Встретился, раз</th>
              <th scope="col">Оценка</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <>
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>
                      {user.qualities.map((qualitie) => {
                        return (
                          <span className={"badge m-1 bg-" + qualitie.color}>
                            {qualitie.name}
                          </span>
                        );
                      })}
                    </td>
                    <td>{user.profession.name}</td>
                    <td>{user.completedMeetings}</td>
                    <td>{user.rate} /5</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(user._id)}
                      >
                        delete
                      </button>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Users;
