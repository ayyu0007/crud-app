import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddContact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [image, setImage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/contacts', { name, email, phone, image });
      navigate('/');
    } catch (error) {
      console.error('Error adding contact: ', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Add Contact</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name:</label>
                  <input type="text" id="name" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input type="email" id="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone:</label>
                  <input type="text" id="phone" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label htmlFor="image">Image URL:</label>
                  <input type="text" id="image" className="form-control" value={image} onChange={(e) => setImage(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary btn-block">Add</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddContact;
