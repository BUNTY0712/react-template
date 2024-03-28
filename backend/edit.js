import React, { useState } from 'react';
import './App.css'; // Import CSS file for styling
import axios from 'axios'; // Import Axios for making HTTP requests

const initialData = [
  { id: 1, title: 'Title 1', image: 'https://images.pexels.com/photos/733856/pexels-photo-733856.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', description: 'Description 1' },
  { id: 2, title: 'Title 2', image: 'https://images.pexels.com/photos/3098619/pexels-photo-3098619.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', description: 'Description 2' },
];

const App = () => {
  const [items, setItems] = useState(initialData);

  const [formData, setFormData] = useState({
    title: '',
    image: '',
    description: ''
  });
  const [editing, setEditing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      // Update item
      const updatedItems = items.map(item =>
        item.id === formData.id ? { ...formData } : item
      );
      setItems(updatedItems);
      setEditing(false);
    } else {
      // Add new item
      try {
        await axios.post('http://your-backend-api.com/insert', formData);
        setItems([...items, formData]);
      } catch (error) {
        console.error('Error inserting data:', error);
      }
    }
    setFormData({ title: '', image: '', description: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, image: reader.result });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = (id) => {
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditing(true);
  };

  return (
    <div className="container">
      <h1>CRUD Operations in React</h1>
      <form onSubmit={handleSubmit}>
        <input className="input-field" type="text" name="title" placeholder="Title" value={formData.title} onChange={handleInputChange} required />
        <input className="input-field" type="file" name="image" onChange={handleImageChange} required />
        <textarea className="input-field" name="description" placeholder="Description" value={formData.description} onChange={handleInputChange} required></textarea>
        <button className="btn" type="submit">{editing ? 'Update Item' : 'Add Item'}</button>
      </form>

      <div className="items-container">
        {items.map(item => (
          <div key={item.id} className="item">
            <h3>{item.title}</h3>
            <img style={{ width: "300px" }} src={item.image} alt={item.title} className="item-image" />
            <p>{item.description}</p>
            <div>
              <button className="edit-btn" onClick={() => handleEdit(item)}>Edit </button> &nbsp;
              <button className="delete-btn" onClick={() => handleDelete(item.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
