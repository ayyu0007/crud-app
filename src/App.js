import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Contacts from './componet/Contacts';
import AddContact from './componet/AddContact';
import EditContact from './componet/EditContact';

function App() {
  return (
  
      <div className="container">
        <h1 className="text-center my-5">Contacts Management</h1>
        <Routes>
          <Route path="/" element={<Contacts />} />
          <Route path="/add" element={<AddContact />} />
          <Route path="/edit/:id" element={<EditContact />} />
        </Routes>
      </div>
    
  );
} 

export default App;
