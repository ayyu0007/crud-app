import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [contactsPerPage] = useState(5);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get('http://localhost:3001/contacts');
      setContacts(response.data);
    } catch (error) {
      console.error('Error fetching contacts: ', error);
    }
  };

  const deleteContact = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/contacts/${id}`);
      fetchContacts();
    } catch (error) {
      console.error('Error deleting contact: ', error);
    }
  };

  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const currentContacts = contacts.slice(indexOfFirstContact, indexOfLastContact);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = () => {
    if (currentPage < Math.ceil(contacts.length / contactsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="container mt-5">
      <Link to="/add" className="btn btn-primary mb-3">Add Contact</Link>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentContacts.map(contact => (
            <tr key={contact.id}>
              <td>{contact.name}</td>
              <td>{contact.email}</td>
              <td>{contact.phone}</td>
              <td>
                <Link to={`/edit/${contact.id}`} className="btn btn-sm btn-primary mr-2">Edit</Link>
                <button onClick={() => deleteContact(contact.id)} className="btn btn-sm btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav>
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={prevPage}>Previous</button>
          </li>
          {Array.from({ length: Math.ceil(contacts.length / contactsPerPage) }, (_, i) => (
            <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
              <button className="page-link" onClick={() => paginate(i + 1)}>{i + 1}</button>
            </li>
          ))}
          <li className={`page-item ${currentPage === Math.ceil(contacts.length / contactsPerPage) ? 'disabled' : ''}`}>
            <button className="page-link" onClick={nextPage}>Next</button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Contacts;
