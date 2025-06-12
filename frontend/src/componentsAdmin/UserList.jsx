import axios from "axios";
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

const API_URL = import.meta.env.API_URL; // URL API

const UserList = () => { 
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State untuk pencarian
  const [sortOrder, setSortOrder] = useState("asc"); // State untuk sorting

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await axios.get(`${API_URL}/users`);
    setUsers(response.data);
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`${API_URL}/users/${id}`);
      getUsers();
    } catch (error) {
      console.error(error);
    }
  };

  // Filter data sesuai search term
  const filteredUsers = searchTerm
    ? users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : users;

  // Sorting berdasarkan nama
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    


    return sortOrder === "asc"
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name);
  });

  // Fungsi toggle sorting
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        <Link to={`add`} className="button is-success mb-3">Add new</Link>
        
        {/* Search Bar */}
        <input
          type="text"
          className="input mb-3"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />


        {sortedUsers.length > 0 && (
          <table className='table is-striped is-fullwidth'>
            <thead>
              <tr>
                <th>No</th>
                <th>
                  Name{" "}
                  <button onClick={toggleSortOrder} className="button is-small is-light">
                    {sortOrder === "asc" ? "▲" : "▼"}
                  </button>
                </th>
                <th>Email</th>
                <th>Title</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedUsers.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.title}</td>
                  <td>{user.category}</td>
                  <td>
                    <Link to={`edit/${user.id}`} className="button is-small is-info">Edit</Link>
                    <button onClick={() => deleteUser(user.id)} className="button is-small is-danger">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default UserList;
