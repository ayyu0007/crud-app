import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditContact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [image, setImage] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchContact();
  }, []);

  const fetchContact = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/contacts/${id}`);
      const contact = response.data;
      setName(contact.name);
      setEmail(contact.email);
      setPhone(contact.phone);
      setImage(contact.image);
    } catch (error) {
      console.error('Error fetching contact: ', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/contacts/${id}`, { name, email, phone, image });
      navigate('/');
    } catch (error) {
      console.error('Error updating contact: ', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Edit Contact</h2>
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
                <button type="submit" className="btn btn-primary btn-block">Update</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditContact;
