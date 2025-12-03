import React, { useState } from 'react';
import './App.css';

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [editId, setEditId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !age) return;
    
    if (editId) {
      setStudents(students.map(s => 
        s.id === editId ? { id: editId, name, email, age } : s
      ));
      setEditId(null);
    } else {
      setStudents([...students, { id: Date.now(), name, email, age }]);
    }
    setName('');
    setEmail('');
    setAge('');
  };

  const handleEdit = (student) => {
    setName(student.name);
    setEmail(student.email);
    setAge(student.age);
    setEditId(student.id);
  };

  const handleDelete = (id) => {
    setStudents(students.filter(s => s.id !== id));
  };

  const handleCancel = () => {
    setEditId(null);
    setName('');
    setEmail('');
    setAge('');
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Student Management System</h1>
        <p className="subtitle">Manage your students efficiently</p>
      </header>
      
      <div className="container">
        <form onSubmit={handleSubmit} className="form-section">
          <h2>{editId ? 'Edit Student' : 'Add New Student'}</h2>
          <div className="form-group">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="input-field"
            />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input-field"
            />
            <input
              type="number"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
              className="input-field"
              min="1"
            />
            <div className="button-group">
              <button type="submit" className="btn btn-primary">
                {editId ? 'Update Student' : 'Add Student'}
              </button>
              {editId && (
                <button type="button" onClick={handleCancel} className="btn btn-secondary">
                  Cancel
                </button>
              )}
            </div>
          </div>
        </form>

        <div className="students-section">
          <h2>Students List ({students.length})</h2>
          {students.length === 0 ? (
            <div className="empty-state">
              <p>No students added yet. Add your first student above!</p>
            </div>
          ) : (
            <div className="students-grid">
              {students.map(student => (
                <div key={student.id} className="student-card">
                  <div className="card-header">
                    <h3>{student.name}</h3>
                  </div>
                  <div className="card-body">
                    <div className="card-field">
                      <label>Email:</label>
                      <p>{student.email}</p>
                    </div>
                    <div className="card-field">
                      <label>Age:</label>
                      <p>{student.age}</p>
                    </div>
                  </div>
                  <div className="card-actions">
                    <button onClick={() => handleEdit(student)} className="btn btn-edit">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(student.id)} className="btn btn-delete">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;