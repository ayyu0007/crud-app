import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [contactsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get('http://localhost:3001/contacts');
      // Sort contacts in descending order by ID
      const sortedContacts = response.data.sort((a, b) => b.id - a.id);
      setContacts(sortedContacts);
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

  const deleteAllContacts = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete all contacts?");
    if (confirmDelete) {
      try {
        await axios.delete('http://localhost:3001/contacts');
        setContacts([]);
      } catch (error) {
        console.error('Error deleting all contacts: ', error.message);
      }
    }
  };

  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const filteredContacts = contacts.filter(contact => {
    return contact.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
           contact.phone.includes(searchTerm);
  });
  const currentContacts = filteredContacts.slice(indexOfFirstContact, indexOfLastContact);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredContacts.length / contactsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset pagination when searching
  };

  return (
    <div className="container mt-5">
      <div className="row mb-3">
        <div className="col-8">
          <input
            type="text"
            placeholder="Search by name or phone number"
            value={searchTerm}
            onChange={handleSearch}
            className="form-control"
          />
        </div>
        <div className="col-4 d-flex justify-content-end align-items-center">
          <Link to="/add" className="btn btn-primary mr-2">Add Contact</Link>
          <button onClick={deleteAllContacts} className="btn btn-danger">
            <FontAwesomeIcon icon={faTrashAlt} className="mr-1" /> Delete All
          </button>
        </div>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentContacts.map(contact => (
            <tr key={contact.id}>
              <td>{contact.id}</td>
              <td>{contact.name}</td>
              <td>{contact.email}</td>
              <td>{contact.phone}</td>
              <td><img src={contact.img} alt={contact.name} /></td>
              <td>
                <Link to={`/edit/${contact.id}`} className="btn btn-sm btn-primary mr-2">
                  <FontAwesomeIcon icon={faEdit} className="mr-1" /> Edit
                </Link>
                <button onClick={() => deleteContact(contact.id)} className="btn btn-sm btn-danger">
                  <FontAwesomeIcon icon={faTrashAlt} className="mr-1" /> Delete
                </button>
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
          {Array.from({ length: Math.ceil(filteredContacts.length / contactsPerPage) }, (_, i) => (
            <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
              <button className="page-link" onClick={() => paginate(i + 1)}>{i + 1}</button>
            </li>
          ))}
          <li className={`page-item ${currentPage === Math.ceil(filteredContacts.length / contactsPerPage) ? 'disabled' : ''}`}>
            <button className="page-link" onClick={nextPage}>Next</button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Contacts;
