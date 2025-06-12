import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const API_URL = "/api/users"; // URL API

const EditUser = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState(""); 
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  
  const navigate = useNavigate();
  const { id } = useParams();

  // Fungsi untuk mengambil data user berdasarkan ID
  const getUserById = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      setName(response.data.name);
      setPassword(response.data.password);
      setEmail(response.data.email);
      setTitle(response.data.title);
      setCategory(response.data.category);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }, [id]);

  useEffect(() => {
    getUserById();
  }, [getUserById]);

  // Fungsi untuk mengupdate user
  const updateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`${API_URL}/${id}`, {
        name,
        password, // Hanya kirim password jika diisi
        email,
        title,
        category,
      });
      navigate("/");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        <form onSubmit={updateUser}>
          <div className="field">
            <label className="label">Name</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                required
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Password</label>
            <div className="control">
              <input
                type="password"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input
                type="email"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Title</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Category</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Category"
              />
            </div>
          </div>

          <div className="field">
            <button type="submit" className="button is-success">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
