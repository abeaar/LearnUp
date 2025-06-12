import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const API_URL = "/api/"; // URL API

const AddUser = () => {
const [name, setName] = useState("");
const [password, setPassword] = useState("");
const [email, setEmail] = useState("");
const [title, setTitle] = useState("");
const [category, setCategory] = useState("");
const navigate = useNavigate();

  const saveUser = async (e) => {
    e.preventDefault();
    try{
      await axios.post(`${API_URL}/users`, {
        name,
        password,
        email,
        title,
        category,
      });
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="columns mt-5 is-centered">
        <div className="column is-half">
            <form onSubmit={saveUser}>
                <div className="field">
                    <label className="label">Name</label>
                    <div className="control">
                      <input 
                      type="text" 
                      className="input"
                      value={name} 
                      onChange={(e) => setName(e.target.value)}
                      placeholder='Name' />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Password</label>
                    <div className="control">
                      <input type="text" 
                      className="input"
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder='Password' />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                      <input type="text" className="input" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder='Email'/>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Title</label>
                    <div className="control">
                      <input type="text" className="input"
                      value={title} 
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder='Title'/>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Category</label>
                    <div className="control">
                      <input type="text" className="input" 
                      value={category} 
                      onChange={(e) => setCategory(e.target.value)}
                      placeholder='Category'/>
                    </div>
                </div>
                <div className="field">
                    <button type='submit' className='button is-success'>Save</button>
                </div>
            </form>
        </div>
    </div>
  )
  }

export default AddUser
